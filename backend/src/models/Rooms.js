const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String, enum: ["Mafia", "Civilian", null], default: null },
  alive: { type: Boolean, default: true },
  pinnedSuspects: [{ type: String }] // Array of userIds
});

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  hostId: { type: String, required: true },
  players: { type: [playerSchema], default: [] },
  config: {
    maxPlayers: { type: Number, default: 10 },
    mafiaCount: { type: Number, default: 2 },
    skipVoteEnabled: { type: Boolean, default: false },
    mafiaKillsPerGame: { type: Boolean, default: true }
  },
  gameState: { 
    type: String, 
    enum: ["setup", "discussion", "voting", "elimination", "ended"], 
    default: "setup" 
  },
  currentTimer: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
