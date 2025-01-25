import { createContext, ReactNode, useEffect, useState } from "react"

export const WssContext=createContext<WebSocket | null>(null)
export function WssProvider({children}:{children:ReactNode}){
  const [wssState,setWss]=useState<WebSocket | null>(null);
  useEffect(()=>{
    const wss=new WebSocket("ws://localhost:8080")

    wss.onopen = () => {
      console.log("WebSocket Connected");
      setWss(wss);
    };

    wss.onerror = (ev) => {
      console.log("Error: " + ev);
    };

    wss.onclose = (ev) => {
      console.log("WebSocket Closed");
    };
  },[])

  return (
    <WssContext.Provider value={wssState}>
      {children}
    </WssContext.Provider>
  )
}