// filepath: c:\laragon\www\anas_law_website\backend\server.js
import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*", // sesuaikan jika perlu
  },
});

let userCount = 0;

io.on("connection", (socket) => {
  userCount++;
  io.emit("userCount", userCount);

  socket.on("sendMessage", (msg) => {
    socket.broadcast.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    userCount--;
    io.emit("userCount", userCount);
  });
});

server.listen(3000, () => {
  console.log("Socket.IO server running on http://localhost:3000");
});
