const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("send_value", () => {
    let valueToSend = Math.floor(Math.random() * 10000);
    socket.emit("receive_value", valueToSend);
  });
});

server.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
