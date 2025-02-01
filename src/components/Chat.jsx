import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage,resetMessage } from '../redux/chatSlice'
import socket from '../utils/socket'
const Chat = () => {
  const [message,setMessage]=useState("")
  const dispatch = useDispatch()
  const messages = useSelector((state)=>state.chat.messages)
  useEffect(()=>{
    socket.on("message",(msg)=>{
      dispatch(addMessage(msg));
    });
    return ()=>{
      socket.off("message");
    };
  },[dispatch])
  const sendMessage=()=>{
    if(message.trim()){
      socket.emit("message",message);
      dispatch(addMessage(`You: ${message}`));
    }
  };
  const resetChat = () => {
    dispatch(resetMessage()); // Clear chat history in Redux
  };
  return (
    <div className='bg-dark text-white' style={{width:"100%",height:"100vh"}}>
    <h1 className='text-center pt-4'>Chat App<span><i className="ms-2 fa-brands fa-rocketchat text-white"></i></span></h1>
    <hr></hr>
    <div className="d-flex align-items-center justify-content-center">
    <div style={{border: "2px solid violet",width:"100%", height:"300px",overflowY: "auto" }}>
      {
        messages.map((msg,index)=>(
          <p className="text-center" key={index}>{msg}</p>
        ))
        
      }
    </div>
   </div>    
<div className='ms-5 me-5 mt-4 d-flex flex-column align-items-center' >
          <input value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="form-control text-center custom-shadow"
            style={{ width: "80%", padding: "8px" }}
            placeholder="Enter your message!"/>
          <div className='d-flex justify-content-center align-items-center mt-5'>
            <button onClick={sendMessage} className="btn btn-primary ms-2">Submit</button>
            <button onClick={resetChat} className="btn btn-danger ms-2">Reset</button>
          </div>
</div>
    </div>
  )
}

export default Chat