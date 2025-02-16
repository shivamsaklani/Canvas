"use client"
import { Button } from "@/components/ui/button";
import { CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
export default function SignIn(){
    const email = useRef<HTMLInputElement>(null);
    const router=useRouter();
    const password = useRef<HTMLInputElement>(null);
    async function backend(){
       try {
      const response=await axios.post( `${HTTP_BACKEND}/signin`,{
        
            "email":email.current?.value,
            "password":password.current?.value,
    
      });
      toast.success("SignedIn");
      const token =response.data.token;
      if(!token){
         return;
      }
      else{
         localStorage.setItem("token",response.data.token);
         router.push("/Dashboard");

      }
      
       } catch (e) {
        toast.error("Try again"+e);

        
       }
    }
   
    return <>
        <CardContent className=" flex justify-center flex-col gap-y-5">
        <div className="grid justify-center text-2xl items-center">SignIn</div>
        <Label>Email</Label>
        <Input required ref={email} type="text" placeholder="Email" ></Input>
        <Label>Password</Label>
           <Input required ref={password}  onKeyDown={(e)=>{ if (e.key === "Enter"){backend()}}} type="password" placeholder="Password"></Input>
          <div className="flex font-light font-gray justify-end w-full"><Link href="./signup">New user</Link></div> 
          <div className="flex justify-center ">
        <Button onClick={backend} size="lg" className="text-md shadow w-full rounded-lg" >SignIn</Button>
        </div>
        </CardContent>
        
       
        </>
    
       

   
       
    
}