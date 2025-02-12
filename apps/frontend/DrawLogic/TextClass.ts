import ShapeClass from "./ShapeClass";

export default class TextClass extends ShapeClass{
    private startX:number;
    private startY:number;
    public text;
    constructor(canvas: HTMLCanvasElement,text:string,startX:number,startY:number) {
        super(canvas);
        this.text=text;
        this.startX=startX;
        this.startY=startY;
    }


    draw(): void {
        if(!this.ctx){
            return;
        }
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(this.text,this.startX,this.startY);
    }

    ToJson(){
        return {
            "shape":{
                type:"text",
                data:this.text,
                startX:this.startX,
                startY:this.startY
            }
        }
    }
}