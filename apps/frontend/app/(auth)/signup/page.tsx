"use client"
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {generateOTP } from "../backend";
import { Label } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
export default function SignUp(){
    const router = useRouter();
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const username= useRef<HTMLInputElement>(null);
   
       async function backend(){ 
       try {
         if(!email.current?.value){
            toast.error("Please enter your Email");
            return ;
         }

         sessionStorage.setItem("userdetails",JSON.stringify({
            email:email.current?.value,
            password:password.current?.value,
            name:username.current?.value
         }));


      const genearate =await generateOTP (email.current.value);
      if(genearate.status === 200){
         router.push("/otp");
      } else{
         toast.error("Try Again");
      }
       } catch (error) {
         const e = error as AxiosError;
         if(e.response?.status=== 409){
            toast.error("User Already Exist please Signin");
           }
           else{
            toast.error("Wrong email or password");

           }
        
       }
       
    }
   
    return <>
   
   
  
   <CardContent className=" flex flex-col justify-center gap-y-5">
   <div className="grid justify-center text-2xl items-center">SignUp</div>
        <Label>Email</Label>
        <Input required ref={email} type="text" placeholder="Email" ></Input>
        <Label>Password</Label>
           <Input required ref={password} type="password" placeholder="Password"></Input>
         <Label>Username</Label>
           <Input required ref={username} onKeyDown={(e)=>{ if (e.key === "Enter"){backend()}}} type="text" placeholder="Enter your name"></Input>
        
        <div className="flex font-light text-gray items-start justify-end w-full">
        <Link href="./signin">login</Link>
        </div>
        <div className="flex justify-center">
        <Button onClick={backend} size="lg" className="text-md w-full rounded-lg" >SignUp</Button>
        </div>
        </CardContent>
      
        </>
}