// src/config/socket.js
import { Server } from "socket.io";
import { handleRoomSocket } from "../sockets/roomSocket.js";

export const initSocket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`🟢 Connected: ${socket.id}`);

    // Register socket event handlers
    handleRoomSocket(io, socket);
    socket.on("disconnect", () => {
      console.log(`🔴 Disconnected: ${socket.id}`);
    });
  });
};
