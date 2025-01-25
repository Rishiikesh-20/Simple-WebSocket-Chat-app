"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userConnected = 0;
let socketArr = [];
let userArr = [];
wss.on("connection", (socket) => {
    socketArr.push(socket);
    console.log("Websocket Connected");
    socket.on("message", (message) => {
        let parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            userArr.push({ roomId: parsedMessage.payload.roomId, socket });
        }
        else if (parsedMessage.type === "chat") {
            let current = userArr.find(x => x.socket === socket);
            let currentRoomUsers = userArr.filter(x => x.roomId === (current === null || current === void 0 ? void 0 : current.roomId));
            if (currentRoomUsers) {
                for (let i = 0; i < currentRoomUsers.length; i++) {
                    currentRoomUsers[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});
