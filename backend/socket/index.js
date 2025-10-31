// Socket registration
import { handleRoomSocket } from "./roomSocket.js";
import handleGameSocket from "./gameSocket.js";

export default function registerSocket(io) {
  io.on("connection", (socket) => {
    console.log(`🟢 Connected: ${socket.id}`);

    // Register socket event handlers
    handleRoomSocket(io, socket);
    handleGameSocket(io, socket);
    socket.on("disconnect", () => {
      console.log(`🔴 Disconnected: ${socket.id}`);
    });
  });
}
