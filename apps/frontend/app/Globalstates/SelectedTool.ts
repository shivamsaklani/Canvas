import { atom } from "recoil";
export enum tools {
    circle = "circle",
    rect = "rectangle",
    line = "line",
    zoom = "zoom",
    eraser = "eraser",
    arrow = "arrow",
    text = "text",
    
}
export const GlobalSelectedTool = atom<tools>({
    key:"GlobalSelectedTool",
    default:tools.rect,
})