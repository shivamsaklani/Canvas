import express from "express"
import jwt from "jsonwebtoken"
import z from "zod"
import cors from "cors"
import{ CreateUserSchema, LoginUserSchema } from "@repo/common/types"
import {Database } from  "@repo/db/database"
import { JWT_SECRET } from "@repo/backend-common/config"
import VerfiyToken from "./verifytoken"
const app =express();
app.use(express.json());
app.use(cors());

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


app.post("/createroom",(req,res)=>{

});
app.listen(3000);
