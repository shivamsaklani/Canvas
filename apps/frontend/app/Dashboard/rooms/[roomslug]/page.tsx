import { UserAuth } from "../../components/UserAuth";

export default async function RoomPage({params} :{
    params:{
    roomslug:string
    }
}){
    const roomslug= (await params).roomslug;
    return <UserAuth roomslug={roomslug}/>

}