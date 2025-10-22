import Room from "../models/Room.js";

 // ---------------- Start Voting Phase ----------------
 export async function startVotingPhase(roomId) {
  const room = await Room.findOne({ roomId });
  if (!room) return;

  room.gameState = "voting";
  room.votes = {};
  await room.save();

  io.to(roomId).emit("startVoting", {
    message: "🗳️ Voting phase started! Everyone, cast your vote.",
    roomId,
  });
}

export default function registerGameSocket(io, socket) {
  console.log("Game socket connected:", socket.id);
  // ---------------- Submit Vote ----------------
  socket.on("submitVote", async ({ roomId, voterId, targetId }) => {
    try {
      const room = await Room.findOne({ roomId });
      if (!room || room.gameStatus !== "voting") return;

      const voter = room.players.find(p => p.userId === voterId && p.isAlive);
      if (!voter || room.votes[voterId]) return;

      room.votes[voterId] = targetId;
      await room.save();

      io.to(roomId).emit("playerVoted", {
        voterId,
        targetId,
        message: `${voter.name} voted for ${targetId}`,
      });

      const alive = room.players.filter(p => p.isAlive).length;
      const votesCount = Object.keys(room.votes).length;

      io.to(roomId).emit("voteProgress", { votesCount, total: alive });

      if (votesCount === alive) await endVotingPhase(roomId);
    } catch (err) {
      console.error("Error in submitVote:", err);
    }
  });

  // ---------------- Helper: End Voting ----------------
  async function endVotingPhase(roomId) {
    try {
      const room = await Room.findOne({ roomId });
      if (!room || room.gameStatus !== "voting") return;

      const tally = {};
      for (const targetId of Object.values(room.votes)) {
        tally[targetId] = (tally[targetId] || 0) + 1;
      }

      let maxVotes = 0;
      let topVoted = [];

      for (const [targetId, count] of Object.entries(tally)) {
        if (count > maxVotes) {
          maxVotes = count;
          topVoted = [targetId];
        } else if (count === maxVotes) {
          topVoted.push(targetId);
        }
      }

      room.topVoted = topVoted;

      let eliminatedId = null;
      if (topVoted.length === 1) {
        eliminatedId = topVoted[0];
        const player = room.players.find(p => p._id.toString() === eliminatedId);
        if (player) player.isAlive = false;

        room.gameStatus = "elimination";
      } else {
        room.gameStatus = "discussion_1";
      }

      await room.save();

      io.to(roomId).emit("votingResult", {
        eliminatedId,
        tally,
        message: eliminatedId
          ? `💀 ${eliminatedId} has been eliminated!`
          : "🤝 No one was eliminated (tie).",
      });

    } catch (err) {
      console.error("Error in endVotingPhase:", err);
    }
  }
}
