require('dotenv').config();
import express from "express"
import jwt from "jsonwebtoken"
import cors from "cors"
import crypto from "crypto";
import multer from "multer";
import Redis from "ioredis";
import path from "path";
import fs from  "fs";
import{ CreateRoomSchema, CreateUserSchema, LoginUserSchema } from "@repo/common/types"
import {Database } from  "@repo/db/database"
import { JWT_SECRET } from "@repo/backend-common/config"
import VerfiyToken from "./verifytoken"
const nodemailer = require("nodemailer");
const app =express();
const encrypt = require("bcryptjs");
const storeotp= new Redis(process.env.REDIS_URL!);
app.use(express.json());
app.use(cors()); 
const destfolder= path.join(__dirname+"../../../frontend/public/"+"profile/");
if(!fs.existsSync(destfolder)){
    fs.mkdirSync(destfolder,{recursive:true});
}
const storage = multer.diskStorage({
    destination:function (req,file,callback){
        callback(null,destfolder);

    },
    filename:function (req,file,callback){
        callback(null,file.originalname);
    }
});
const upload = multer({storage:storage});

const transportemail = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.USER_EMAIL,
            pass: process.env.PASSWORD
        },
    secure:true,
});


app.post("/upload/image", VerfiyToken, upload.single('profileImage'), async (req, res) => {
    const user = req.userId;
    const file = req.file?.filename;
    if (!req.file) return;
    let update;
    if (!user) return;
    try {
        update = await Database.user.update(
            {
                where: {
                    id: user
                },
                data: {
                    photo: destfolder+file

                }
            }
        )
        res.json({
            mesg: "file uploaded successfully"
        });
        return;
    } catch (error) {
        res.status(500).json({
            mesg: " Please try again"
        })
        return;
    }

});
                    // first hash the password and then save it in the database //

                        // SIGNUP
app.post("/otp/generate",async (req,res)=>{
    let message= "";
    const email = req.body.email;
   const existinguser= await Database.user.findFirst({
        where:{
            email:email
        }
    })
    if(existinguser){
        message = "User Exist.Please Login";
        res.status(401);
        res.json(message);
        return;
    }
    const otp =crypto.randomInt(100000, 999999).toString();
    const mailData = {
        from: process.env.USER_EMAIL,
        to:email,
        subject: "OTP valid for 10 minute",
        text: `Your OTP is ${otp}.It will expire in 10 minutes`
    };
    try {

        await storeotp.setex(email,600,otp);
        await transportemail.sendMail(mailData);
        message= "Email Sent Successfully";
        res.status(200);

        
    } catch (error) {
        message = "Try Again";
        res.status(500);
        return;
    }
   res.json({
    mesg:message
   });

})

app.post("/otp/verify",async (req,res)=>{
    const {email,otp}=req.body;
    if(!otp){
        res.status(400).json({message:"Please Enter OTP"});
        return;
    }
    if(!email){
        res.status(400).json({message:"Please Enter Email"});
        return;

    }
    try {
        const savedotp=await storeotp.get(email);
        if(savedotp != otp){
            res.status(400).json({message:"Wrong OTP!"});
            return;
        }
        await storeotp.del(email);
        res.status(200).json({message:"User verified"});
        return;
    } catch (error) {
        res.status(500).json({message:"Try again"});
        return;
    }
})

app.post("/signup",async (req,res)=>{

    const parsedData=CreateUserSchema.safeParse(req.body);

    if(!parsedData.success){
        res.json("enter valid inputs");
        return;
    }
    else{
        const password = parsedData.data.password;
        const hashedpassword = await encrypt.hash(password,10); 
        // Insert New User in the database 
        try {
            const createUser= await Database.user.create({
               
                data:{
                    email:parsedData.data.email,
                    password:hashedpassword,
                    name:parsedData.data.name
               }
            });
            res.json({
                userId:createUser.id
            });
            
        } catch (error) {
            res.status(411).json({
                mesg:"User already Exists with this email"
            })
            
        }

    }
});

                        // SIGNIN 
app.post("/signin",async (req,res)=>{

    const parsedData=LoginUserSchema.safeParse(req.body);
    
    if(!parsedData.success){
        res.json({
            mesg:"Enter valid Details"
        });
        return;
    }

    else{
        try {
                
                const userDetails =await Database.user.findFirst({
                    where:{
                        email:parsedData.data.email
                    }
                })
                const password= parsedData.data.password;
                const hashedpassword =(encrypt.compare(userDetails?.password,password));
                if(!userDetails || !hashedpassword){
                    res.json({mesg:"no user found"});
                    return;
                }
               

                const token =jwt.sign({userId:userDetails.id, hashedpassword},JWT_SECRET);

                res.json({
                    token
                })

               
            
        } catch (error) {

            res.status(500).json({
                mesg:"Check Database Connectivity"
            })
            
        }
    }

});


             // CreateRoom

app.post("/createroom",VerfiyToken,async (req,res)=>{

    const parsedData= CreateRoomSchema.safeParse(req.body);

    if(!parsedData.success){

        res.json({
            mesg:"Input Error"
        });
        return;
    }
    else{
        try {
            const roomId = await Database.room.create({
                data:{
                    adminId :req.userId as string,
                    slug:parsedData.data.roomname
                }
            });
            res.json({
                roomId
            });
            return;
        } catch (error) {
            res.json({
                error
            });
            return;
            
        }
    }
});

            // new user subscribes to the room then he will receive the room id of the room using the slug//
app.get("/room/:slugId",async (req,res)=>{
  const slugId= req.params.slugId;

  let data;
  try {
    data = await Database.room.findFirst({
      where:{
          slug:slugId
  
      }
    });
  } catch (error) {
    res.json({
        error
    })
  }

  res.json({
    roomId:data?.id
  })
});


app.get("/canvas/:roomid",async (req,res)=>{
    const roomId=Number(req.params.roomid);
    let shape;
    if(!roomId){
        res.json({
            message:"roomId not found"
        });
        return;
    }

   try {
     shape = await Database.shapes.findMany(
         {
             where:{
                 roomId:roomId
             },
             orderBy:{
                 id:"desc"
             },
             take: 1000
             
         }
     )
   } catch (error) {
      res.json({
        message:"error" + error
    
      })
      return;
    
   }

    res.json({
        shape
    })
})

app.post("/userdetails",VerfiyToken,async(req,res)=>{
  let userdetails;
  try {
       userdetails= await Database.user.findFirst({
          where:{
              id:req.userId
              
          }
      });
  } catch (e) {

    res.json({
        error:"e"
    })
    
  }
    res.json({
        email :userdetails?.email,
        name  :userdetails?.name,
        photo :userdetails?.photo
    })
});

app.get("/rooms/roomdetails",async (req,res)=>{
    
    try {
        const response = await Database.room.findMany();
        res.status(200).json({
            rooms:response
        });
        return;
        
    } catch (error) {
        res.status(500).json({
            error:error
        });
    }
});



app.listen(3001);
