"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import Link from "next/link";
import { use, useRef } from "react";
export default function SignIn(){
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    async function backend(){
       try {
      const response=await axios.post( `${HTTP_BACKEND}/signin`,{
        
            "email":email.current?.value,
            "password":password.current?.value,
    
      });
      const token =response.data.token;
      if(!token){
         return;
      }
      else{
         localStorage.setItem("token",response.data.token);

      }
      
       } catch (e) {

        console.log("error" +e);

        
       }
    }
   
    return <>
       
        <CardHeader className="font-black text-xl">SignIn</CardHeader>
        <CardContent className=" flex justify-center items-center flex-col gap-3 ">
        <Input ref={email} type="text" placeholder="Email" ></Input>
           <Input ref={password} type="password" placeholder="Password"></Input>
        <Button onClick={backend} size="lg" className="text-md" >SignIn</Button>
        <div className="flex font-light font-gray justify-end w-full"><Link href="./signup">New user</Link></div> 
       
        </CardContent>
        
        
       
        
     
        </>
    
       

   
       
    
}