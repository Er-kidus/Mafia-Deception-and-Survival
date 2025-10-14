import app from "./src/app.js";
import config from "./src/config/config.js";
import { connection } from "./src/config/db.js";

// Connect to Database
connection();

app.listen(config.PORT, () => {
  console.log(`✔️ Connected to the server on port ${config.PORT}`);
});

