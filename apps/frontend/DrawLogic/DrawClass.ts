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
    createShapes() { // pushes to the existing shapes array//
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
           switch(shape.type){
            case "circle":
                this.ctx?.beginPath();
                this.ctx?.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx?.stroke();
                this.ctx?.closePath();
                break;
            case "rect": this.ctx?.strokeRect(shape.x, shape.y, shape.width, shape.height);break;

            case "line" : 
                this.ctx?.beginPath();
                this.ctx?.moveTo(shape.startX,shape.startY);
                this.ctx?.lineTo(shape.endX,shape.endY);
                this.ctx?.stroke(); 
                break;              
           }
        })

    }
    mouseDown = (e: MouseEvent) => {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
    }

    mouseUp = (e: MouseEvent) => {
        let shape: shapes | null = null;
        let X = this.startX;
        let Y = this.startY;
        this.clicked = false;
        let w = e.clientX - X;
        let h = e.clientY - Y;
        switch(this.selectedTool){
            case tools.rect:{
                shape = {
                    type: "rect",
                    x: X,
                    y: Y,
                    width: w,
                    height: h
                }
                break;
            }
            case tools.circle:{
                let radius = Math.sqrt(w * w + h * h) / 2;
                
              
    
                shape = {
                    type: "circle",
                    centerX: this.startX,
                    centerY: this.startY,
                    radius: radius
                }
    
                this.renderDraw();
                this.ctx?.stroke();
                break;

            }
            case tools.line:{
                shape = {
                    type : "line",
                    startX:this.startX,
                    startY:this.startY,
                    endX:e.clientX,
                    endY:e.clientY
                }
                this.renderDraw();
                this.ctx?.stroke();
                break;
            }
        }
        if (!shape) {
            return;
        }

        this.existingShapes.push(shape);

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

    mouseMove = (e: MouseEvent) => {

        let w = Math.abs(e.clientX - this.startX);
        let h = Math.abs(e.clientY - this.startY);

        if(this.clicked===true){
            this.renderDraw();
            switch (this.selectedTool) {
                case tools.rect:
                    this.ctx?.strokeRect(this.startX, this.startY, w, h);
                    break;
                case tools.circle:
                    let dX = e.clientX-this.startX;
                    let dY = e.clientY -this.startY;
                    let radius = Math.sqrt(dX*dX + dY*dY)/2;
                    this.ctx?.beginPath();
                    this.ctx?.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
                    this.ctx?.stroke();
                    this.ctx?.closePath();
                    break;
                case tools.line:

                    this.ctx?.beginPath();
                    this.ctx?.moveTo(this.startX,this.startY);
                    this.ctx?.lineTo(e.clientX,e.clientY);
                    this.ctx?.stroke();
                    break;
            }

        }
      


    }

    initHandler() {
        this.canvas.addEventListener("mousedown", this.mouseDown);
        this.canvas.addEventListener("mouseup", this.mouseUp);
        this.canvas.addEventListener("mousemove", this.mouseMove);
    }


}