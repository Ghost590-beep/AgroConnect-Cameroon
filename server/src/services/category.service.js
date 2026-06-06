// src/services/category.service.js
import CategoryRepository from "../repositories/category.repository.js";

class CategoryService {
  // =========================
  // Create a new category
  // =========================
  async createCategory(name, description) {
    // Optional: prevent duplicate category names
    const categories = await CategoryRepository.findAllCategories();
    if (categories.some((c) => c.name === name)) {
      throw new Error("Category name already exists");
    }
    const categoryId = await CategoryRepository.createCategory(
      name,
      description,
    );
    return await CategoryRepository.findCategoryById(categoryId);
  }

  // =========================
  // Get all categories
  // =========================
  async getAllCategories() {
    return await CategoryRepository.findAllCategories();
  }

  // =========================
  // Get category by ID
  // =========================
  async getCategoryById(categoryId) {
    const category = await CategoryRepository.findCategoryById(categoryId);
    if (!category) throw new Error("Category not found");
    return category;
  }

  // =========================
  // Update category
  // =========================
  async updateCategory(categoryId, updates) {
    return await CategoryRepository.updateCategory(categoryId, updates);
  }

  // =========================
  // Delete category
  // =========================
  async deleteCategory(categoryId) {
    // Optional cleanup: delete subcategories first
    const subcategories =
      await CategoryRepository.findSubcategoriesByCategoryId(categoryId);
    for (const sub of subcategories) {
      await CategoryRepository.deleteSubcategory(sub.id);
    }
    return await CategoryRepository.deleteCategory(categoryId);
  }

  // =========================
  // Create a new subcategory
  // =========================
  async createSubcategory(categoryId, name, description) {
    const subId = await CategoryRepository.createSubcategory(
      categoryId,
      name,
      description,
    );
    return await CategoryRepository.findSubcategoryById(subId);
  }

  // =========================
  // Get all subcategories for a category
  // =========================
  async getSubcategoriesByCategory(categoryId) {
    return await CategoryRepository.findSubcategoriesByCategoryId(categoryId);
  }

  // =========================
  // Get subcategory by ID
  // =========================
  async getSubcategoryById(subcategoryId) {
    return await CategoryRepository.findSubcategoryById(subcategoryId);
  }

  // =========================
  // Update subcategory
  // =========================
  async updateSubcategory(subcategoryId, updates) {
    return await CategoryRepository.updateSubcategory(subcategoryId, updates);
  }

  // =========================
  // Delete subcategory
  // =========================
  async deleteSubcategory(subcategoryId) {
    return await CategoryRepository.deleteSubcategory(subcategoryId);
  }

  // =========================
  // Get products by category
  // =========================
  async getProductsByCategory(categoryId) {
    return await CategoryRepository.findProductsByCategory(categoryId);
  }

  // =========================
  // Get products by subcategory
  // =========================
  async getProductsBySubcategory(subcategoryId) {
    return await CategoryRepository.findProductsBySubcategory(subcategoryId);
  }

  // =========================
  // Business rule: get full category tree with subcategories
  // =========================
  async getCategoryTree() {
    const categories = await CategoryRepository.findAllCategories();
    const tree = [];
    for (const category of categories) {
      const subs = await CategoryRepository.findSubcategoriesByCategoryId(
        category.id,
      );
      tree.push({ ...category, subcategories: subs });
    }
    return tree;
  }
}

export default new CategoryService();
