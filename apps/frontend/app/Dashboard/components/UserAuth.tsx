"use client"
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { WS_BACKEND } from "@repo/backend-common/config";
import useCheckRoom from "@/customhooks/checkRoom";

export function UserAuth({roomslug} :{roomslug:string}){
   
    const [socket,setsocket] =useState<WebSocket |null>(null);
    const roomId= useCheckRoom(roomslug);
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
        ws.onerror=()=>{
            console.log("error");
        }
        }    
    },[roomId]);
      
     console.log(socket);
    if(!roomId){
        return <div className="flex h-screen w-screen justify-center items-center">404</div>;
    }
    if(!socket){
        return <div className="flex h-screen w-screen justify-center items-center">404</div>;
    }
    return (<>
   <Canvas roomId={roomId} ws={socket} />
    </> );

}