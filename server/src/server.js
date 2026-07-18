// server/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js";
import ErrorMiddleware from "./middlewares/error.middleware.js";
import swaggerSpec from "./config/swagger.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Ensure upload directories exist to avoid ENOENT when multer stores files
const uploadsDir = path.join(__dirname, "../uploads");
try {
  fs.mkdirSync(path.join(uploadsDir, "products"), { recursive: true });
  fs.mkdirSync(path.join(uploadsDir, "avatars"), { recursive: true });
} catch (err) {
  console.error("Failed to create upload directories:", err);
}

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/uploads", express.static(uploadsDir));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);

// If running in production, serve the React build.
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

app.use(ErrorMiddleware.handleError);

export default app;
