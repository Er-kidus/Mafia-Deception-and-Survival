import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
