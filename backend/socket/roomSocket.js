import Room from "../src/models/Rooms.js";

export default function registerSocket(io) {
  io.on("connection", (socket) => {
    console.log(`Player connected: ${socket.id}`);

  // ---------------- Create Room ----------------
  socket.on("createRoom", async ({ roomName, hostId, config }) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    if(!hostId) return socket.emit("error", "Host ID is required");

    const newRoom = new Room({
      roomId,
      hostId,
      players: [{ userId: hostId, role: null, alive: true, pinnedSuspects: [] }],
      config,
      gameState: "setup",
      currentTimer: 0
    });

    await newRoom.save();
    socket.join(roomId);
    io.to(roomId).emit("roomUpdated", newRoom);
  });

  // ---------------- Join Room ----------------
  socket.on("joinRoom", async ({ roomId, userId }) => {
    const room = await Room.findOne({ roomId });
    if (!room) return socket.emit("error", "Room not found");

    if (room.players.length >= room.config.maxPlayers)
      return socket.emit("error", "Room is full");

    room.players.push({ userId, role: null, alive: true, pinnedSuspects: [] });
    await room.save();

    socket.join(roomId);
    io.to(roomId).emit("roomUpdated", room);
  });

  // ---------------- Leave Room ----------------
  socket.on("leaveRoom", async ({ roomId, userId }) => {
    const room = await Room.findOne({ roomId });
    if (!room) return;

    room.players = room.players.filter(p => p.userId !== userId);

  // Reassign host if needed
  if (room.hostId === userId && room.players.length > 0) {
    room.hostId = room.players[0].userId;
  }

    // Delete room if empty
    if (room.players.length === 0) {
      await Room.deleteOne({ roomId });
    } else {
      await room.save();
      io.to(roomId).emit("roomUpdated", room);
    }

    socket.leave(roomId);
  });

  // ---------------- Update Config ----------------
  socket.on("updateConfig", async ({ roomId, hostId, newConfig }) => {
    const room = await Room.findOne({ roomId });
    if (!room || room.hostId !== hostId) return;

    room.config = { ...room.config, ...newConfig };
    await room.save();
    io.to(roomId).emit("roomUpdated", room);
  });

  // ---------------- Start Game ----------------
  // socket.on("startGame", async ({ roomId, hostId }) => {
  //   const room = await Room.findOne({ roomId });
  //   if (!room || room.hostId !== hostId) return;

  //   // Assign roles randomly
  //   const totalPlayers = room.players.length;
  //   const mafiaCount = room.config.mafiaCount;
  //   const shuffled = room.players.sort(() => Math.random() - 0.5);

  //   shuffled.forEach((p, index) => {
  //     p.role = index < mafiaCount ? "Mafia" : "Civilian";
  //   });

  //   room.gameState = "discussion"; // first phase
  //   await room.save();
  //   io.to(roomId).emit("roomUpdated", room);
  // });

  // ---------------- Disconnect ----------------
socket.on("disconnect", async () => {
    console.log(`Player disconnected: ${socket.id}`);

    // If your player records use a different userId than socket.id,
    // you need to map socket.id -> userId (e.g. store socket.data.userId on join).
    const rooms = await Room.find({ "players.userId": socket.id });
    for (const room of rooms) {
      // remove the disconnected player
      room.players = room.players.filter(p => p.userId !== socket.id);

      // Reassign host if needed
      if (room.hostId === socket.id && room.players.length > 0) {
        room.hostId = room.players[0].userId;
      }

      // Delete room if empty, otherwise save and notify clients
      if (room.players.length === 0) {
        await Room.deleteOne({ roomId: room.roomId });
        io.to(room.roomId).emit("roomDeleted", { roomId: room.roomId });
      } else {
        await room.save();
        io.to(room.roomId).emit("roomUpdated", room);
      }

      // Ensure socket leaves the room
      socket.leave(room.roomId);
    }
  });

} );
}
