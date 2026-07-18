// src/repositories/base.repository.js
import db from "../config/db.js";

/**
 * BaseRepository
 * - Abstract: cannot be instantiated directly.
 * - Provides the two operations every table-backed repository needs
 *   for free (findById/delete), keyed on a fixed, developer-supplied
 *   table name — never a name derived from request input.
 * - create()/update() are intentionally NOT implemented here: each
 *   table has a different column set, so a generic INSERT/UPDATE
 *   would violate Liskov substitution rather than help.
 */
export default class BaseRepository {
  constructor(tableName, dbClient = db) {
    if (new.target === BaseRepository) {
      throw new TypeError(
        "BaseRepository is abstract and cannot be instantiated directly",
      );
    }
    this.db = dbClient;
    this.tableName = tableName;
  }

  async findById(id) {
    const rows = await this.db.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id],
    );
    return rows[0] ?? null;
  }

  async delete(id) {
    await this.db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    return true;
  }
}
