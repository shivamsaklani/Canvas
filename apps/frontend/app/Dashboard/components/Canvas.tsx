"use client"
import InitDraw from "@/DrawLogic/Draw";
import { useEffect, useRef } from "react";

export function Canvas({roomId }:{
    roomId:string
}){
    const canvasref=useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        if(canvasref.current){
           InitDraw(canvasref.current,roomId);
           
        }

       
    },[canvasref])



    return <div className="h-screen w-screen">
        
        {/* <div className="h-screen fixed m-5 ">
            <div className="bg-white rounded-lg h-96 w-48 flex justify-center ">
            sidebar
            </div>
           
        </div> */}

    <canvas ref={canvasref} className=" flex bg-red-300 rounded" height={750} width={1080}></canvas>
  
   </div>
}