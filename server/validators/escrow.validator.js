// src/validators/escrow.validator.js
import { body } from "express-validator";

/**
 * Escrow Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for escrow operations.
 *   - OCP: Easily extendable with new rules (e.g., escrow analytics).
 */
class EscrowValidator {
  static createEscrow = [
    body("orderId").isInt().withMessage("Order ID must be an integer"),
    body("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be greater than 0"),
  ];

  static updateEscrowAmount = [
    body("newAmount")
      .isFloat({ gt: 0 })
      .withMessage("New amount must be greater than 0"),
  ];

  static finalizeEscrow = [
    body("orderStatus")
      .isIn(["delivered", "cancelled"])
      .withMessage("Invalid order status"),
  ];
}

export default EscrowValidator;
