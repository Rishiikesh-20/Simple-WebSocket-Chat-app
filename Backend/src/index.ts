import {WebSocketServer,WebSocket} from "ws"

const wss=new WebSocketServer({port:8080})
let userConnected=0;
let socketArr:WebSocket[]=[];
interface User{
  roomId:String,
  socket:WebSocket
}
let userArr:User[]=[];
wss.on("connection",(socket)=>{
  socketArr.push(socket);
  console.log("Websocket Connected");
  socket.on("message",(message)=>{
    let parsedMessage=JSON.parse(message as unknown as string);
    if(parsedMessage.type==="join"){
      userArr.push({roomId:parsedMessage.payload.roomId,socket});
    }
    else if(parsedMessage.type==="chat"){
      let current=userArr.find(x=>x.socket===socket);
      let currentRoomUsers=userArr.filter(x=>x.roomId===current?.roomId);
      if(currentRoomUsers){
        for(let i=0;i<currentRoomUsers.length;i++){
          currentRoomUsers[i].socket.send(parsedMessage.payload.message);
        }
      }
      
    }
  })
})