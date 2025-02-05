import { Card} from "@/components/ui/card";
import { ReactNode } from "react";

export default function AuthLayout({children}:{
    children:ReactNode
}){
return <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-300">
<div className=" inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(173,216,230,0.5),_transparent_60%)]"></div>
<div className=" inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(135,206,230,0.5),_transparent_30%)]"></div>


     <Card className="w-96 h-96 flex flex-col box-shadow  font-black justify-center items-center">
        <div className="text-black font-bold p-5 text-2xl">Welcome to Canvas</div>
     {children}

     </Card>
        
   

</div>
   

}