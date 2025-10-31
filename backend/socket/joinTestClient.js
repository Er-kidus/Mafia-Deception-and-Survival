// joinTestClient.js
import { io } from "socket.io-client";

// Replace this with your actual backend URL
const SERVER_URL = "http://localhost:8080";

// Replace this with the room ID you want to join
<<<<<<< HEAD
const ROOM_ID ="IAWEZU"; // e.g. "X8J1ZL"
=======
const ROOM_ID = "DAGSZX"; // e.g. "X8J1ZL"
>>>>>>> b551126f3a0d309b24e669dcf414ef98426bd02c

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
