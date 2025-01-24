import { Request,NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET } from "@repo/backend-common/config"


export default function VerfiyToken(req:Request,res:Response,next:NextFunction):void{

    console.log("req coming");
    
   
    const token = req.headers["authorization"] ?? "";
    
    console.log(token);

    try {
        const decodedata=jwt.verify(token,JWT_SECRET);
        console.log(decodedata)
        if(!decodedata){
            res.json({mesg:"unauthorized user"});
            return;

        }
        else{
         
        req.userId=(decodedata as JwtPayload).userId;
        console.log(req.userId)
        next();
        return;

        }

        
    } catch (error) {

        res.json({mesg:"error : no token found"});
        return;

        
    }


}