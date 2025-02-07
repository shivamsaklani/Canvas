"use client"
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { WS_BACKEND } from "@repo/backend-common/config";
import useCheckRoom from "@/customhooks/checkRoom";

export function UserAuth({roomslug} :{roomslug:string}){
   
    const [socket,setsocket] =useState<WebSocket |null>(null);
    const roomId = useCheckRoom(roomslug);
    useEffect(()=>{
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
  
     
    if(!roomId){
        return <div>Room is not valid</div>;
    }
    if(!socket){
        return <div>User not defined</div>;
    }

    return <Canvas roomId={roomId} ws ={socket}/>
}