import { tools } from "@/app/Dashboard/components/Canvas";
import { StoredShapes } from "./Draw";
export class DrawClass {
    private clicked = false;
    private startX = 0;
    private startY = 0;
    private selectedTool: tools = tools.rect;
    private existingShapes: shapes[];
    private canvas: HTMLCanvasElement;
    private roomId: string;
    private ws: WebSocket;
    private ctx: CanvasRenderingContext2D | null;


    constructor(canvas: HTMLCanvasElement, roomId: string, ws: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.existingShapes = [];
        this.roomId = roomId;
        this.ws = ws;
        this.startDraw();
        this.createShapes();
        this.initHandler();
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDown);
        this.canvas.removeEventListener("mousemove", this.mouseMove);
        this.canvas.removeEventListener("mouseup", this.mouseUp);
    }


    async startDraw() {
        console.log("new canvasdrawing");
        this.existingShapes = await StoredShapes(this.roomId);
        this.renderDraw();
    }
    setTool(tools: tools) {
        this.selectedTool = tools;
    }
    createShapes() {
        this.ws.onmessage = (event) => {
            const parsedata = JSON.parse(event.data);
            if (parsedata.type === "createshape") {
                const data = JSON.parse(parsedata.shape);
                this.existingShapes.push(data.shape);
                this.renderDraw();
            }
        }
    }

    renderDraw() {
        if (!this.ctx) {
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx?.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
        })

    }
    mouseDown = (e: MouseEvent) => {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;

    }

    mouseUp = (e: MouseEvent) => {
        let shape:shapes;
        if(this.selectedTool == "rectangle"){
            this.clicked = false;
        let X = this.startX;
        let Y = this.startY;
        let w = Math.abs(e.clientX - this.startX);
        let h = Math.abs(e.clientY - this.startY);

         shape = {
                type: "rect",
                x: X,
                y: Y,
                width: w,
                height: h
            }
            this.ws.send(JSON.stringify({
                type: "createshape",
                shape: JSON.stringify(
                    {
                        shape
                    }
                ),
                roomId: this.roomId
    
    
            }))
    

        }
       


        
    }

    mouseMove = (e: MouseEvent) => {
        if (this.clicked) {
           if (this.selectedTool == "rectangle") {
             let w = Math.abs(e.clientX - this.startX);
             let h = Math.abs(e.clientY - this.startY);
             this.renderDraw();
             this.ctx?.strokeRect(this.startX, this.startY, w, h);
           }


        }

    }

    initHandler() {
        this.canvas.addEventListener("mousedown", this.mouseDown);
        this.canvas.addEventListener("mouseup", this.mouseUp);
        this.canvas.addEventListener("mousemove", this.mouseMove);
    }


}