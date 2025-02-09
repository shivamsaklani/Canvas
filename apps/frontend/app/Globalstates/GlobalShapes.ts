import ShapeClass from "@/DrawLogic/ShapeClass";
import { atom } from "recoil";

export const GlobalShapes = atom<ShapeClass[]>({
    key:"GlobalShapes",
    default:[]
})