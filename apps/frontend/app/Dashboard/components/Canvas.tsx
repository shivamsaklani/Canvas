import InitDraw from "@/DrawLogic/Draw";
import { useEffect, useRef } from "react";

export function Canvas ({roomId, ws}:{
    roomId:string,
    ws:WebSocket
}){
    const canvasref=useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        if(canvasref.current){
           InitDraw(canvasref.current,roomId,ws);
           
        }

       
    },[canvasref])



    return <div className=" bg-blue-300 flex  ">
        
        {/* <div className="h-screen fixed m-5 ">
            <div className="bg-white rounded-lg h-96 w-48 flex justify-center ">
            sidebar
            </div>
           
        </div> */}

    <canvas ref={canvasref} className="bg-red-300" width={1080} height={1080}></canvas>
  
   </div>
}