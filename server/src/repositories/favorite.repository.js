// src/repositories/favorite.repository.js
import db from "../config/db.js";

/**
 * FavoriteRepository
 * - SRP: Handles only favorite-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class FavoriteRepository {
  // =========================
  // Add a product to user's favorites
  // =========================
  async add(userId, productId) {
    const result = await db.query(
      "INSERT INTO favorites (user_id, product_id) VALUES (?, ?)",
      [userId, productId],
    );
    return result.insertId;
  }

  // =========================
  // Remove a product from user's favorites
  // =========================
  async remove(userId, productId) {
    await db.query("DELETE FROM favorites WHERE user_id=? AND product_id=?", [
      userId,
      productId,
    ]);
    return true;
  }

  // =========================
  // Get all favorites for a user
  // =========================
  async findByUserId(userId) {
    return await db.query(
      `SELECT f.*, p.name, p.price, p.image 
       FROM favorites f 
       JOIN products p ON f.product_id = p.id 
       WHERE f.user_id=?`,
      [userId],
    );
  }

  // =========================
  // Check if a product is in user's favorites
  // =========================
  async exists(userId, productId) {
    const rows = await db.query(
      "SELECT * FROM favorites WHERE user_id=? AND product_id=?",
      [userId, productId],
    );
    return rows.length > 0;
  }

  // =========================
  // Count total favorites for a user
  // =========================
  async countByUserId(userId) {
    const rows = await db.query(
      "SELECT COUNT(*) AS total FROM favorites WHERE user_id=?",
      [userId],
    );
    return rows[0].total;
  }

  // =========================
  // Get all users who favorited a product
  // =========================
  async findUsersByProductId(productId) {
    return await db.query(
      `SELECT u.id, u.full_name, u.email 
       FROM favorites f 
       JOIN users u ON f.user_id = u.id 
       WHERE f.product_id=?`,
      [productId],
    );
  }

  // =========================
  // Delete all favorites for a product (e.g., if product is removed)
  // =========================
  async deleteByProductId(productId) {
    await db.query("DELETE FROM favorites WHERE product_id=?", [productId]);
    return true;
  }
}

export default new FavoriteRepository();
