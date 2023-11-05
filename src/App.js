import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "../src/logo/live-chat.png"
import { io } from "socket.io-client";
const socket = io("http://localhost:3005/");
function App() {
  const [message, setMessage] = useState("");
  const [sender, setsender] = useState(["hello Vimal", "hello"]);
  const [resiver, setresiver] = useState(["hello Prince", "hello"]);

  const [premessage, setPreMessage] = useState("");

  const [name, setName] = useState("");
  const [user, setuser] = useState("");


  useEffect(() => {
    socket.on("CLIENTAll", (data) => {
      console.log(data);
      resiver.push(data)
    });
  }, []);
  // const sendMessage = () => {
  //   socket.emit("MESSAGE", "WORKING FINE BY THE USER");
  // };
  const sendBroadCast = () => {
    socket.emit("BROADCAST", message);
  };
  const handleChange = (e) => {
    setuser(e.target.value);

  };
  const handleChangeMessage = (e) => {
    e.preventDefault()
    setPreMessage(e.target.value);

  };
  const HandleName = (e) => {
    setName(user)
    localStorage.setItem("user", user)
  };
  const handleMessage = (e) => {
    setMessage(premessage)
    localStorage.setItem("message", message)
    sendBroadCast()

    setPreMessage("")

  };
  return (
    <div className="parent">
      {name === null ? (
        <div className="loginParent">
          {" "}
          <h1>Login</h1>
          <h2 className="nameParent">
            <input
              name="userName"
              value={name}
              type="text"
              required
              placeholder="Your Name"
              onChange={handleChange}
            />

            <button onClick={() => HandleName()} type="button" className="nameButton">login Now</button>
          </h2>{" "}
        </div>
      ) : (
        <div className="ChatParent">
          <div className="flex" >
            <img src={logo} />
            <h1 className="userNameGreeting">Chat Bot {name}</h1>
          </div>
          <section className="chatParent">
            <div className="containeer" >
              {
                resiver.map((item, index) => {
                  return (
                    <div key={index} className="resiverCointainer" >
                      <h2 className="resiver" >{item}</h2>
                    </div>
                  )
                })
              }
            </div>
            <div className="containeer" >
              {
                sender.map((item, index) => {
                  return (
                    <div key={index} className="senderCointainer" >
                      <h2 className="sender" >{item}</h2>
                    </div>
                  )
                })
              }
            </div>
            <div className="footer">
              <input
                name="message"
                value={premessage}
                type="text"
                className="messageInput"
                required
                placeholder="Type Something..."
                onChange={handleChangeMessage}
              />

              <button onClick={() => handleMessage()} type="button" className="SendButton">Send</button>
            </div>
          </section>
        </div>
      )}
      {/* <br></br> <button onClick={sendBroadCast}>send broadcast</button> */}
      {/* <br></br> <button onClick={sendMessage}>send Message</button> */}
    </div>
  );
}

export default App;