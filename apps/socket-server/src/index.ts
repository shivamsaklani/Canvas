import {WebSocket, WebSocketServer} from "ws"
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config"
import {Database} from "@repo/db/database";
const wss =new WebSocketServer({port:8081});
interface User{
  ws:WebSocket,
  rooms:string[],
  userId:string
}
type shapes ={
  type :"rect",
  x:number,
  y:number,
  width:number,
  height:number
} | {
  type :"circle",
  center :number
}



const Users:User[]=[];

const existingShapes:shapes[]=[];


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
    const user =verifyUser(token) as string;
    if (Users.find(user=>{user.userId})) {
      return;
     
    }
    else{
      Users.push({
        userId:user,
        ws:ws,
        rooms:[]
  
      });
    }
    
    
    ws.on("message",async (mesg:string)=>{
      const parsedData = JSON.parse(mesg.toString());  // { type = "joinroom" |"closeroom" | "createshape" ,roomId:"roomId"} add shapes for createshape
      console.log(parsedData);




      /// Join Room Logic///
      if(parsedData.type === "joinroom"){
        const activeuser=Users.find(x =>x.ws === ws);
        activeuser?.rooms.push(parsedData.roomId);
      }



      /// close room ///
      if(parsedData.type === "closeroom"){
        const activeuser=Users.find(x =>x.ws === ws);
        if(!activeuser){
          return;
        }
        activeuser.rooms= activeuser?.rooms.filter(x => x === parsedData.roomId); 
      }
      ///Create Shape///

        if(parsedData.type === "createshape"){
  
          const roomId=parsedData.roomId;
          const shape=parsedData.shape as string;

        

         try {
           await Database.shapes.create({
             data:{
               roomId:Number(roomId),
               shape:shape as string,
               userId:user as string
             }
           });
         } catch (e) {
            console.log(e);
          
         }






          // only subscribed Users can see realtime Creation of Shapes //
          Users.forEach(subscibeUser =>{

            if(subscibeUser.rooms.includes(roomId)){
              subscibeUser.ws.send(JSON.stringify({
                type:"shapes",
                shape:shape,
                roomId
              }))
            }
          });
         }//create shape ends 
    });

   

})