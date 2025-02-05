import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
export default function Dashcard({title,content,icon:Icon}:{
    title:string,
    content:string,
    icon:React.ElementType
}){
    return(
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {Icon && <Icon/>}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{content}</div>
         
        </CardContent>
        
       
      </Card>
    )
}