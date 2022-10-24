import React, { useRef, useState } from "react";

function App() {
  const nameRef = useRef(null);
  const msgRef = useRef(null);
  const [data, setData] = useState("");

  const onSubmit = () => {
    connection.send("name", nameRef.current.value);
    console.log(nameRef.current.value);
    connection.send("msg", msgRef.current.value);
  };

  const url = "ws://localhost:8080";
  const connection = new WebSocket(url);
  connection.binaryType = "arraybuffer";

  // connection.onopen = () => {
  //   connection.send("Message From Client");
  // };

  connection.onerror = (error) => {
    console.log(`Errors: ${error}`);
  };

  connection.onmessage = (e) => {
    console.log(e.data);
    // setData(e.data);
  };

  connection.onmessage("msg", (dataFromServer) => setData(dataFromServer));

  connection.addEventListener("msg", (dataFromServer) =>
    console.log(dataFromServer)
  );

  return (
    <div className="flex flex-col gap-4 m-4">
      <div>
        <label className="mr-2">Name</label>
        <input
          type="text"
          className="border focus:ring-none focus:border"
          ref={nameRef}
        />
      </div>
      <div>
        <label className="mr-2">Message</label>
        <input
          type="text"
          className="border focus:ring-none focus:border"
          ref={msgRef}
        />
      </div>
      <div>
        <button
          className="bg-blue-500 p-2 rounded-md text-white text-sm font-medium"
          onClick={onSubmit}
        >
          Send message
        </button>
      </div>
      <div>{data && data}</div>
    </div>
  );
}

export default App;
