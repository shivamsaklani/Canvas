"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { use, useRef } from "react";
import { data } from "react-router-dom";
export default function SignIn(){
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    async function backend(){
       try {
      const response=await axios.post( "http://localhost:3001/signin",{
        
            "email":email.current?.value,
            "password":password.current?.value,
    
      });
      localStorage.setItem("token",response.data.token);
       } catch (e) {

        console.log("error" +e);

        
       }
    }
   
    return <>
       
        <CardHeader className="text-white text-lg">SignIn</CardHeader>
        <CardContent className=" flex justify-center items-center flex-col gap-3 ">
        <Input ref={email} type="text" placeholder="Email" ></Input>
           <Input ref={password} type="password" placeholder="Password"></Input>
        <Button onClick={backend} size="lg" >SignIn</Button>
        </CardContent>
     
        </>
    
       

   
       
    
}