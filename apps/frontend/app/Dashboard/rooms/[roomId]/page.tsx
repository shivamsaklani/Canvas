import InitDraw from "@/DrawLogic/Draw";
import { Canvas } from "../../components/Canvas";

export default async function RoomPage({params} :{
    params:{
    roomId:string
    }
}){
    const roomId= (await params).roomId;
    console.log(roomId);

    return <Canvas roomId={roomId}/>

}