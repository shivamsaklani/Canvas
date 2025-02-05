"use client"
import { Card } from "@/components/ui/card";
import InitDraw from "@/DrawLogic/Draw";
import { useEffect, useRef } from "react";

export function Canvas ({roomId, ws}:{
    roomId:string,
    ws:WebSocket
}){
    const canvasref=useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
       
        if(canvasref.current){
            const canvas= canvasref.current;

           InitDraw(canvas,roomId,ws);
           
        }
        
       
    },[])



    return <div className=" bg-blue-300 h-screen w-screen ">
        
           
       

    <canvas ref={canvasref} className="bg-red-300" height="720" width="1380"></canvas>
  
   </div>
}