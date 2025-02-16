"use client";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/app/Dashboard/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle,Users2} from "lucide-react";
import RoomCard from "./components/RoomCard";
import Dashcard from "./components/dashcard";
import ProfileBox from "./components/ProfileBox";
import toast, { Toaster } from "react-hot-toast";


type roomdetails={
  id:string,
  slug:string,
}

export default function Dashboard() {
    const router =useRouter();
    const roomName = useRef<HTMLInputElement>(null);
    const roomslug = useRef<HTMLInputElement>(null);
    const [roomdetails,setroomdetails]= useState([]);
    const [profilebox,setprofilebox]= useState(false);


    useEffect(()=>{
      const room=async ()=>{
      const response = await axios.get(`${HTTP_BACKEND}/rooms/roomdetails`);
      setroomdetails(response.data.rooms);
     }
      room();
    },[]);
    
    async function joinroom(){
       const room = roomslug.current?.value;
        router.push("/Dashboard/rooms/"+room); 
     }

    async function createroom(){
        let room ;
        if(!roomName.current?.value) toast.error("Enter Room Name");
      try {
         room = await axios.post(`${HTTP_BACKEND}/createroom`,{
              "roomname":roomName.current?.value as string,},
              {
              headers:{
                "authorization":localStorage.getItem("token")
              }
          });
          toast.success("room Created :"+room.data.roomId.slug);
          

      } catch (e) {
          toast.error("Try again"+e);
      }
       
     }

  return (
  <>
  <div><Toaster/></div>
  {profilebox && <ProfileBox setprofilebox={()=>setprofilebox((p)=>!p)}/>}
    <Navbar setprofilebox={()=>setprofilebox((prev)=>!prev)}/>
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Canvas Dashboard</h1>
          <p className="text-muted-foreground mt-2">Create or join collaborative canvas rooms</p>
        </div>

        <Tabs defaultValue="create" className="space-y-10">
          <TabsList>
            <TabsTrigger value="create">Create Room</TabsTrigger>
            <TabsTrigger value="join">Join Room</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <RoomCard reference={roomName} btnfun={createroom} title="Create room" placeholder="Enter room Name" button="Create room" Icon={PlusCircle} />
          </TabsContent>

          <TabsContent value="join">
            <RoomCard reference={roomslug} btnfun={joinroom} title="Join room" placeholder="Enter room Name" button="Join room" Icon ={Users2} />
          </TabsContent>
          

        </Tabs>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
        {roomdetails.map((x:roomdetails)=>
          <Dashcard key={x.id} roomslug={x.slug} id={x.id} />

        )}
        
        </div>
      </div>
    </main>
    </>);
}