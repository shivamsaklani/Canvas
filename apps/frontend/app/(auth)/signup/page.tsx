"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader} from "@/app/Dashboard/components/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRef, useState } from "react";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {generateOTP } from "../backend";
import { Label } from "@radix-ui/react-dropdown-menu";
export default function SignUp(){
    const router = useRouter();
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const username= useRef<HTMLInputElement>(null);
   
       async function backend(){ 
       try {
         if(!email.current?.value){
            console.log("email not typed");
            return ;
         }

         sessionStorage.setItem("userdetails",JSON.stringify({
            email:email.current?.value,
            password:password.current?.value,
            name:username.current?.value
         }));


      generateOTP (email.current.value);  // generating OTP
      router.push("/otp");
       } catch (e) {

        console.log("error" +e);

        
       }
    }
   
    return <>
   
   
  
   <CardContent className=" flex flex-col justify-center gap-5">
   <div className="grid justify-center text-2xl items-center">SignUp</div>
        <Label>Email</Label>
        <Input required ref={email} type="text" placeholder="Email" ></Input>
        <Label>Password</Label>
           <Input required ref={password} type="password" placeholder="Password"></Input>
         <Label>Username</Label>
           <Input required ref={username} onKeyDown={(e)=>{ if (e.key === "Enter"){backend()}}} type="text" placeholder="Enter your name"></Input>
        <Button onClick={backend} size="lg" className="text-md rounded-full" >SignUp</Button>
        <div className="flex font-light text-gray items-start justify-end w-full">
        <Link href="./signin">login</Link>
        </div>
        </CardContent>
   
      
        </>
}