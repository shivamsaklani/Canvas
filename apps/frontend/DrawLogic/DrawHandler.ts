import { tools } from "@/app/Dashboard/components/Canvas";
import { StoredShapes } from "./Draw";
import ShapeManager from "./ShapeManager";
import RectangleClass from "./RectangleClass";
import CircleClass from "./CircleClass";
import LineClass from "./LineClass";
import ShapeClass from "./ShapeClass";

export default class DrawHandler {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private roomId: string;
    private ws: WebSocket;
    private shapeManager: ShapeManager;
    private selectedTool: tools = tools.rect;
    private clicked: boolean = false;
    private startX: number = 0;
    private startY: number = 0;

    constructor(canvas: HTMLCanvasElement, roomId: string, ws: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.roomId = roomId;
        this.ws = ws;
        this.shapeManager = new ShapeManager(canvas);

        this.loadStoredShapes();
        this.initHandlers();
    }

    async loadStoredShapes() {
        try {
            const storedShapes = await StoredShapes(this.roomId);
            storedShapes.forEach((shape: any) => {
                switch (shape.type) {
                    case "rect":
                        this.shapeManager.addShape(new RectangleClass(this.canvas, shape.x, shape.y, shape.width, shape.height));
                        break;
                    case "circle":
                        this.shapeManager.addShape(new CircleClass(this.canvas, shape.centerX, shape.centerY, shape.radius));
                        break;
                    case "line":
                        this.shapeManager.addShape(new LineClass(this.canvas, shape.startX, shape.startY, shape.endX, shape.endY));
                        break;
                }
            });
        } catch (error) {
            console.error("Error fetching stored shapes:", error);
        }
    }

    initHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDown);
        this.canvas.addEventListener("mouseup", this.mouseUp);
    }

    mouseDown = (e: MouseEvent) => {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
    }

    mouseUp = (e: MouseEvent) => {
        this.clicked = false;
        let shape: ShapeClass| null = null;
        let endX = e.clientX;
        let endY = e.clientY;

        switch (this.selectedTool) {
            case tools.rect:
                shape = new RectangleClass(this.canvas, this.startX, this.startY, endX - this.startX, endY - this.startY);
                break;
            case tools.circle:
                let radius = Math.sqrt((endX - this.startX) ** 2 + (endY - this.startY) ** 2) / 2;
                shape = new CircleClass(this.canvas, this.startX, this.startY, radius);
                break;
            case tools.line:
                shape = new LineClass(this.canvas, this.startX, this.startY, endX, endY);
                break;
        }

        if (shape) {
            this.shapeManager.addShape(shape);

            // Send shape to WebSocket
            this.ws.send(JSON.stringify({
                type: "createshape",
                shape: JSON.stringify(shape),
                roomId: this.roomId
            }));
        }
    }
}
