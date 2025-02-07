import ShapeClass from "./ShapeClass";

export default class RectangleClass extends ShapeClass {
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number) {
        super(canvas);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        if (!this.ctx) return;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
