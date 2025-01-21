import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET } from "@repo/backend-common/config"


export default function VerfiyToken(req:Request,res:Response,next:NextFunction):void{

    //@ts-ignore
    const token = req.headers["authorization"] ?? "";
    
    try {
        const decodedata=jwt.verify(token,JWT_SECRET);
        if(!decodedata){
            res.json({mesg:"unauthorized user"});
            return;

        }
        else{
              //@ts-ignore
        req.userId =(decodedata as JwtPayload).userId;
        return;

        }

        
    } catch (error) {

        res.json({mesg:"error"});
        return;

        
    }


}