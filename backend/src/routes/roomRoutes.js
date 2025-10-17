import express from "express";
const router = express.Router();

// Example route to get all rooms
router.get("/", (req, res) => {   
  res.send("Get all rooms");
});

// Example route to create a new room
router.post("/", (req, res) => {
  res.send("Create a new room");
});
 // get a specific room by ID
router.get("/:roomId", (req, res) => {
  res.send(`Get room with ID: ${req.params.id}`);
});

// update the room details  host only 
router.put("/:roomId", (req, res) => {
  res.send(`Update room with ID: ${req.params.id}`);
});

// join a room
router.post("/:roomId/join", (req, res) => {
  res.send(`Join room with ID: ${req.params.id}`);
});

// leave a room
router.post("/:roomId/leave", (req, res) => {
  res.send(`Leave room with ID: ${req.params.id}`);
});

// start the game host only
router.post("/:roomId/start", (req, res) => {
  res.send(`Start game in room with ID: ${req.params.id}`);
});
// end the game host only
router.post("/:roomId/end", (req, res) => {
  res.send(`End game in room with ID: ${req.params.id}`);
});

export default router;
  