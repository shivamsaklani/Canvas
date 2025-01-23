import express from "express"
import jwt from "jsonwebtoken"
import z from "zod"
import cors from "cors"
import{ CreateRoomSchema, CreateUserSchema, LoginUserSchema } from "@repo/common/types"
import {Database } from  "@repo/db/database"
import { JWT_SECRET } from "@repo/backend-common/config"
import VerfiyToken from "./verifytoken"
const app =express();
app.use(express.json());
app.use(cors());

                    // first hash the password and then save it in the database //

                        // SIGNUP 

app.post("/signup",async (req,res)=>{

    const parsedData=CreateUserSchema.safeParse(req.body);

    if(!parsedData.success){
        res.json("enter valid inputs");
        return;
    }
    else{
        // Insert New User in the database 
        try {
            const createUser= await Database.user.create({
               
                data:{
                    email:parsedData.data.email,
                    password:parsedData.data.password,
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
                        email:parsedData.data.email,
                        password:parsedData.data.password
                    }
                })

                if(!userDetails){
                    res.json({mesg:"no user found"});
                    return;
                }

                const token =jwt.sign({userId:userDetails.id},JWT_SECRET);

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
            console.log(req.userId);
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

  const data =await Database.room.findFirst({
    where:{
        slug:slugId

    }
  });

  res.json({
    roomId:data?.id
  })
});


app.get("/canvas/:roomid",VerfiyToken,async (req,res)=>{
    const roomId=Number(req.params.roomid);

    const data = await Database.shapes.findMany(
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

    res.json({
        data
    })
})



app.listen(3001);
