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



    return <div className=" bg-blue-300 flex  h-screen w-screen justify-center ">
        
       
           <Card className="fixed h-10 mt-5 rounded">topbar</Card>
           
       

    <canvas ref={canvasref} className="bg-red-300" height="1080" width="720"></canvas>
  
   </div>
}