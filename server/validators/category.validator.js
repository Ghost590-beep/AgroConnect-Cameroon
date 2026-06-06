// src/validators/category.validator.js
import { body } from "express-validator";

/**
 * Category Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for categories/subcategories.
 *   - OCP: Easily extendable with new rules (e.g., category analytics).
 */
class CategoryValidator {
  static createCategory = [
    body("name").notEmpty().withMessage("Category name is required"),
    body("description")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Description must be at least 3 characters"),
  ];

  static updateCategory = [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Category name cannot be empty"),
    body("description")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Description must be at least 3 characters"),
  ];

  static createSubcategory = [
    body("name").notEmpty().withMessage("Subcategory name is required"),
    body("description")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Description must be at least 3 characters"),
  ];
}

export default CategoryValidator;
