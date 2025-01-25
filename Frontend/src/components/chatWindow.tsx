import { useContext, useEffect, useState } from "react"
import { WssContext } from "./wsProvider"
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

export function Chat(){
  const wss=useContext(WssContext);
  const [message,setMessage]=useState<String[]>(["Heloo","Everyone"]);
  const [sendMess,setSend]=useState<string>("");
  useEffect(()=>{
    if(wss){
      wss.onmessage=(message)=>{
        setMessage(m=>[...m,message.data]);
      }
    }else{
      console.log("Message is not received , there is an error");
    }
  },[])
  function handleClick(){
    if (wss && sendMess.trim()) {
      wss.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: sendMess,
          },
        })
      );
    }
    setSend("");
  }
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="p-5 border border-white rounded-md h-[80vh] w-[80vw] flex flex-col">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="p-5 space-y-5 flex flex-col">
            {message.map((mes,ind)=>(
              <span key={ind} className="bg-white p-3 ">
                {mes}
              </span>
            ))}
          </div> 

          <div>
            <Input size="md" value={sendMess} onChange={(e)=>setSend(e.target.value)} placeHolder="SendMessage"/>
            <Button text="Send" variant="secondary" color="red-500" size="md" onClick={handleClick}/>
          </div>
        </div>
        
      </div>
    </div>
  )
}