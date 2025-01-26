"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";



export default function JoinRoom(){
    const router =useRouter();
    const roomId = useRef<HTMLInputElement>(null);
    async function create(){
       const roomid = roomId.current?.value;
      try {
          const room = await axios.get(`${HTTP_BACKEND}/room/`+roomid);
          console.log(room.data.roomId);
          router.push("/Dashboard/rooms/"+room.data.roomId);
      } catch (error) {
        console.log(error);
        
      }
       
     }
    
    return <div className="h-screen w-screen flex justify-center items-center">
        <Card className="h-96 w-96 flex justify-center flex-col gap-3 items-center" >
        <Input className="h-20 w-50" ref={roomId} type="text" placeholder="Enter RoomName"></Input>
        <Button onClick={create}>Join Room</Button>
        </Card>
       
    </div>
}