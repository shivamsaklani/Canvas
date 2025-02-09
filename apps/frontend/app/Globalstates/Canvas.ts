import {atom} from "recoil"

export const Globalcanvasref = atom<HTMLCanvasElement |null >({
    key:"Globalcanvasref",
    default:null
});