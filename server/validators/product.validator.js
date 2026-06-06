// src/validators/product.validator.js
import { body } from "express-validator";

/**
 * Product Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for product inputs.
 *   - OCP: Easily extendable with new rules (e.g., discount codes).
 */
class ProductValidator {
  static addProduct = [
    body("name").notEmpty().withMessage("Product name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
    body("categoryId").isInt().withMessage("Category ID must be an integer"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters"),
  ];

  static updateProduct = [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Product name cannot be empty"),
    body("price")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
    body("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters"),
  ];

  static addProductImage = [
    body("imageUrl").isURL().withMessage("Valid image URL is required"),
  ];
}

export default ProductValidator;
