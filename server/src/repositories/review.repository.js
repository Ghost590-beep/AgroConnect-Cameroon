// src/repositories/review.repository.js
import db from "../config/db.js";

/**
 * ReviewRepository
 * - SRP: Handles only review-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class ReviewRepository {
  // =========================
  // Add a new review
  // =========================
  async create(userId, productId, rating, comment) {
    const result = await db.query(
      "INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)",
      [userId, productId, rating, comment],
    );
    return result.insertId;
  }

  // =========================
  // Get all reviews for a product
  // =========================
  async findByProductId(productId) {
    return await db.query(
      `SELECT r.*, u.full_name 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.product_id=?`,
      [productId],
    );
  }

  // =========================
  // Get all reviews by a user
  // =========================
  async findByUserId(userId) {
    return await db.query(
      `SELECT r.*, p.name 
       FROM reviews r 
       JOIN products p ON r.product_id = p.id 
       WHERE r.user_id=?`,
      [userId],
    );
  }

  // =========================
  // Get a single review by ID
  // =========================
  async findById(reviewId) {
    const rows = await db.query("SELECT * FROM reviews WHERE id=?", [reviewId]);
    return rows[0];
  }

  // =========================
  // Update a review (rating/comment)
  // =========================
  async update(reviewId, updates) {
    const { rating, comment } = updates;
    await db.query("UPDATE reviews SET rating=?, comment=? WHERE id=?", [
      rating,
      comment,
      reviewId,
    ]);
    return this.findById(reviewId);
  }

  // =========================
  // Delete a review
  // =========================
  async delete(reviewId) {
    await db.query("DELETE FROM reviews WHERE id=?", [reviewId]);
    return true;
  }

  // =========================
  // Get average rating for a product
  // =========================
  async getAverageRating(productId) {
    const rows = await db.query(
      "SELECT AVG(rating) AS avg_rating FROM reviews WHERE product_id=?",
      [productId],
    );
    return rows[0].avg_rating || 0;
  }

  // =========================
  // Count reviews for a product
  // =========================
  async countByProductId(productId) {
    const rows = await db.query(
      "SELECT COUNT(*) AS total FROM reviews WHERE product_id=?",
      [productId],
    );
    return rows[0].total;
  }

  // =========================
  // Get latest reviews (for homepage or dashboard)
  // =========================
  async findLatest(limit = 10) {
    return await db.query(
      "SELECT * FROM reviews ORDER BY created_at DESC LIMIT ?",
      [limit],
    );
  }
}

export default new ReviewRepository();
