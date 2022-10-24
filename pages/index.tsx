import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function Home() {
  const [value, setValue] = useState<number>();
  const [prevValue, setPrevValue] = useState<number>();

  const [colorState, setColorState] = useState<
    "increased" | "decreased" | "noChange"
  >("noChange");

  const getValue = () => {
    // setPrevValue(value);
    socket.emit("send_value");
  };

  useEffect(() => {
    socket.on("receive_value", (data: number) => {
      setValue((initValue) => {
        initValue && setPrevValue(initValue);
        return data;
      });
      console.log(prevValue, data);
      prevValue && data > prevValue
        ? setColorState("increased")
        : setColorState("decreased");
    });
  }, [socket]);

  return (
    <div className="m-4">
      <button
        className="border p-2 rounded-md focus:outline focus:outline-gray-500 focus:outline-2 hover:bg-gray-50"
        onClick={getValue}
      >
        Get Value
      </button>
      <div>
        <p>Prev value: {prevValue}</p>
        <p
          className={
            colorState === "increased"
              ? "text-green-500"
              : colorState === "decreased"
              ? "text-red-500"
              : "text-amber-500"
          }
        >
          Current Value: {value}
        </p>
      </div>
    </div>
  );
}

export default Home;
