import React, { useState, useEffect } from 'react';
import { GreeterClient } from "./grpc/helloworld_grpc_web_pb";
import { HelloRequest, HelloReply } from "./grpc/helloworld_pb";
import { getMessage } from './api/Message';

function App() {
  const [message, setMessage] = useState('Hello world!');
  useEffect(()=>{
    getMessage("sushrut", setMessage);
  },[])
  return (
    <div>{message}</div>
  );
}

export default App;
