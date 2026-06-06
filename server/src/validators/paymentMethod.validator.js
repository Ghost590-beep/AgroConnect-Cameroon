import { body } from "express-validator";

/**
 * Payment Method Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for methods.
 *   - OCP: Easily extendable with new rules (e.g., method metadata).
 */
class PaymentMethodValidator {
  static addMethod = [
    body("name").notEmpty().withMessage("Method name is required"),
    body("description")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Description must be at least 3 characters"),
  ];

  static updateMethod = [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Method name cannot be empty"),
    body("description")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Description must be at least 3 characters"),
  ];
}

export default PaymentMethodValidator;
