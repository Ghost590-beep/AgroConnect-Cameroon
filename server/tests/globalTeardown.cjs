module.exports = async function () {
  try {
    const db = (await import("../src/config/db.js")).default;
    if (db && db.pool && typeof db.pool.end === "function") {
      await db.pool.end();
    }
  } catch (err) {
    console.error("Error during Jest global teardown:", err);
  }
};
