// Socket registration
import { handleRoomSocket } from "../socket/roomSocket.js";

export default function registerSocket(io) {
  io.on("connection", (socket) => {
    console.log(`🟢 Connected: ${socket.id}`);

    // Register socket event handlers
    handleRoomSocket(io, socket);
    socket.on("disconnect", () => {
      console.log(`🔴 Disconnected: ${socket.id}`);
    });
  });
}
