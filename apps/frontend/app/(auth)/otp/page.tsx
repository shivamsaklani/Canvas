"use client"
import { Card, CardContent, CardHeader } from "@/app/Dashboard/components/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { generateOTP } from "../backend";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function OTPgenerate(){
    const router = useRouter();
    const [userdetails, setUserDetails] = useState<Details>({
      name:"",
      email:"",
      password:""
    });

    useEffect(() => {
        const storedDetails = sessionStorage.getItem("userdetails");
        if (storedDetails) {
            setUserDetails(JSON.parse(storedDetails));
            console.log(userdetails);
        } else {
            router.push("/signup");
        }
    }, [router]);


    const OTP = useRef<HTMLInputElement | null>(null);

    async function backend(){
         try {
           if(!userdetails.email){
              return ;
           }
        const storedotp = await axios.post(`${HTTP_BACKEND}/otp/verify`,{
          "email":userdetails.email,
          "otp":OTP.current?.value
        });
        if(storedotp.status === 200){

          await axios.post( `${HTTP_BACKEND}/signup`,{
            "email":userdetails.email,
            "password":userdetails.password,
            "name":userdetails.name
  
          });
          router.push("/signin");

        }
      
         } catch (e) {
  
          console.log("error" +e);
          return;
  
          
         }
      }


    return(
      <div className="grid gap-y-5">
   
    
                <CardContent className="flex flex-col justify-center gap-5">
                <div className="flex justify-center text-2xl items-center">Verify User</div>
                    <Label>Enter OTP</Label>
                    <Input required type="text" ref={OTP} placeholder="Enter your Otp"/>
                    <Button onClick={backend}  size="lg" className="text-md rounded-full" > Verify User </Button>
                    <div className="flex justify-end font-light cursor-pointer" onClick={()=>{generateOTP(userdetails.email)}}>send otp again?</div>
                </CardContent>

    </div>
            
    )
}