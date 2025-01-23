import { ReactNode } from "react";

export default function AuthLayout({children}:{
    children:ReactNode
}){
return <div className="h-screen flex w-screen justify-center items-center">


        {children}
   

</div>
   

}