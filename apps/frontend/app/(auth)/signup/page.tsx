"use client"
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRef } from "react";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import SignIn from "../signin/page";
import Link from "next/link";
export default function SignUp(){
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const username= useRef<HTMLInputElement>(null);
    async function backend(){
       try {
      const response=await axios.post( `${HTTP_BACKEND}/signup`,{
        
            "email":email.current?.value,
            "password":password.current?.value,
            "name":username.current?.value
    
      });
       } catch (e) {

        console.log("error" +e);

        
       }
    }
   
    return <>
       
        <CardHeader className="font-black text-xl">SignUp</CardHeader>
        <CardContent className=" flex justify-center items-center flex-col gap-3 ">
        <Input ref={email} type="text" placeholder="Email" ></Input>
           <Input ref={password} type="password" placeholder="Password"></Input>
           <Input ref={username} type="text" placeholder="Enter your name"></Input>
        <Button onClick={backend} size="lg" className="text-md" >SignIn</Button>
        <div className="flex font-light text-gray justify-end w-full">
        <Link href="./signin">login</Link>
        </div>
        </CardContent>
       
         
       
        </>
    
       

   
       
    
}