// src/repositories/category.repository.js
import db from "../config/db.js";

/**
 * CategoryRepository
 * - SRP: Handles only category and subcategory-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class CategoryRepository {
  // =========================
  // Create a new category
  // =========================
  async createCategory(name, description) {
    const result = await db.query(
      "INSERT INTO categories (name, description) VALUES (?, ?)",
      [name, description],
    );
    return result.insertId;
  }

  // =========================
  // Get all categories
  // =========================
  async findAllCategories() {
    return await db.query("SELECT * FROM categories");
  }

  // =========================
  // Get category by ID
  // =========================
  async findCategoryById(id) {
    const rows = await db.query("SELECT * FROM categories WHERE id=?", [id]);
    return rows[0];
  }

  async findCategoryByName(name) {
    const rows = await db.query(
      "SELECT * FROM categories WHERE LOWER(name)=LOWER(?)",
      [name],
    );
    return rows[0];
  }

  // =========================
  // Update category
  // =========================
  async updateCategory(id, updates) {
    const { name, description } = updates;
    await db.query("UPDATE categories SET name=?, description=? WHERE id=?", [
      name,
      description,
      id,
    ]);
    return this.findCategoryById(id);
  }

  // =========================
  // Delete category
  // =========================
  async deleteCategory(id) {
    await db.query("DELETE FROM categories WHERE id=?", [id]);
    return true;
  }

  // =========================
  // Create a new subcategory
  // =========================
  async createSubcategory(categoryId, name, description) {
    const result = await db.query(
      "INSERT INTO subcategories (category_id, name, description) VALUES (?, ?, ?)",
      [categoryId, name, description],
    );
    return result.insertId;
  }

  // =========================
  // Get all subcategories for a category
  // =========================
  async findSubcategoriesByCategoryId(categoryId) {
    return await db.query("SELECT * FROM subcategories WHERE category_id=?", [
      categoryId,
    ]);
  }

  // =========================
  // Get subcategory by ID
  // =========================
  async findSubcategoryById(id) {
    const rows = await db.query("SELECT * FROM subcategories WHERE id=?", [id]);
    return rows[0];
  }

  async findSubcategoryByCategoryIdAndName(categoryId, name) {
    const rows = await db.query(
      "SELECT * FROM subcategories WHERE category_id=? AND LOWER(name)=LOWER(?)",
      [categoryId, name],
    );
    return rows[0];
  }

  // =========================
  // Update subcategory
  // =========================
  async updateSubcategory(id, updates) {
    const { name, description } = updates;
    await db.query(
      "UPDATE subcategories SET name=?, description=? WHERE id=?",
      [name, description, id],
    );
    return this.findSubcategoryById(id);
  }

  // =========================
  // Delete subcategory
  // =========================
  async deleteSubcategory(id) {
    await db.query("DELETE FROM subcategories WHERE id=?", [id]);
    return true;
  }

  // =========================
  // Get products by category
  // =========================
  async findProductsByCategory(categoryId) {
    return await db.query(
      `SELECT p.* 
       FROM products p 
       JOIN categories c ON p.category_id = c.id 
       WHERE c.id=?`,
      [categoryId],
    );
  }

  // =========================
  // Get products by subcategory
  // =========================
  async findProductsBySubcategory(subcategoryId) {
    return await db.query(
      `SELECT p.* 
       FROM products p 
       JOIN subcategories s ON p.subcategory_id = s.id 
       WHERE s.id=?`,
      [subcategoryId],
    );
  }
}

export default new CategoryRepository();
