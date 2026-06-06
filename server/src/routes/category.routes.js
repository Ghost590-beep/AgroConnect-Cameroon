// src/routes/category.routes.js
import express from "express";
import CategoryController from "../controllers/category.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import CategoryValidator from "../validators/category.validator.js";

const router = express.Router();

/**
 * Category Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to category controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., category analytics).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Create category (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  CategoryValidator.createCategory,
  ValidationMiddleware.validate,
  CategoryController.createCategory,
);

// Get all categories
router.get("/", CategoryController.getAllCategories);

// Get category by ID
router.get("/:id", CategoryController.getCategoryById);

// Update category (protected)
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  CategoryValidator.updateCategory,
  ValidationMiddleware.validate,
  CategoryController.updateCategory,
);

// Delete category (protected)
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  CategoryController.deleteCategory,
);

// Create subcategory (protected)
router.post(
  "/:categoryId/subcategories",
  AuthMiddleware.verifyToken,
  CategoryValidator.createSubcategory,
  ValidationMiddleware.validate,
  CategoryController.createSubcategory,
);

// Get subcategories by category
router.get(
  "/:categoryId/subcategories",
  CategoryController.getSubcategoriesByCategory,
);

// Business rule: get category tree
router.get("/tree/all", CategoryController.getCategoryTree);

export default router;
