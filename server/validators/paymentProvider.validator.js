// src/validators/paymentProvider.validator.js
import { body } from "express-validator";

/**
 * Payment Provider Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for providers.
 *   - OCP: Easily extendable with new rules (e.g., provider metadata).
 */
class PaymentProviderValidator {
  static addProvider = [
    body("name").notEmpty().withMessage("Provider name is required"),
    body("description")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Description must be at least 3 characters"),
  ];

  static updateProvider = [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Provider name cannot be empty"),
    body("description")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Description must be at least 3 characters"),
  ];
}

export default PaymentProviderValidator;
