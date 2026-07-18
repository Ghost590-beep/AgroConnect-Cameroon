// server/index.js
import app from "./src/server.js";
import EnvConfig from "./src/config/env.js";

const PORT = EnvConfig.getPort();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
