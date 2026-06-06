import { body } from "express-validator";

/**
 * Audit Log Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for audit logs.
 *   - OCP: Easily extendable with new rules (e.g., export filters).
 */
class AuditLogValidator {
  static logAction = [
    body("action").notEmpty().withMessage("Action is required"),
    body("entity").notEmpty().withMessage("Entity is required"),
    body("entityId").isInt().withMessage("Entity ID must be an integer"),
    body("details")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Details must be at least 3 characters"),
  ];
}

export default AuditLogValidator;
