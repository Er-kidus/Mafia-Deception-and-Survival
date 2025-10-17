import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mafia: Deception and Survival",
      version: "1.0.0",
      description:
        "API documentation for the Mafia: Deception and Survival project",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "../controllers/*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
