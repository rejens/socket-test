"use client";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import "./globals.css";

function App() {
   const socket = io("http://localhost:4000");

   useEffect(() => {
      socket.on("connect", () => {
         // This code will run when the component mounts in the browser.
         // const messageList = document.querySelector(".messageBox");
         // messageList.innerHTML += `<span>connected with ${socket.id}</span><br>`;
      });

      socket.on("receive-message", (message) => {
         const messageList = document.querySelector(".messageBox");
         messageList.innerHTML += `<p>${message}</p>`;
      });
   }, []);

   const handleClick = async () => {
      const message = document.querySelector(".message").value;
      const messageList = document.querySelector(".messageBox");

      messageList.innerHTML += `<p>${message}</p>`;
      const res = await fetch("http://localhost:3000/api/message", {
         cache: "no-store",
         method: "POST",
         body: JSON.stringify({ message }),
         headers: {
            "Content-Type": "application/json",
         },
      });
      console.log("res", await res.json());
      // socket.emit("send-message", message);
   };

   return (
      <div className="App">
         <div className="messageBox"></div>
         <br />
         message: <input type="text" className="message" />
         <button className="send" onClick={handleClick}>
            send
         </button>
      </div>
   );
}

export default App;
