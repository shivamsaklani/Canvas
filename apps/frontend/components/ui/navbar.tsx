"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import { Palette, Settings, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

interface userDetails{
  name:string,
  email:string,
  imageurl:string | undefined
}

export function Navbar() {
  const [user,setuser] = useState<userDetails>();
  useEffect(()=>{
    async function userDetails() {
      try {
        const response = await axios.post(HTTP_BACKEND+"/userdetails", {},
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          });
        const users= {
          name:response.data.name,
          email:response.data.email,
          imageurl:response.data.photo
        }
        setuser(users);
      } catch (e) {
        console.log(e);
         setuser({
          name:"",
          email : "",
          imageurl: undefined
         })
      }

    
    }
    userDetails();
  },[]);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-2">
          <Palette className="h-6 w-6" />
          <span className="text-xl font-bold">Canvas App</span>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 bg-black">
                  <AvatarImage src={user?.imageurl} />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}