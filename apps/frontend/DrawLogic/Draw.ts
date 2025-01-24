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
export default async function InitDraw(canvas: HTMLCanvasElement,roomId:string,ws:WebSocket){

    const existingShapes:shapes[]=await StoredShapes(roomId);
    console.log(existingShapes);
     let clicked = false;
     let startX=0;
     let startY=0;
    const ctx = canvas.getContext("2d");
    if(!ctx){
        return;
    }

    ws.onmessage=(event)=>{
        const parsedata = JSON.parse(event.data);
        if(parsedata.type ==="createshape"){
            const shape =JSON.parse(parsedata.shape);
            console.log(shape);
            existingShapes.push(shape);
            clearDraw(existingShapes,canvas);

        }


    }

    clearDraw(existingShapes,canvas);

    canvas.addEventListener("mousedown",(e)=>{
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;

    });
    canvas.addEventListener("mouseup",async (e)=>{
        clicked =false;
        let X = startX;
        let Y=startY;
        let w= Math.abs( e.clientX - startX );
        let h = Math.abs( e.clientY - startY);
        let shape:shapes ={
            type:"rect",
            x:X,
            y:Y,
            width:w,
            height:h
        }

        
        
        ws.send(JSON.stringify({
            type:"createshape",
            shape:JSON.stringify(
                {
                    shape
                }
            ),
            roomId:roomId
        

        }))

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

async function StoredShapes(roomId:string){
    console.log(roomId);

    const response = await axios.get("http://localhost:3001/canvas/" +Number(roomId));
    const storedshape = response.data.shape;
    console.log(storedshape);

    const shape = storedshape.map((x:{shape:string})=>{
        const parsedData = JSON.parse(x.shape);

        return parsedData.shape;
    

    
    });
    return shape;





}