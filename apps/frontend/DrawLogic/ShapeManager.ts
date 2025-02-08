import ShapeClass from "./ShapeClass";

export default class ShapeManager {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private shapes: ShapeClass[];
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.shapes = [];
    }

   

    addShape(shape: ShapeClass) {
        this.shapes.push(shape);
        this.render();
    }

    render() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.shapes.forEach((shape) => shape.draw());
    }
}
