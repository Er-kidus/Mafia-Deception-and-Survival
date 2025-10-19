import express from "express";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API endpoints for managing game rooms
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     description: Retrieve a list of all available rooms.
 *     responses:
 *       200:
 *         description: A list of all rooms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "67107c6c7fd4f8f3a6b0a0d9"
 *                   name:
 *                     type: string
 *                     example: "Mafia Game Room 1"
 */
router.get("/", (req, res) => {
  res.send("Get all rooms");
});

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     description: Allows a host to create a new game room.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mafia Room"
 *               maxPlayers:
 *                 type: integer
 *                 example: 8
 *     responses:
 *       201:
 *         description: Room created successfully.
 *       400:
 *         description: Invalid input data.
 */
router.post("/", (req, res) => {
  res.send("Create a new room");
});

/**
 * @swagger
 * /rooms/{roomId}:
 *   get:
 *     summary: Get a specific room by ID
 *     tags: [Rooms]
 *     description: Retrieve details of a room using its unique ID.
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to retrieve.
 *     responses:
 *       200:
 *         description: Room details fetched successfully.
 *       404:
 *         description: Room not found.
 */
router.get("/:roomId", (req, res) => {
  res.send(`Get room with ID: ${req.params.roomId}`);
});

/**
 * @swagger
 * /rooms/{roomId}:
 *   put:
 *     summary: Update room details (host only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     description: Allows the host to update room settings before the game starts.
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the room to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Mafia Room"
 *               maxPlayers:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Room updated successfully.
 *       403:
 *         description: Only the host can update the room.
 *       404:
 *         description: Room not found.
 */
router.put("/:roomId", (req, res) => {
  res.send(`Update room with ID: ${req.params.roomId}`);
});

/**
 * @swagger
 * /rooms/{roomId}/join:
 *   post:
 *     summary: Join a room
 *     tags: [Rooms]
 *     description: Allows a player to join a specific room if it isn't full.
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to join.
 *     responses:
 *       200:
 *         description: Player joined successfully.
 *       400:
 *         description: Room is full or already started.
 *       404:
 *         description: Room not found.
 */
router.post("/:roomId/join", (req, res) => {
  res.send(`Join room with ID: ${req.params.roomId}`);
});

/**
 * @swagger
 * /rooms/{roomId}/leave:
 *   post:
 *     summary: Leave a room
 *     tags: [Rooms]
 *     description: Allows a player to leave the room before or during the game.
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to leave.
 *     responses:
 *       200:
 *         description: Player left the room successfully.
 *       404:
 *         description: Room not found.
 */
router.post("/:roomId/leave", (req, res) => {
  res.send(`Leave room with ID: ${req.params.roomId}`);
});

/**
 * @swagger
 * /rooms/{roomId}/start:
 *   post:
 *     summary: Start the game (host only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     description: Host can start the game when all players are ready.
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room.
 *     responses:
 *       200:
 *         description: Game started successfully.
 *       403:
 *         description: Only the host can start the game.
 *       404:
 *         description: Room not found.
 */
router.post("/:roomId/start", (req, res) => {
  res.send(`Start game in room with ID: ${req.params.roomId}`);
});

/**
 * @swagger
 * /rooms/{roomId}/end:
 *   post:
 *     summary: End the game (host only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     description: Host can manually end the game before completion.
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room.
 *     responses:
 *       200:
 *         description: Game ended successfully.
 *       403:
 *         description: Only the host can end the game.
 *       404:
 *         description: Room not found.
 */
router.post("/:roomId/end", (req, res) => {

  res.send(`End game in room with ID: ${req.params.id}`);
});

export default router;

