import { useContext, useEffect, useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { WssContext } from "./wsProvider";
import { useNavigate } from "react-router-dom";

export function Join(){
  const [roomId,setRoomId]=useState("");
  const navigate=useNavigate();
  const wss=useContext(WssContext);
  function handleClick(){
    if(wss){
      let obj={
        type:"join",
        payload:{
          roomId:roomId
        }
      }
      wss.send(JSON.stringify(obj));
      navigate("/chat")
    }else{
      console.log("Error occured")
    }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="p-7 border rounded-lg flex justify-between space-x-5">
        <Input placeHolder="Room Id" size="md" value={roomId} onChange={(e)=>setRoomId(e.target.value)}/>
        <Button text="Join" variant="secondary" size="md" color="black" onClick={handleClick}/>
      </div>
    </div>
  )
}