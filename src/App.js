import React, { useState } from "react";
import { getMessage } from "./api/Message";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Hello world!");
  const [name, setName] = useState("");

  const sendRequest = (e) => {
    e.preventDefault();
    if (name === "") {
      setName("World!");
    }
    getMessage(name, setMessage);
  };
  return (
    <div class="login-box">
      <h2>React GRPC Web</h2>
      <h2>{message}</h2>
      <form onSubmit={(e) => sendRequest(e)}>
        <div class="user-box">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Your input</label>
        </div>
        <button>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Greet yourself!
        </button>
      </form>
    </div>
  );
}

export default App;
