import ShapeClass from "./ShapeClass";

export default class CircleClass extends ShapeClass {
    private centerX: number;
    private centerY: number;
    private radius: number;

    constructor(canvas: HTMLCanvasElement, centerX: number, centerY: number, radius: number) {
        super(canvas);
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }

    draw() {
        if (!this.ctx) return;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    ToJson(){
        return {
            "shape":{
            type:"circle",
            centerX:this.centerX,
            centerY:this.centerY,
            radius:this.radius
            }
         
        }
    }
}
