import { Card, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

export default function AuthLayout({children}:{
    children:ReactNode
}){
return <div className="h-screen flex w-screen  justify-center items-center">

     <Card className="w-96 h-96 flex bg-gradient-to-br from-blue-50 to-indigo-50 flex-col font-black margin-5 justify-center margin-3 items-center">
     {children}

     </Card>
        
   

</div>
   

}