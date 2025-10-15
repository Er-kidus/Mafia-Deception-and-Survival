import { io } from "socket.io-client";

const URL = "http://localhost:8080";
const players = [];

for (let i = 1; i <= 4; i++) {
  const socket = io(URL);
  const userId = `player${i}`;
  players.push(socket);

  socket.on("connect", () => {
    console.log(`${userId} connected: ${socket.id}`);

    if (i === 1) {
      socket.emit("createRoom", {
        roomName: "Auto Test",
        hostId: userId,
        config: { maxPlayers: 6, mafiaCount: 2, roundTime: 60 }
      });
    } else {
      setTimeout(() => {
        socket.emit("joinRoom", { roomId: "ZSCMZA", userId });
      }, 2000 * i);
    }
  });

  socket.on("roomUpdated", (room) => {
    console.log(`${userId} sees room update:`, room.players.map(p => p.userId));
  });
}
