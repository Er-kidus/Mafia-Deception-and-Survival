// leaveRoomTest.js
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:8080";
const ROOM_ID = "V6SRXY";       // Room to leave
const USER_ID = "FaxQ4Y7pJ6h2yTtKAAAD";  // User who should leave

const player = io(SERVER_URL, {
  transports: ["websocket"], // ensures WebSocket connection
});

player.on("connect", () => {
  console.log("Connected to server as:", player.id);

  // Emit leaveRoom immediately after connection
  player.emit("leaveRoom", { roomId: ROOM_ID, userId: USER_ID });
  console.log(`Requested to leave room ${ROOM_ID}`);
});

// Listen for updates from the server
player.on("roomUpdated", (data) => {
  console.log("Room updated:", data);
});

player.on("playerLeft", (data) => {
  console.log("Server confirmed player left:", data);
});

player.on("error", (err) => {
  console.error("Socket error:", err);
});

player.on("disconnect", () => {
  console.log("Disconnected from server");
});
