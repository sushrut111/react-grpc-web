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
  const sendRequest = () => {
    if(name==''){
      name = "World!";
    }
    getMessage(name, setMessage);
  }
  return (
    <div>
      <center><input onChange={updateName} value={name}/></center><br/>
      <center><button onClick={sendRequest}>Greet yourself!</button></center><br/>
      <center><h3>{message}</h3></center>
    </div>
  );
}

export default App;
