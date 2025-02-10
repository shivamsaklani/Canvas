import { ReactNode } from "react";

export default function AuthLayout({children}:{
    children:ReactNode
}){
return <>
    <div className=" grid grid-cols-1 sm:grid-cols-2 h-screen w-screen">
   
     <div className="relative flex justify-center items-center">
     
     </div>
     <div className="relative sm:grid  grid-flow-rows">
      {children}
        
        </div>
    
</div>
   

</>

}