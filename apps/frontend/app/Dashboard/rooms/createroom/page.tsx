"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";



export default function CreateRoom(){
    const router =useRouter();
    const roomName = useRef<HTMLInputElement>(null);
    async function create(){
        console.log(roomName.current?.value);
      try {
          const room = await axios.post("http://localhost:3001/createroom",{
              "roomname":roomName.current?.value as string,},
              {
              headers:{
                "authorization":localStorage.getItem("token")
              }
          });
          console.log(room);
          alert("RoomName"+room.data.roomId.slug);
          router.push("/Dashboard/rooms/joinroom");

      } catch (error) {
        console.log(error);
        
      }
       
     }
    
    return <div className="h-screen w-screen flex justify-center items-center">
        <Card className="h-96 w-96 flex justify-center flex-col gap-3 items-center" >
        <Input className="h-20 w-50" ref={roomName} type="text" placeholder="Enter Room Name"></Input>
        <Button onClick={create}>Create Room</Button>
        </Card>
       
    </div>
}