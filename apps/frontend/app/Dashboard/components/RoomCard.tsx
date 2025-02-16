import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
interface roomcard{

        reference:React.RefObject<HTMLInputElement>,
        btnfun: ()=>void,
        title: string,
        placeholder:string,
        Icon?:React.ElementType,
        button:string
    
}
export default function RoomCard({reference,placeholder,Icon:Icon,btnfun,title,button}:roomcard){

    return (
        <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Input ref={reference}
                placeholder={placeholder}
                onKeyDown={(e)=>{ if (e.key === "Enter"){btnfun()}}}
              />
            </div>
            <Button onClick={btnfun}>
              {Icon && <Icon/>}
              {button}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
}