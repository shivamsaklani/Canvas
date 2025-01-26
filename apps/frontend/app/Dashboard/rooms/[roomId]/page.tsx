
import { UserAuth } from "../../components/UserAuth";

export default async function RoomPage({params} :{
    params:{
    roomId:string
    }
}){
    const roomId= (await params).roomId;

    return <UserAuth roomId={roomId}/>

}