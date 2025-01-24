"use client"
import InitDraw from "@/DrawLogic/Draw";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function UserAuth({roomId} :{roomId:string}){
   
    const [socket,setsocket] =useState<WebSocket |null>(null);
    
  
    
    useEffect(  ()=>{
        const token= localStorage.getItem("token");
        if(!token){
            return;
        }
        const ws= new WebSocket("ws://localhost:8081?token="+token);
        ws.onopen=()=>{
            setsocket(ws);
            ws.send(JSON.stringify({
                type:"joinroom",
                roomId:roomId
            }));
            console.log(ws);

        }

        return () => {
            ws.close();
        };

       

    },[roomId])
  

    if(!socket){
        return <div> connecting to servers</div>;
    }

    return <Canvas roomId={roomId} ws ={socket}/>
}