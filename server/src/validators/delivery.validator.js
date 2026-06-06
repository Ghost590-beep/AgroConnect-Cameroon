import { body } from "express-validator";

/**
 * Delivery Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for deliveries.
 *   - OCP: Easily extendable with new rules (e.g., delivery tracking).
 */
class DeliveryValidator {
  static createDelivery = [
    body("orderId").isInt().withMessage("Order ID must be an integer"),
    body("address").notEmpty().withMessage("Delivery address is required"),
    body("carrier").notEmpty().withMessage("Carrier is required"),
  ];

  static updateDeliveryStatus = [
    body("status")
      .isIn(["pending", "shipped", "delivered", "cancelled"])
      .withMessage("Invalid status"),
  ];
}

export default DeliveryValidator;
