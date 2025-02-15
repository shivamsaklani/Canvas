import { tools } from "@repo/canvas/shapes";
import { atom } from "recoil";

export const GlobalSelectedTool = atom<tools>({
    key:"GlobalSelectedTool",
    default:tools.rect,
})