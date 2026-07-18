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

class ServerApp {
  constructor() {
    this.app = express();
    this.uploadsDir = path.join(__dirname, "../uploads");
    this.setup();
  }

  setup() {
    this.ensureUploadDirectories();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureDocs();
    this.configureErrorHandling();
  }

  ensureUploadDirectories() {
    try {
      fs.mkdirSync(path.join(this.uploadsDir, "products"), { recursive: true });
      fs.mkdirSync(path.join(this.uploadsDir, "avatars"), { recursive: true });
    } catch (error) {
      console.error("Failed to create upload directories:", error);
    }
  }

  configureMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use("/uploads", express.static(this.uploadsDir));
  }

  configureRoutes() {
    this.app.use("/api", routes);
  }

  configureDocs() {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    if (process.env.NODE_ENV === "production") {
      const clientBuildPath = path.join(__dirname, "../../client/dist");
      this.app.use(express.static(clientBuildPath));
      this.app.get("*", (req, res, next) => {
        if (req.path.startsWith("/api") || req.path.startsWith("/api-docs")) {
          return next();
        }
        return res.sendFile(path.join(clientBuildPath, "index.html"));
      });
    }
  }

  configureErrorHandling() {
    this.app.use(ErrorMiddleware.handleError);
  }
}

export default new ServerApp().app;
