"use client"
import { Button } from "@/components/ui/button";
import { CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRef } from "react";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SignUp(){
    const router = useRouter();
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const username= useRef<HTMLInputElement>(null);
    async function backend(){
       try {
      await axios.post( `${HTTP_BACKEND}/signup`,{
        
            "email":email.current?.value,
            "password":password.current?.value,
            "name":username.current?.value
    
      });
      router.push("/Dashboard");
       } catch (e) {

        console.log("error" +e);

        
       }
    }
   
    return <>
        <CardContent className=" flex justify-center items-center flex-col gap-3 ">
        <Input ref={email} type="text" placeholder="Email" ></Input>
           <Input ref={password} type="password" placeholder="Password"></Input>
           <Input ref={username} onKeyDown={(e)=>{ if (e.key === "Enter"){backend()}}} type="text" placeholder="Enter your name"></Input>
        <Button onClick={backend} size="lg" className="text-md" >SignUp</Button>
        <div className="flex font-light text-gray items-start justify-end w-full">
        <Link href="./signin">login</Link>
        </div>
        </CardContent>
       
         
       
        </>
    
       

   
       
    
}