import app from "./src/app.js";
import config from "./src/config/config.js";
import { connection } from "./src/config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import registerSocket from "./socket/index.js";

// Connect to Database
connection();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// Register socket handlers
registerSocket(io);

httpServer.listen(config.PORT, () => {
  console.log(`✔️ Connected to the server on port ${config.PORT}`);
});

