import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String, enum: ["Mafia", "Civilian", null], default: null },
  alive: { type: Boolean, default: true },
  pinnedSuspects: [{ type: String }], // Array of userIds
});

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    hostId: { type: String, required: true },
    players: { type: [playerSchema], default: [] },
    config: {
      clueTime: { type: Number },
      firstDiscussionTime: { type: Number },
      secondDiscussionTime: { type: Number },
      argueTime: { type: Number },
      defendTime: { type: Number },
      voteTime: { type: Number, default: 1 },
      maxPlayers: { type: Number },
      mafiaCount: { type: Number, default: 1 },
      skipVoteEnabled: { type: Boolean, default: false },
    },
    gameState: {
      type: String,
      enum: [
        "setup",
        "viewCards",
        "clue_time",
        "discussion_1",
        "discussion_2",
        "argue",
        "defend",
        "voting",
        "elimination",
        "ended",
      ],
      default: "setup",
    },
    currentTimer: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
