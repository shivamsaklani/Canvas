export default class ShapeClass {
    protected ctx: CanvasRenderingContext2D | null;
    protected canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    draw() {
        if(!this.ctx) return;
        // This will be overridden by subclasses
    }

    ToJson(){

    }
}
