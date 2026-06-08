// server/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import routes from "./routes/index.js";
import ErrorMiddleware from "./middlewares/error.middleware.js";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Ensure upload directories exist to avoid ENOENT when multer stores files
const uploadsDir = path.join(__dirname, "../uploads");
const productsDir = path.join(uploadsDir, "products");
const avatarsDir = path.join(uploadsDir, "avatars");
try {
  fs.mkdirSync(productsDir, { recursive: true });
  fs.mkdirSync(avatarsDir, { recursive: true });
} catch (err) {
  console.error("Failed to create upload directories:", err);
}

// Core middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Serve static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Swagger/OpenAPI setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AgroConnect API",
      version: "1.0.0",
      description: "API documentation for AgroConnect backend",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
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
  },
  apis: ["./src/routes/*.js"], // scan your route files for docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api", routes);

// If the app is running in production, serve the React build folder.
const clientBuildPath = path.join(__dirname, "../../client/dist");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientBuildPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/api-docs")) {
      return next();
    }
    return res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// Error handling middleware
app.use(ErrorMiddleware.handleError);

export default app;
