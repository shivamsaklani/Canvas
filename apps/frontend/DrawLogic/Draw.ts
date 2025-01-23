import{ Database } from "@repo/db/database"
import axios from "axios";

type shapes ={
    type :"rect",
    x:number,
    y:number,
    width:number,
    height:number
} | {
    type :"circle",
    center :number
}

export default async function InitDraw(canvas: HTMLCanvasElement,roomId:string){
    const existingShapes:shapes[]=[];
     let clicked = false;
     let startX=0;
     let startY=0;
    const ctx = canvas.getContext("2d");
    if(!ctx){
        return;
    }

    canvas.addEventListener("mousedown",(e)=>{
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;

    });
    canvas.addEventListener("mouseup",(e)=>{
        clicked =false;
        let X = startX;
        let Y=startY;
        let w= Math.abs( e.clientX - startX );
        let h = Math.abs( e.clientY - startY);

        
        existingShapes.push({
            type:"rect",
            x:X,
            y:Y,
            width:w,
            height:h
        })

    });

   


    canvas.addEventListener("mousemove",(e)=>{
        if(clicked){
        let w= Math.abs(e.clientX - startX) ;
        let h = Math.abs(e.clientY - startY);
         clearDraw(existingShapes,canvas);  
         ctx.strokeRect(startX,startY,w,h);
            

        }

    });

}


export function clearDraw(existingShapes:shapes[], canvas:HTMLCanvasElement){
    const ctx=canvas.getContext("2d");
    if(!ctx){
        return;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);

    existingShapes.map((shape)=>{
        if(shape.type === "rect"){

            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);

        }
    })
           


}

async function StoredShapes({roomId}:{
    roomId:string,
}){

    const response = await axios.get("http://localhost:3001/canvas/" + roomId);
    const storedshape = response.data.shape;


    // const shape = storedshape.map(x=>{
    //     const parsedData = JSON.parse(x.shape);

    
    // });





}