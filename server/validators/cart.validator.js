// src/validators/cart.validator.js
import { body } from "express-validator";

/**
 * Cart Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for cart operations.
 *   - OCP: Easily extendable with new rules (e.g., discount codes).
 */
class CartValidator {
  static addItem = [
    body("productId").isInt().withMessage("Product ID must be an integer"),
    body("quantity")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Quantity must be greater than 0"),
  ];

  static updateQuantity = [
    body("productId").isInt().withMessage("Product ID must be an integer"),
    body("quantity")
      .isInt({ gt: 0 })
      .withMessage("Quantity must be greater than 0"),
  ];
}

export default CartValidator;
