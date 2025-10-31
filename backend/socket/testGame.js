// testGameSocket.js
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:8080";
const ROOM_ID = "DAGSZX"; // change if needed
const socket = io(SERVER_URL, { transports: ["websocket"] });

let joined = false;
let started = false;

socket.on("connect", () => {
  console.log("✅ Connected to server:", socket.id);

  // Step 1: Join the room
  console.log("👋 Attempting to join room:", ROOM_ID);
  socket.emit("joinRoom", { roomId: ROOM_ID, userId: socket.id });
});

socket.on("roomUpdated", (room) => {
  console.log("\n🟢 ROOM UPDATED");
  console.log("Room:", room.roomId);
  console.log("State:", room.gameState);
  console.log(
    "Players:",
    room.players
      .map(
        (p) => `${p.name || p.userId} (${p.role || "?"})${p.alive ? "" : " ❌"}`
      )
      .join(", ")
  );

  // Mark joined
  if (!joined && room.players.some((p) => p.userId === socket.id)) {
    joined = true;
    console.log("✅ Joined successfully as:", socket.id);
  }

  // Host triggers game start only once
  if (joined && !started && room.gameState === "setup") {
    started = true;
    console.log("🎮 Starting the game...");
    socket.emit("startGame", { roomId: ROOM_ID, userId: socket.id });
  }
});

socket.on("gameStateUpdated", (room) => {
  console.log("\n🔁 GAME STATE CHANGED");
  console.log("➡️ Current Phase:", room.gameState);
  console.log("⏱️ Timer:", room.currentTimer, "seconds");

  // 🧩 Handle custom states visually
  switch (room.gameState) {
    case "viewCards":
      console.log("👁️ Players are viewing their cards...");
      break;
    case "clue_time":
      console.log("💡 Clue phase — players provide clues.");
      break;
    case "discussion_1":
      console.log("💬 Discussion phase 1 — all players discuss.");
      break;
    case "discussion_2":
      console.log("💬 Discussion phase 2 — continuing discussion.");
      break;
    case "argue":
      console.log("⚔️ Argue phase — suspects defend themselves.");
      break;
    case "defend":
      console.log("🛡️ Defense phase — selected player defends.");
      break;
    case "voting":
      console.log("🗳️ Voting phase — players casting votes...");
      // Example: simulate a vote after short delay
      setTimeout(() => {
        console.log("🗳️ Auto-voting for test...");
        socket.emit("submitVote", {
          roomId: ROOM_ID,
          voterId: socket.id,
          targetId: "someTargetUserId", // replace with actual ID from logs
        });
      }, 3000);
      break;
    case "elimination":
      console.log("💀 Elimination phase — someone is being removed.");
      break;
    case "mafiaKill":
      console.log("🔪 Mafia Kill phase — mafia chooses a victim.");
      break;
    case "ended":
      console.log("🏁 GAME OVER!");
      console.log("Winner:", room.winner);
      console.log("Disconnecting...");
      socket.disconnect();
      process.exit(0);
      break;
    default:
      console.log("⏸ Unknown phase:", room.gameState);
  }
});

socket.on("timerUpdate", (timeLeft) => {
  process.stdout.write(`⏳ ${timeLeft}s remaining\r`);
});

socket.on("playerVoted", ({ voterId, targetId, message }) => {
  console.log(`🗳️ ${message} (voterId: ${voterId}, targetId: ${targetId})`);
});

socket.on("voteProgress", ({ votesCount, total }) => {
  console.log(`📊 Vote Progress: ${votesCount}/${total} votes received`);
});

socket.on("error", (msg) => console.log("\n❌ Server Error:", msg));
socket.on("connect_error", (err) =>
  console.log("\n🚨 Connection error:", err.message)
);
socket.on("disconnect", (reason) => {
  console.log("\n🔴 Disconnected:", reason);
});
