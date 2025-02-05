"use client"
import HomeIcons from "@/components/ui/homeicons";
import useWindowSize from "@/customhooks/windowSize";
import { DrawClass } from "@/DrawLogic/DrawClass";
import { Circle, PencilLine, RectangleHorizontalIcon, ZoomInIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export enum tools {
    circle = "circle",
    rect = "rectangle",
    pencile = "pencile",
    zoom = "zoom"
}

export function Canvas ({roomId, ws}:{
    roomId:string,
    ws:WebSocket
}){
    const [Drawing,setDrawing] = useState<DrawClass>();
    const [Selected,setSelected]=useState<tools>(tools.rect);
    const windowsize = useWindowSize();
    const canvasref=useRef<HTMLCanvasElement>(null); // make this as global state 
    useEffect(()=>{
        Drawing?.setTool(Selected);

    },[Drawing,Selected]);
    
    useEffect(()=>{
       
        if(canvasref.current){
            const canvas= canvasref.current;
        const d =new DrawClass(canvas,roomId,ws);
        setDrawing(d);

        return () =>{
          
            d.destroy();   
        }  
        }
    },[canvasref,roomId,ws])



    return <div className=" bg-blue-300 flex justify-center h-screen w-screen ">

     <Topbar Selected={Selected} setSelected={setSelected} />
        
           
       

    <canvas ref={canvasref} className="bg-gray-50" height={windowsize.height} width={windowsize.width}></canvas>
  
   </div>
}


function Topbar({Selected,setSelected}:{
    Selected:tools,
    setSelected:(s:tools) =>void
}){
    return (
        <div className="fixed shadow p-3 mt-5 bg-white rounded-lg flex gap-t gap-3">
        <HomeIcons activated={Selected == tools.pencile} icon={<PencilLine/>} onclick={()=>{ setSelected(tools.pencile)}} />
        <HomeIcons activated={Selected == tools.rect} icon={<RectangleHorizontalIcon/>} onclick={()=>{setSelected(tools.rect)}}/>
        <HomeIcons activated={Selected == tools.zoom} icon={<ZoomInIcon/>} onclick={()=>{setSelected(tools.zoom)}}/>
        <HomeIcons activated={Selected == tools.circle} icon={<Circle/>} onclick={()=>{setSelected(tools.circle)}}/>
        3
    </div>
    )
}