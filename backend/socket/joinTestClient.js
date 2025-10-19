// joinTestClient.js
import { io } from "socket.io-client";

// Replace this with your actual backend URL
const SERVER_URL = "http://localhost:8080";

// Replace this with the room ID you want to join
<<<<<<< HEAD
const ROOM_ID ="IAWEZU"; // e.g. "X8J1ZL"
=======
const ROOM_ID = "W8H8WX"; // e.g. "X8J1ZL"
>>>>>>> a2f96d4c04e73929ecb14922d0c54f3c16579859

const player = io(SERVER_URL);

player.on("connect", () => {
  console.log("Connected to server as:", player.id);

  // Emit joinRoom event
  player.emit("joinRoom", {
    roomId: ROOM_ID,
    userId: player.id,
  });
});

// Listen for room updates from server
player.on("roomUpdated", (roomData) => {
  console.log("Joined room successfully!");
  console.log("Room Info:", roomData);
  console.log(
    "Current Players:",
    roomData.players.map((p) => p.userId)
  );
});

// Handle errors from server
player.on("error", (msg) => {
  console.error("Error from server:", msg);
});

// When disconnected
player.on("disconnect", () => {
  console.log("Disconnected from server.");
});
