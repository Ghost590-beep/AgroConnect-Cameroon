// src/repositories/productImage.repository.js
import db from "../config/db.js";

/**
 * ProductImageRepository
 * - SRP: Handles only product image-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class ProductImageRepository {
  // =========================
  // Add a new image for a product
  // =========================
  async create(productId, imageUrl) {
    const result = await db.query(
      "INSERT INTO product_images (product_id, image_url) VALUES (?, ?)",
      [productId, imageUrl],
    );
    return result.insertId;
  }

  // =========================
  // Get all images for a product
  // =========================
  async findByProductId(productId) {
    return await db.query("SELECT * FROM product_images WHERE product_id=?", [
      productId,
    ]);
  }

  // =========================
  // Get a single image by ID
  // =========================
  async findById(imageId) {
    const rows = await db.query("SELECT * FROM product_images WHERE id=?", [
      imageId,
    ]);
    return rows[0];
  }

  // =========================
  // Update image URL
  // =========================
  async update(imageId, newUrl) {
    await db.query("UPDATE product_images SET image_url=? WHERE id=?", [
      newUrl,
      imageId,
    ]);
    return this.findById(imageId);
  }

  // =========================
  // Delete a specific image
  // =========================
  async delete(imageId) {
    await db.query("DELETE FROM product_images WHERE id=?", [imageId]);
    return true;
  }

  // =========================
  // Delete all images for a product
  // =========================
  async deleteByProductId(productId) {
    await db.query("DELETE FROM product_images WHERE product_id=?", [
      productId,
    ]);
    return true;
  }

  // =========================
  // Count images for a product
  // =========================
  async countByProductId(productId) {
    const rows = await db.query(
      "SELECT COUNT(*) AS total FROM product_images WHERE product_id=?",
      [productId],
    );
    return rows[0].total;
  }

  // =========================
  // Get products with at least one image
  // =========================
  async findProductsWithImages() {
    return await db.query(
      `SELECT DISTINCT p.id, p.name 
       FROM products p 
       JOIN product_images pi ON p.id = pi.product_id`,
    );
  }
}

export default new ProductImageRepository();
