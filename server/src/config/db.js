// ----- src/config/db.js --------
import mysql from "mysql2/promise";
import EnvConfig from "./env.js";

/**
 * Database class
 * - SRP: Handles DB conn & queries.
 * - OCP: Can be extended with logging or monitoring without changing core logic.
 * - DIP: Services depend on this abstraction, not directly on mysql.
 */
class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: EnvConfig.getDbHost(),
      port: EnvConfig.getDbPort(),
      user: EnvConfig.getDbUser(),
      password: EnvConfig.getDbPassword(),
      database: EnvConfig.getDbName(),
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  // Generic query method
  async query(sql, params = []) {
    const [rows] = await this.pool.query(sql, params);
    return rows;
  }

  // Transaction wrapper for ACID compliance
  async transaction(callback) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

// Export a single instance (Singleton pattern)
const db = new Database();
export default db;
