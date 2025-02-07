import ShapeClass from "./ShapeClass";

export default class LineClass extends ShapeClass {
    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;

    constructor(canvas: HTMLCanvasElement, startX: number, startY: number, endX: number, endY: number) {
        super(canvas);
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    draw() {
        if (!this.ctx) return;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(this.endX, this.endY);
        this.ctx.stroke();
    }
}
