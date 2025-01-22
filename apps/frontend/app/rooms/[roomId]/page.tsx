export default async function Canvas({params}:{
    params :{
        roomId:string
    }
}){
    const roomId = (await params).roomId;
    return <div>
        {roomId}
   
    </div>
}