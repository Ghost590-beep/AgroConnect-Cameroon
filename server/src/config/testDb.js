// src/config/testDb.js
import db from "./db.js";

(async () => {
  try {
    // Simple query to test connection
    const result = await db.query("SELECT 1 + 1 AS test");
    console.log("✅ Database connection successful:", result[0].test);
    process.exit(0);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
})();
