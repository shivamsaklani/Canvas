import React from "react"

export default function HomeIcons(
    {activated,onclick, icon}:{
        activated:boolean
        onclick :() =>void,
        icon : React.ReactNode
    }
){
    return (
         <div className={`rounded-md ${activated ? "bg-blue-200" : "none"} p-1 hover:bg-blue-100 flex flex-row hover:rounded-md`} onClick={onclick}>
       {icon}
         </div>

     
    )

}