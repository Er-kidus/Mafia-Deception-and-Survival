import { set } from "mongoose";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:8080"; // adjust if needed
const ROOM_ID = "IAWEZU";                   // your test roomId
const HOST_ID = "TOzwRDlBxLuuqfMwAAAB";                  // must match room.hostId in DB

const socket = io(SERVER_URL);

socket.on("connect", () => {
  console.log("Connected as:", socket.id);
// socket.emit("joinRoom", { roomId: ROOM_ID, userId: HOST_ID });

  // Emit updateConfig event to server

  socket.emit("updateConfig", {
    roomId: ROOM_ID,
    hostId: HOST_ID,
    newConfig: {
      maxPlayers: 12,
      mafiaCount: 3,
      skipVoteEnabled: false,
      mafiaKillsPerGame: false,
      
    },
  });

  console.log("updateConfig event sent");

});

// Listen for the roomUpdated event from server
socket.on("roomUpdated", (updatedRoom) => {
  console.log("✅ Room updated successfully:");
  console.log(updatedRoom);
//   socket.disconnect();
});

// Optional error handlers
socket.on("connect_error", (err) => {
  console.error("Connection error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});
