"use client";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, User, UserCircle, Users } from "lucide-react";
import Dashcard from "@/components/ui/dashcard";

export default function Dashboard() {
    const router =useRouter();
    const roomName = useRef<HTMLInputElement>(null);
    const roomId = useRef<HTMLInputElement>(null);
    
    async function joinroom(){
       const roomid = roomId.current?.value;

      try {
          const room = await axios.get(`${HTTP_BACKEND}/room/`+roomid);
          console.log(room.data.roomId);
          router.push("/Dashboard/rooms/"+room.data.roomId);
      } catch (error) {
        console.log(error);
        
      }
       
     }

    async function createroom(){
        console.log(roomName.current?.value);
      try {
          const room = await axios.post(`${HTTP_BACKEND}/createroom`,{
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

  return (<>
    <Navbar/>
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Canvas Dashboard</h1>
          <p className="text-muted-foreground mt-2">Create or join collaborative canvas rooms</p>
        </div>

        <Tabs defaultValue="create" className="space-y-4">
          <TabsList>
            <TabsTrigger value="create">Create Room</TabsTrigger>
            <TabsTrigger value="join">Join Room</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create a New Room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Input ref={roomName} placeholder="Room Name" />
                  </div>
                  <Button onClick={createroom}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Room
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="join">
            <Card>
              <CardHeader>
                <CardTitle>Join Existing Room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Input ref={roomId}
                      placeholder="Enter Room Code"
                    />
                  </div>
                  <Button onClick={joinroom}>
                    <Users className="mr-2 h-4 w-4" />
                    Join Room
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
         <Dashcard title="Active users" content="3" icon={UserCircle}/>
         <Dashcard title="Total users" content="20" icon={UserCircle}/>
         <Dashcard title="Total rooms" content="3" icon={UserCircle}/>
        </div>
      </div>
    </main></>
  );
}