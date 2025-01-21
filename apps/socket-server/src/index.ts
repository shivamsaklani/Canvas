import {WebSocket, WebSocketServer} from "ws"
import jwt, { JwtPayload } from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config"
const wss =new WebSocketServer({port:8081});


wss.on("connection",(ws:WebSocket,request)=>{

    const url =request.url;

    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token =queryParams.get('token') ||"";
    const decodedata=jwt.verify(token,JWT_SECRET);

    if(!decodedata || !(decodedata as JwtPayload).userId){
        ws.close();
        return;
    }
    ws.on("message",(mesg:string)=>{
        console.log(mesg.toString())
    })

})