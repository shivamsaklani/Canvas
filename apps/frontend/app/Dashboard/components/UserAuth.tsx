"use client"
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";
import { WS_BACKEND } from "@repo/backend-common/config";

export function UserAuth({roomId} :{roomId:string}){
   
    const [socket,setsocket] =useState<WebSocket |null>(null);
    
  
    
    useEffect(  ()=>{
        const token= localStorage.getItem("token");
        if(!token){
            return;
        }
        const ws= new WebSocket(`${WS_BACKEND}?token=${token}`);
        ws.onopen=()=>{
            setsocket(ws);
            ws.send(JSON.stringify({
                type:"joinroom",
                roomId:roomId
            }));

        }    

       

    },[roomId])
  

    if(!socket){
        return <div> connecting to servers</div>;
    }

    return <Canvas roomId={roomId} ws ={socket}/>
}