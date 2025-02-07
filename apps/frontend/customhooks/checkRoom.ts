import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useCheckRoom(roomslug:string):string | null{
    const [roomId,setroomId] = useState();
    console.log(roomslug);

    useEffect(()=>{
        console.log("useEffect running")
  const checkId =async()=>{
    if(!roomslug) return;
   
    const response = await axios.get(`${HTTP_BACKEND}/room/`+roomslug); 
    setroomId(response.data.roomId);
    console.log(response.data.roomId);
  }
  checkId();

    },[roomslug]);
    console.log(roomId);
    if(!roomId) return null;
    return roomId;
}