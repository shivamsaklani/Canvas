import { ReactNode } from "react";
import Image from "next/image";
import bgimg from "../../public/images/bg.png";
import { Toaster } from "react-hot-toast";
export default function AuthLayout({children}:{
    children:ReactNode
}){
return <>
    <div><Toaster/></div>
    <div className=" grid grid-cols-1 sm:grid-cols-2  h-screen w-screen">
   
     <div className="relative flex justify-center items-center">
        
        <Image src={bgimg} alt="Background Image"/>
     
     </div>
     <div className="relative sm:grid grid-flow-rows">
      {children}
        
        </div>
    
</div>
   

</>

}