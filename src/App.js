import React, { useState, useEffect } from 'react';
import { GreeterClient } from "./grpc/helloworld_grpc_web_pb";
import { HelloRequest, HelloReply } from "./grpc/helloworld_pb";
import { getMessage } from './api/Message';

function App() {
  const [message, setMessage] = useState('Hello world!');
  const [name, setName] = useState('');
  const updateName = (e) => {
    setName(e.target.value);
  }
  useEffect(()=>{
    let n = name;
    if (n == ""){
      n = 'world!';
    }
    getMessage(n, setMessage);
  },[name])
  return (
    <div>
      <input onChange={updateName} value={name}/><br/>
      <button>Greet yourself!</button><br/>
      <center><h3>{message}</h3></center>
    </div>
  );
}

export default App;
