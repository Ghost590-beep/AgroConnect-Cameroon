// src/repositories/farmer.repository.js
import db from "../config/db.js";

/**
 * FarmerRepository
 * - SRP: Handles only farmer-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class FarmerRepository {
  // =========================
  // Create a new farmer profile
  // =========================
  async create(userId, farmName, location, description) {
    const result = await db.query(
      "INSERT INTO farmers (user_id, farm_name, location, description) VALUES (?, ?, ?, ?)",
      [userId, farmName, location, description],
    );
    return result.insertId;
  }

  // =========================
  // Get farmer profile by ID
  // =========================
  async findById(farmerId) {
    const rows = await db.query("SELECT * FROM farmers WHERE id=?", [farmerId]);
    return rows[0];
  }

  // =========================
  // Get farmer profile by user ID
  // =========================
  async findByUserId(userId) {
    const rows = await db.query("SELECT * FROM farmers WHERE user_id=?", [
      userId,
    ]);
    return rows[0];
  }

  // =========================
  // Get all farmers
  // =========================
  async findAll() {
    return await db.query("SELECT * FROM farmers");
  }

  // =========================
  // Update farmer profile
  // =========================
  async update(farmerId, updates) {
    const { farm_name, location, description } = updates;
    await db.query(
      "UPDATE farmers SET farm_name=?, location=?, description=? WHERE id=?",
      [farm_name, location, description, farmerId],
    );
    return this.findById(farmerId);
  }

  // =========================
  // Delete farmer profile
  // =========================
  async delete(farmerId) {
    await db.query("DELETE FROM farmers WHERE id=?", [farmerId]);
    return true;
  }

  // =========================
  // Get all products linked to a farmer
  // =========================
  async findProducts(farmerId) {
    return await db.query(
      `SELECT p.* 
       FROM products p 
       JOIN farmers f ON p.user_id = f.user_id 
       WHERE f.id=?`,
      [farmerId],
    );
  }

  // =========================
  // Get farmers by location
  // =========================
  async findByLocation(location) {
    return await db.query("SELECT * FROM farmers WHERE location=?", [location]);
  }

  // =========================
  // Count total farmers
  // =========================
  async count() {
    const rows = await db.query("SELECT COUNT(*) AS total FROM farmers");
    return rows[0].total;
  }
}

export default new FarmerRepository();
