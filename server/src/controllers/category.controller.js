// src/controllers/category.controller.js
import CategoryService from "../services/category.service.js";
import response from "../utils/response.js";

/**
 * CategoryController
 * - OOP: Encapsulated in a class, exposing only public methods.
 * - SOLID:
 *   - SRP: Handles only category-related request/response logic.
 *   - OCP: Can be extended with new endpoints (e.g., category analytics) without modifying existing ones.
 *   - DIP: Depends on CategoryService abstraction, not repository directly.
 * - OOP Concepts:
 *   - Encapsulation: Internal category logic hidden in service, controller only exposes endpoints.
 *   - Polymorphism: Different methods (createCategory, updateCategory, getCategoryTree) provide varied behaviors but share consistent interface style.
 */
class CategoryController {
  // Create category
  async createCategory(req, res, next) {
    try {
      const { name, description } = req.body;
      const category = await CategoryService.createCategory(name, description);
      return response.success(
        res,
        category,
        "Category created successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  // Get all categories
  async getAllCategories(req, res, next) {
    try {
      const categories = await CategoryService.getAllCategories();
      return response.success(
        res,
        categories,
        "Categories retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Get category by ID
  async getCategoryById(req, res, next) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      return response.success(res, category, "Category retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Update category
  async updateCategory(req, res, next) {
    try {
      const updated = await CategoryService.updateCategory(
        req.params.id,
        req.body,
      );
      return response.success(res, updated, "Category updated successfully");
    } catch (error) {
      next(error);
    }
  }

  // Delete category
  async deleteCategory(req, res, next) {
    try {
      await CategoryService.deleteCategory(req.params.id);
      return response.success(res, null, "Category deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // Create subcategory
  async createSubcategory(req, res, next) {
    try {
      const { name, description } = req.body;
      const subcategory = await CategoryService.createSubcategory(
        req.params.categoryId,
        name,
        description,
      );
      return response.success(
        res,
        subcategory,
        "Subcategory created successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  // Get subcategories by category
  async getSubcategoriesByCategory(req, res, next) {
    try {
      const subs = await CategoryService.getSubcategoriesByCategory(
        req.params.categoryId,
      );
      return response.success(
        res,
        subs,
        "Subcategories retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Business rule: get category tree
  async getCategoryTree(req, res, next) {
    try {
      const tree = await CategoryService.getCategoryTree();
      return response.success(
        res,
        tree,
        "Category tree retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
