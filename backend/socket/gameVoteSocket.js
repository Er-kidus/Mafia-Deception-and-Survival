// src/sockets/gameSocket.js
import Room from "../models/Room.js";

export default function registerGameSocket(io, socket) {
  console.log("Game socket connected:", socket.id);

  // ---------------- Start Voting Phase ----------------
  socket.on("startVoting", async ({ roomId }) => {
    const room = await Room.findOne({ roomId });
    if (!room) return;

    room.gameStatus = "voting";
    room.votes = {};
    await room.save();

    io.to(roomId).emit("startVoting", {
      message: "🗳️ Voting phase started! Everyone, cast your vote.",
      roomId,
    });

    // optional: timeout after 30s
    // setTimeout(() => endVotingPhase(io, roomId), 30000);
  });

  // ---------------- Submit Vote ----------------
  socket.on("submitVote", async ({ roomId, voterId, targetId }) => {
    const room = await Room.findOne({ roomId });
    if (!room || room.gameStatus !== "voting") return;

    const voter = room.players.find(p => p.userId === voterId && p.isAlive===true);
    if (!voter) return;

    if (room.votes[voterId]) return; // prevent double vote

    room.votes[voterId] = targetId;
    await room.save();

    // announce vote to everyone
    io.to(roomId).emit("playerVoted", {
      voterId,
      targetId,
      message: `${voter.name} voted for ${targetId}`,
    });

    // progress update
    const alive = room.players.filter(p => p.isAlive===true).length;
    const votesCount = Object.keys(room.votes).length;
    io.to(roomId).emit("voteProgress", { votesCount, total: alive });

    if (votesCount === alive) {
      endVotingPhase(io, roomId);
    }
  });


  // ---------------- Helper: End Voting ----------------
  async function endVotingPhase(io, roomId) {
    const room = await Room.findOne({ roomId });
    if (!room || room.gameStatus !== "voting") return;

    const tally = {};
    for (const targetId of Object.values(room.votes)) {
      tally[targetId] = (tally[targetId] || 0) + 1;
    }

    // find player with most votes

    let eliminatedId = null;
    let maxVotes = 0;
    for (const [targetId, count] of Object.entries(tally)) {
      if (count > maxVotes) {
        maxVotes = count;
        eliminatedId = targetId;
      }
    }


    // eliminate that player
    if (eliminatedId) {
      const player = room.players.find(p => p.userId === eliminatedId);
      if (player) player.isAlive = false;
    }

    room.gameStatus = "result";
    await room.save();

    io.to(roomId).emit("votingResult", {
      eliminatedId,
      tally,
      message: eliminatedId
        ? `💀 ${eliminatedId} has been eliminated!`
        : "No one was eliminated (tie).",
    });

  }
}
