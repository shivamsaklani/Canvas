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
        this.renderShapes();
        this.initHandlers();
    }

    setTools(tools:tools){
        this.selectedTool = tools;
    }

    async loadStoredShapes() {
        try {
            const storedShapes = await StoredShapes(this.roomId);
            storedShapes.forEach((shape: any) => {
                switch (shape.type) {
                    case "rectangle":
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

    renderShapes() {
        this.ws.onmessage = (e) => {

            try {
                const parsedData = JSON.parse(e.data);
              
                if (parsedData.type === "createshape") {
                    const data = JSON.parse(parsedData.shape); // Correctly parse the shape object
                    console.log(data.shape.type);
                    console.log(data.shape);
                    let shape;
                    switch (data.shape.type) { // Switch on the correct key
                        case "circle":
                            shape = new CircleClass(this.canvas, data.shape.centerX, data.shape.centerY, data.shape.radius);
                            break;
                        case "rectangle":
                            shape = new RectangleClass(this.canvas, data.shape.x, data.shape.y, data.shape.width, data.shape.height);
                            break;
                        case "line":
                            shape = new LineClass(this.canvas, data.shape.startX, data.shape.startY, data.shape.endX, data.shape.endY);
                            break;
                        default:
                            console.warn("Unknown shape type:", data.shape.type);
                    }
    
                    if (shape) {
                        this.shapeManager.addShape(shape);
                        this.ctx?.clearRect(0,0,this.canvas.width,this.canvas.height);
                        this.shapeManager.render();
                    }
                }
            } catch (error) {
                console.error("Error processing WebSocket data:", error);
            }
        };
    }
    

    destroyHandler(){
        this.canvas.removeEventListener("mousedown",this.mouseDown);
        this.canvas.removeEventListener("mouseup", this.mouseUp);
        this.canvas.removeEventListener("mousemove",this.mouseMove);
    }

    initHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDown);
        this.canvas.addEventListener("mouseup", this.mouseUp);
        this.canvas.addEventListener("mousemove",this.mouseMove);
    }

    mouseDown = (e: MouseEvent) => {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
    }

    mouseUp = (e: MouseEvent) => {
          if (this.clicked) {
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
                this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.shapeManager.addShape(shape);

              
                // Send shape to WebSocket
                this.ws.send(JSON.stringify({
                    type: "createshape",
                    shape: JSON.stringify(shape.ToJson()),
                    roomId: this.roomId
                }));
            }
        }

       
    }
    mouseMove = (e: MouseEvent) => {
        if (!this.clicked || !this.ctx) return;
    
        const endX = e.clientX - this.canvas.offsetLeft;
        const endY = e.clientY - this.canvas.offsetTop;
    
        // Clear canvas before drawing new shape
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Redraw existing shapes before drawing new preview
        this.shapeManager.render();
    
        this.ctx.beginPath(); // Start new drawing path
    
        switch (this.selectedTool) {
            case tools.rect:
                this.ctx.strokeRect(this.startX, this.startY, endX - this.startX, endY - this.startY);
                break;
            case tools.circle:
                const radius = Math.sqrt((endX - this.startX) ** 2 + (endY - this.startY) ** 2) / 2;
                this.ctx.arc(this.startX, this.startY, radius, 0, Math.PI * 2);
                break;
            case tools.line:
                this.ctx.moveTo(this.startX, this.startY);
                this.ctx.lineTo(endX, endY);
                break;
        }
        this.ctx.stroke();
    };
    
}
