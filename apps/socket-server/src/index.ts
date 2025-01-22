import {WebSocket, WebSocketServer} from "ws"
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config"
const wss =new WebSocketServer({port:8081});

function verifyUser(token:string):string |null{
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
    
        if (typeof decoded == "string") {
          return null;
        }
    
        if (!decoded || !decoded.userId) {
          return null;
        }
    
        return decoded.userId;
      } catch(e) {
        return null;
      }
    return null;
}


wss.on("connection",(ws:WebSocket,request)=>{

    const url =request.url;

    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token =queryParams.get('token') ||"";
    const user =verifyUser(token);
    
    ws.on("message",(mesg:string)=>{

        console.log(ws);
    
        wss.clients.forEach((ws)=>{
            ws.send(mesg.toString());

        })
    })

})