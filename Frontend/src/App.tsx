import { useEffect } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Join } from './components/Join'
import { WssProvider } from './components/wsProvider'
import { Chat } from './components/chatWindow'

function App() {
  return (
    <BrowserRouter>
      <WssProvider>
        <Routes>
          <Route path="/join" element={<Join />}/>
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </WssProvider> 
    </BrowserRouter>
  )
  
}

export default App
