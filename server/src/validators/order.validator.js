import { body } from "express-validator";

/**
 * Order Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for orders.
 *   - OCP: Easily extendable with new rules (e.g., discount codes).
 */
class OrderValidator {
  static placeOrder = [
    body("orderData").notEmpty().withMessage("Order data is required"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("At least one item is required"),
  ];

  static updateOrderStatus = [
    body("status")
      .isIn(["pending", "shipped", "delivered", "cancelled"])
      .withMessage("Invalid status"),
  ];

  static updatePaymentStatus = [
    body("paymentStatus")
      .isIn(["pending", "paid", "failed"])
      .withMessage("Invalid payment status"),
  ];

  static addOrderItem = [
    body("productId").isInt().withMessage("Product ID must be an integer"),
    body("quantity")
      .isInt({ gt: 0 })
      .withMessage("Quantity must be greater than 0"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ];
}

export default OrderValidator;
