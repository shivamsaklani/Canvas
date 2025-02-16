"use client"
import { CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { generateOTP } from "../backend";
import { Label } from "@radix-ui/react-dropdown-menu";
import { otpDetails } from "@repo/canvas/shapes";
import toast from "react-hot-toast";

export default function OTPgenerate(){
    const router = useRouter();
    const [userdetails, setUserDetails] = useState<otpDetails>({
      name:"",
      email:"",
      password:""
    });

    useEffect(() => {
        const storedDetails = sessionStorage.getItem("userdetails");
        if (storedDetails) {
            setUserDetails(JSON.parse(storedDetails));
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
          toast.success("User verified");
          router.push("/signin");

        }
      
         } catch (e) {
  
          toast.error("Try again"+e);
          return;
  
          
         }
      }


    return(
      <div className="grid gap-y-5">
   
    
                <CardContent className="flex flex-col justify-center gap-y-5">
                <div className="flex justify-center text-2xl items-center">Verify User</div>
                    <Label>Enter OTP</Label>
                    <Input required type="text" ref={OTP} placeholder="Enter your Otp"/>
                     <div className="flex justify-end font-light cursor-pointer" onClick={()=>{generateOTP(userdetails.email)}}>send otp again?</div>
                     <div className="flex justify-center ">
                <Button onClick={backend}  size="lg" className="text-md w-full rounded-lg" > Verify User </Button>
                </div>
                 
                </CardContent>
               

    </div>
            
    )
}