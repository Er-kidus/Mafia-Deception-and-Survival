import assignRoles from "./helper/assignRoles.js";
import Room from "../src/models/Rooms.js";
import { startPhaseTimer } from "./helper/gameLogic.js";

export default function handleGameSocket(io, socket) {
  socket.on("startGame", async ({ roomId, userId }) => {
    try {
      let room = await Room.findOne({ roomId });

      if (!room) return socket.emit("error", "Room not found");
      if (room.gameState !== "setup")
        return socket.emit("error", "Game has already started");
      if (room.players.length < 3)
        return socket.emit("error", "Not enough players to start the game");

      const starterUserId = userId;

      // const isMember = room.players.some((p) => p.userId === starterUserId);
      // if (!isMember) {
      //   return socket.emit(
      //     "error",
      //     "You must be in the room to start the game"
      //   );
      // }

      // Assign roles
      room = assignRoles(room);
      room.gameState = "viewCards";
      // Start with a short 'viewCards' phase before automatic advancement
      room.currentTimer = 15;
      await room.save();
      io.to(roomId).emit("roomUpdated", room);
      // Begin countdown for the current phase; when it hits 0, helper advances state
      startPhaseTimer(io, roomId);
    } catch (error) {
      console.error("Error starting game:", error);
      socket.emit("error", "Failed to start game");
    }
  });
}
