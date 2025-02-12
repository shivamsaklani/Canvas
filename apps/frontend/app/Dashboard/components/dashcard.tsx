import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";
import { WS_BACKEND } from "@repo/backend-common/config";
import { useRouter } from "next/navigation";
export default function Dashcard({roomslug,id}:{
    roomslug:string,
    id:string    
}){
  const router = useRouter();

  function JoinRoom(roomId:string){
    const token = localStorage.getItem("token");
    if(!token){
      return;
    }
    const ws = new WebSocket(`${WS_BACKEND}?token=${token}`);
    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:"joinroom",
        roomId:roomId
    }));
    router.push(`/Dashboard/rooms/${roomslug}`)
    }

  }
    return(
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Room Name : {roomslug}</CardTitle>
          {<DoorOpen/>}
        </CardHeader>
        <CardContent className="grid p-5 grid-rows items-end justify-center">
        <Button onClick={()=>JoinRoom(id)}>Join Room</Button>
        </CardContent>
        
       
      </Card>
    )
}