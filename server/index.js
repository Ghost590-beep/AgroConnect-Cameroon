// server/index.js
import app from "./src/server.js";
import ensureSchema from "./src/config/ensureSchema.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await ensureSchema();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Failed to initialize database schema:", error);
    process.exit(1);
  }
};

startServer();
