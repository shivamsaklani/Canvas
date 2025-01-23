import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

export default function AuthLayout({children}:{
    children:ReactNode
}){
return <div className="h-screen flex w-screen bg-gradient-to-br from-blue-50 to-indigo-50 justify-center items-center">

     <Card className="w-96 h-96 flex flex-col bg-blue-300 margin-5 justify-center margin-3 items-center">
     {children}

     </Card>
        
   

</div>
   

}