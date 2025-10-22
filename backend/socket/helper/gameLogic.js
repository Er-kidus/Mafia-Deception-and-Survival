// socket/helpers/gameLogic.js
import { Socket } from "socket.io-client";
import Room from "../../src/models/Rooms.js";
import startVotingPhase from "../gameVoteSocket.js";
const activeTimers = new Map();

export async function advanceGameState(roomId, io) {
  const room = await Room.findOne({ roomId });
  if (!room) return;

  switch (room.gameState) {
    case "viewCards":
      room.gameState = "clue_time";
      room.currentTimer = room.config.clueTime;
      break;

    case "clue_time":
      room.gameState = "discussion_1";
      room.currentTimer = room.config.firstDiscussionTime;
      break;

    case "discussion_1":
      room.gameState = "discussion_2";
      room.currentTimer = room.config.secondDiscussionTime;
      break;

    case "discussion_2":
      room.gameState = "argue";
      room.currentTimer = room.config.argueTime;
      break;

    case "argue":
      room.gameState = "defend";
      room.currentTimer = room.config.defendTime;
      break;

    case "defend":
      room.gameState = "voting";
      room.currentTimer = room.config.voteTime;
      startVotingPhase(roomId);

      break;

    case "voting":
      // check if there is a tie in votes
      if(room.topVoted.length > 1){
        room.gameState = "discussion_1";
        room.currentTimer = room.config.firstDiscussionTime;
        break;
      }
      room.gameState = "elimination";
      room.currentTimer = 0;
      break;

    case "elimination":
      if (!room.votes || Object.keys(room.votes).length === 0) {
        room.gameState = "mafiaKill";
        room.currentTimer = room.config.mafiaKillTime;
        break;
      }
      const aliveMafia = room.players.filter(
        (p) => p.alive && p.role === "mafia"
      ).length;
      const aliveCivilians = room.players.filter(
        (p) => p.alive && p.role === "civilian"
      ).length;
      if (aliveMafia === 0) {
        room.gameState = "ended";
        room.winner = "civilians";
        
      } else if (aliveMafia >= aliveCivilians) {
        room.gameState = "ended";
        room.winner = "mafia";
      } else {
        const aliveMafia = room.players.filter(
          (p) => p.alive && p.role === "mafia"
        ).length;
        const aliveCivilians = room.players.filter(
          (p) => p.alive && p.role === "civilian"
        ).length;

        const difference = aliveCivilians - aliveMafia;

        if (difference >= 3) {
          room.gameState = "mafiaKill";
          room.currentTimer = room.config.mafiaKillTime;
        } else {
          room.gameState = "discussion_1";
          room.currentTimer = room.config.firstDiscussionTime;
        }
      }
      break;
    case "mafiaKill":
      room.gameState = "discussion_1";
      room.currentTimer = room.config.firstDiscussionTime;
      break;

    case "ended": // Game has ended; no further state advancement
      break;
  }

  await room.save();
  io.to(roomId).emit("gameStateUpdated", room);
  startPhaseTimer(io, roomId);
}

export function startPhaseTimer(io, roomId) {
  if (activeTimers.has(roomId)) clearInterval(activeTimers.get(roomId));

  const interval = setInterval(async () => {
    const room = await Room.findOne({ roomId });
    if (!room) {
      clearInterval(interval);
      activeTimers.delete(roomId);
      return;
    }

    // Decrement but don't go below 0
    room.currentTimer = Math.max(0, (room.currentTimer || 0) - 1);
    await room.save();
    io.to(roomId).emit("timerUpdate", room.currentTimer);

    if (room.currentTimer === 0) {
      clearInterval(interval);
      activeTimers.delete(roomId);
      advanceGameState(roomId, io);
    }
  }, 1000);

  activeTimers.set(roomId, interval);
}
