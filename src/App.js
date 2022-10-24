import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./index.css";

const socket = io.connect("http://localhost:3001");

function App() {
  const [value, setValue] = useState();
  const [prevValue, setPrevValue] = useState();

  const [isIncreased, setIsIncreased] = useState(null);

  const getValue = () => {
    setPrevValue(value);
    socket.emit("send_value");
  };

  useEffect(() => {
    socket.on("receive_value", (data) => {
      console.log(data, value);
      data < value ? setIsIncreased(false) : setIsIncreased(true);
      setValue(data);
    });
    console.log(value);
  }, [socket]);

  return (
    <div className="m-4">
      <button className="border p-2 rounded-md" onClick={getValue}>
        Get Value
      </button>
      {prevValue && <p>Previous Value: {prevValue}</p>}
      {value && (
        <p className={isIncreased ? "text-green-500" : "text-red-500"}>
          Current Value: {value}
        </p>
      )}
    </div>
  );
}

export default App;
