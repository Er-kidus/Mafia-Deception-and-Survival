// testGameSocket.js
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:8080"; // adjust if needed
const ROOM_ID = "W8H8WX"; // use an existing roomId from DB
const socket = io(SERVER_URL, {
  transports: ["websocket"], // ensure low-latency connection
});

let joined = false;
let started = false;

socket.on("connect", () => {
  console.log("✅ Connected to server:", socket.id);

  // Step 1: Join the room
  console.log("👋 Joining room...", ROOM_ID);
  socket.emit("joinRoom", { roomId: ROOM_ID, userId: socket.id });
});

// Step 2: Room updates
socket.on("roomUpdated", (room) => {
  console.log("\n🟢 Room Updated:");
  console.log("Room ID:", room.roomId);
  console.log("Game State:", room.gameState);
  console.log(
    "Players:",
    room.players.map((p) => p.userId || p.username || "<unknown>").join(", ")
  );

  // Mark joined
  if (!joined && room.players.some((p) => p.userId === socket.id)) {
    joined = true;
    console.log("✅ Joined room as:", socket.id);
  }

  // Start game if host
  if (joined && !started && room.gameState === "setup") {
    started = true;
    console.log("🎮 Attempting to start game...");
    socket.emit("startGame", { roomId: ROOM_ID, userId: socket.id });
  }
});

// Step 3: Game state updates
socket.on("gameStateUpdated", (room) => {
  console.log("\n🔁 Game State Changed!");
  console.log("➡️ New State:", room.gameState);
  console.log("⏱️ Timer Reset To:", room.currentTimer, "seconds");

  // ✅ Check for game end here
  if (room.gameState === "ended") {
    console.log("🟡 Game has ended. Disconnecting...");
    socket.disconnect();
    process.exit(0);
  }
});

// Step 4: Timer updates
socket.on("timerUpdate", (timeLeft) => {
  process.stdout.write(`⏳ ${timeLeft}s remaining\r`);
});

// Step 5: Errors
socket.on("error", (msg) => console.log("\n❌ Server Error:", msg));
socket.on("connect_error", (err) =>
  console.log("\n🚨 Connection error:", err.message)
);

// Step 6: Disconnect
socket.on("disconnect", (reason) => {
  console.log("\n🔴 Disconnected:", reason);
});
