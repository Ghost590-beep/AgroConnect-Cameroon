// src/repositories/product.repository.js
import db from "../config/db.js";

/**
 * ProductRepository
 * - SRP: Handles only product-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class ProductRepository {
  // =========================
  // Create a new product
  // =========================
  async create(product) {
    const {
      name,
      description,
      price,
      stock_quantity,
      category_id,
      subcategory_id,
      user_id,
      location,
      image,
      status,
    } = product;
    const result = await db.query(
      `INSERT INTO products (name, description, price, stock_quantity, category_id, subcategory_id, user_id, location, image, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        price,
        stock_quantity ?? 0,
        category_id,
        subcategory_id,
        user_id,
        location || null,
        image || null,
        status || "active",
      ],
    );
    return result.insertId;
  }

  // =========================
  // Get product by ID
  // =========================
  async findById(productId) {
    const rows = await db.query("SELECT * FROM products WHERE id=?", [
      productId,
    ]);
    return rows[0];
  }

  // =========================
  // Get all products
  // =========================
  async findAll() {
    return await db.query("SELECT * FROM products ORDER BY created_at DESC");
  }

  // =========================
  // Get products by category
  // =========================
  async findByCategory(categoryId) {
    return await db.query("SELECT * FROM products WHERE category_id=?", [
      categoryId,
    ]);
  }

  // =========================
  // Get products by subcategory
  // =========================
  async findBySubcategory(subcategoryId) {
    return await db.query("SELECT * FROM products WHERE subcategory_id=?", [
      subcategoryId,
    ]);
  }

  // =========================
  // Get products by user (farmer)
  // =========================
  async findByUser(userId) {
    return await db.query("SELECT * FROM products WHERE user_id=?", [userId]);
  }

  // =========================
  // Update product
  // =========================
  async update(productId, updates) {
    const { name, description, price, stock, category_id, subcategory_id } =
      updates;
    await db.query(
      `UPDATE products 
       SET name=?, description=?, price=?, stock=?, category_id=?, subcategory_id=? 
       WHERE id=?`,
      [name, description, price, stock, category_id, subcategory_id, productId],
    );
    return this.findById(productId);
  }

  // =========================
  // Delete product
  // =========================
  async delete(productId) {
    await db.query("DELETE FROM products WHERE id=?", [productId]);
    return true;
  }

  // =========================
  // Search products by keyword
  // =========================
  async search(keyword) {
    return await db.query(
      "SELECT * FROM products WHERE name LIKE ? OR description LIKE ?",
      [`%${keyword}%`, `%${keyword}%`],
    );
  }

  // =========================
  // Count products by category
  // =========================
  async countByCategory(categoryId) {
    const rows = await db.query(
      "SELECT COUNT(*) AS total FROM products WHERE category_id=?",
      [categoryId],
    );
    return rows[0].total;
  }
}

export default new ProductRepository();
