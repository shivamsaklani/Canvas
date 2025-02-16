"use client"
import HomeIcons from "@/app/Dashboard/components/homeicons";
import { Globalcanvasref } from "@/app/Globalstates/CanvasRef";
import { GlobalSelectedTool } from "@/app/Globalstates/SelectedTool";
import useUserDetails from "@/customhooks/UserDetails";
import useWindowSize from "@/customhooks/windowSize";
import DrawHandler from "@/DrawLogic/DrawHandler";
import { Avatar} from "@radix-ui/react-avatar";
import { ArrowRight, Circle, Eraser, Hand, Menu, MousePointer2, PenLine, RectangleHorizontalIcon, Type, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import profile from "../../../public/images/photo.jpg";
import { tools } from "@repo/canvas/shapes";

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
    },[canvasref,windowsize]);

    function zoomin(){
        const ctx= canvasref?.getContext("2d");
        ctx?.scale(1,+1);
        ctx?.setTransform(1, 0, 0, 1, 0, 0);
    }
    function zoomout(){
        const ctx= canvasref?.getContext("2d");
        ctx?.scale(+1,1);
        ctx?.setTransform(1, 0, 0, 1, 0, 0);
        
    }


    return <>
    <div className="flex justify-center h-screen w-screen ">

        <div className="absolute p-1 bg-blue-200 rounded-md top-5 left-5">
            <Menu/>
        </div>

      <div className="fixed pt-3 hidden sm:flex w-screen p-3 justify-end">
    <Avatar className="h-12 w-12 rounded-full">
                  <Image src={profile || user?.imageurl} alt="profile"/>
    </Avatar>
    </div>
    <Topbar Selected={Selected} setSelected={setSelected} />
  
           
       

    <canvas ref={(event)=>{if(event) setcanvasref(event)}} height={windowsize.height} width={windowsize.width} tabIndex={0}></canvas>
    
    <div className="absolute bottom-10 left-10 grid grid-cols-3 bg-gray-50 rounded-lg shadow-lg z-5">
  <button className="flex justify-center items-center border-white p-2 rounded-tl-md rounded-bl-md active:border-blue-200 active:border" onClick={zoomin}><ZoomOut/></button>
  <div className="flex justify-center items-center cursor-pointer">100%</div>
  <button className="flex justify-center items-center p-2 border-white rounded-tr-md rounded-br-md active:border-blue-200 active:border" onClick={zoomout}><ZoomIn/></button>
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

        <HomeIcons activated={Selected == tools.panning} icon={<Hand/>} onclick={()=>  setSelected(tools.panning)}/>
        <HomeIcons activated={Selected == tools.selectobject} icon={<MousePointer2/>} onclick={()=>  setSelected(tools.selectobject)}/>
        <HomeIcons activated={Selected == tools.text} icon={<Type/>} onclick={()=>{ setSelected(tools.text)}} /> 
        <HomeIcons activated={Selected == tools.rect} icon={<RectangleHorizontalIcon/>} onclick={()=>setSelected(tools.rect)}/> 
        <HomeIcons activated={Selected == tools.circle} icon={<Circle/>} onclick={()=>setSelected(tools.circle)}/> 
        <HomeIcons activated={Selected == tools.eraser} icon={<Eraser/>} onclick={()=>setSelected(tools.eraser)}/> 
        <HomeIcons activated={Selected == tools.arrow} icon={<ArrowRight/>} onclick={()=>setSelected(tools.arrow)}/> 
        <HomeIcons activated={Selected == tools.line} icon={<PenLine/>} onclick={()=>setSelected(tools.line)}/>
        
    </div>
    )
}