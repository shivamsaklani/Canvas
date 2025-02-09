"use client"
import HomeIcons from "@/app/Dashboard/components/homeicons";
import { Globalcanvasref } from "@/app/Globalstates/CanvasRef";
import { GlobalSelectedTool } from "@/app/Globalstates/SelectedTool";
import useUserDetails from "@/customhooks/UserDetails";
import useWindowSize from "@/customhooks/windowSize";
import DrawHandler from "@/DrawLogic/DrawHandler";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowRight, Circle, Eraser, Menu, PenLine, RectangleHorizontalIcon, Type, ZoomIn, ZoomInIcon, ZoomOut } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
const image ="/photo.jpg";
export enum tools {
    circle = "circle",
    rect = "rectangle",
    line = "line",
    zoom = "zoom",
    eraser = "eraser",
    arrow = "arrow",
    text = "text",
    
}

export function Canvas ({roomId, ws}:{
    roomId:string,
    ws:WebSocket
}){
    const Drawref = useRef<DrawHandler | null>(null);
    const [Selected,setSelected]=useRecoilState(GlobalSelectedTool);
    const windowsize = useWindowSize();
    const user = useUserDetails();
    const [canvasref,setcanvasref] = useRecoilState(Globalcanvasref); 
    useEffect(()=>{
       
        if(canvasref){
            const canvas= canvasref;
            Drawref.current = new DrawHandler(canvas,roomId,ws);

        }

        return () => {
            if (Drawref.current) {
                Drawref.current.destroyHandler(); // Cleanup on component unmount
                Drawref.current = null;
            }
        };
    },[roomId,ws,canvasref]);

    useEffect(()=>{
        if(Drawref.current){
            Drawref.current.setTools(Selected);
        }
    },[Selected]);

    useEffect(()=>{
        if(canvasref){
            canvasref.height= windowsize.height;
            canvasref.width = windowsize.width;
        }
    },[canvasref]);



    return <>
    <div className="flex justify-center h-screen w-screen ">

        <div className="absolute p-1 bg-blue-200 rounded-md top-5 left-5">
            <Menu/>
        </div>

      <div className="fixed pt-3 hidden sm:flex w-screen p-3 justify-end">
    <Avatar className="h-12 w-12 rounded-full">
                  <AvatarImage className="rounded-full" src={ user?.imageurl || image } />
    </Avatar>
    </div>
    <Topbar Selected={Selected} setSelected={setSelected} />
  
           
       

    <canvas ref={(event)=>{if(event) setcanvasref(event)}} height={windowsize.height} width={windowsize.width}></canvas>
    
    <div className="absolute bottom-10 left-10 grid grid-cols-3 bg-gray-50 rounded-lg shadow-lg z-5">
  <button className="flex justify-center items-center border-white p-2 rounded-tl-md rounded-bl-md active:border-blue-200 active:border"><ZoomIn/></button>
  <div className="flex justify-center items-center">100%</div>
  <button className="flex justify-center items-center p-2 border-white rounded-tr-md rounded-br-md active:border-blue-200 active:border"><ZoomOut/></button>
</div>
   </div>

   </> 
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