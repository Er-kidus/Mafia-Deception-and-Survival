// testCreateRoom.js
import { io } from "socket.io-client";

const URL = "http://localhost:8080"; // your backend URL
const socket = io(URL);

socket.on("connect", () => {
  console.log(`Connected with ID: ${socket.id}`);

  // Emit createRoom event to the server
  socket.emit("createRoom", {
    roomName: "Test Room",
    hostId: socket.id,
    // players:[{ userId: hostId, role: null, alive: true, pinnedSuspects: [] }],
    config: {
      clueTime: 5,
      firstDiscussionTime: 10,
      secondDiscussionTime: 15,
      argueTime: 15,
      defendTime: 10,
      voteTime: 1,
      maxPlayers: 10,
      mafiaCount: 3,
      skipVoteEnabled: true,
    },
  });
});

// Listen for confirmation from the server
socket.on("roomUpdated", (room) => {
  console.log("✅ Room created successfully:");
  console.log(room);
});

// Optional: handle any error messages
socket.on("errorMessage", (msg) => {
  console.error("❌ Server Error:", msg);
});
