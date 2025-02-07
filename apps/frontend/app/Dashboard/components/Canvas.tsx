"use client"
import HomeIcons from "@/components/ui/homeicons";
import useUserDetails from "@/customhooks/UserDetails";
import useWindowSize from "@/customhooks/windowSize";
import { DrawClass } from "@/DrawLogic/DrawClass";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowRight, Circle, Eraser, PencilLine, PenLine, RectangleHorizontalIcon, Text, TextIcon, Type, ZoomInIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export enum tools {
    circle = "circle",
    rect = "rectangle",
    line = "pencile",
    zoom = "zoom",
    eraser = "eraser",
    arrow = "arrow",
    text = "text",
    
}

export function Canvas ({roomId, ws}:{
    roomId:string,
    ws:WebSocket
}){
    const [Drawing,setDrawing] = useState<DrawClass>();
    const [Selected,setSelected]=useState<tools>(tools.rect);
    const windowsize = useWindowSize();
    const user = useUserDetails();
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

      <div className="fixed pt-3 hidden sm:flex w-screen p-3 justify-end">
    <Avatar className="h-12 w-12 bg-black rounded-full">
                  <AvatarImage src={user?.imageurl} />
    </Avatar>
    </div>
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
        <HomeIcons activated={Selected == tools.text} icon={<Type/>} onclick={()=>{ setSelected(tools.text)}} /> 
        <HomeIcons activated={Selected == tools.rect} icon={<RectangleHorizontalIcon/>} onclick={()=>{setSelected(tools.rect)}}/> 
        <HomeIcons activated={Selected == tools.circle} icon={<Circle/>} onclick={()=>{setSelected(tools.circle)}}/> 
        <HomeIcons activated={Selected == tools.zoom} icon={<ZoomInIcon/>} onclick={()=>{setSelected(tools.zoom)}}/> 
        <HomeIcons activated={Selected == tools.eraser} icon={<Eraser/>} onclick={()=>{setSelected(tools.eraser)}}/> 
        <HomeIcons activated={Selected == tools.arrow} icon={<ArrowRight/>} onclick={()=>{setSelected(tools.arrow)}}/> 
        <HomeIcons activated={Selected == tools.line} icon={<PenLine/>} onclick={()=>setSelected(tools.line)}/>
        
    </div>
    )
}