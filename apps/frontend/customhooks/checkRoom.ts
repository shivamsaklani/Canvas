import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import NProgress styles

export default function useCheckRoom(roomslug: string):string | null{
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    const checkId = async () => {
      if (!roomslug) return;
      
      NProgress.start(); 
      try {
        const response = await axios.get(`${HTTP_BACKEND}/room/${roomslug}`);
        setRoomId(response.data.roomId);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setTimeout(() => {
          NProgress.done();
        }, 300);
      }
    };
    checkId();
  }, [roomslug]);
  if(!roomId) return null;

  return  roomId ;
}
