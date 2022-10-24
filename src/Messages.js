import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function Messages() {
  const msgRef = useRef(null);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    msgRef && socket.emit("send_message", { message: msgRef.current.value });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessage(data.message);
    });
  }, [socket]);

  return (
    <div>
      <input type="text" placeholder="message..." ref={msgRef} />
      <button onClick={sendMessage}>Send Message</button>
      <div>{message}</div>
    </div>
  );
}

export default Messages;
