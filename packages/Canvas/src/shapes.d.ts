export type shapes ={
    type :"rect",
    x:number,
    y:number,
    width:number,
    height:number
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type : "line";
    startX :number;
    startY :number;
    endX :number;
    endY :number;
}

export interface userDetails{
    name:string | undefined,
    email:string | undefined,
    password:string | undefined,
    imageurl:string | undefined
  }

export type Details={
    name:string ,
    email:string,
    imageurl:string,
}
export type otpDetails ={
    name:string ,
    email:string,
    password:string

}
export enum tools {
    circle = "circle",
    rect = "rectangle",
    line = "line",
    zoom = "zoom",
    eraser = "eraser",
    arrow = "arrow",
    text = "text",
    selectobject ="select",
    panning = "panning"
    
}
