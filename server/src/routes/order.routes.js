// src/routes/order.routes.js
import express from "express";
import OrderController from "../controllers/order.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import OrderValidator from "../validators/order.validator.js";

const router = express.Router();

/**
 * Order Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to order controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., order analytics).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Place a new order (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  OrderValidator.placeOrder,
  ValidationMiddleware.validate,
  OrderController.placeOrder,
);

// Get order by ID (protected)
router.get("/:id", AuthMiddleware.verifyToken, OrderController.getOrderById);

// Get all orders for a user (protected)
router.get(
  "/user/:userId",
  AuthMiddleware.verifyToken,
  OrderController.getOrdersByUser,
);

// Update order status (protected)
router.put(
  "/:id/status",
  AuthMiddleware.verifyToken,
  OrderValidator.updateOrderStatus,
  ValidationMiddleware.validate,
  OrderController.updateOrderStatus,
);

// Update payment status (protected)
router.put(
  "/:id/payment",
  AuthMiddleware.verifyToken,
  OrderValidator.updatePaymentStatus,
  ValidationMiddleware.validate,
  OrderController.updatePaymentStatus,
);

// Cancel order (protected)
router.put(
  "/:id/cancel",
  AuthMiddleware.verifyToken,
  OrderController.cancelOrder,
);

// Delete order (admin use)
router.delete("/:id", AuthMiddleware.verifyToken, OrderController.deleteOrder);

// Get all orders (admin use)
router.get("/", AuthMiddleware.verifyToken, OrderController.getAllOrders);

// Get orders by status (admin use)
router.get(
  "/status/:status",
  AuthMiddleware.verifyToken,
  OrderController.getOrdersByStatus,
);

// Get order with escrow info (protected)
router.get(
  "/:id/escrow",
  AuthMiddleware.verifyToken,
  OrderController.getOrderWithEscrow,
);

// Add item to an order (protected)
router.post(
  "/:id/items",
  AuthMiddleware.verifyToken,
  OrderValidator.addOrderItem,
  ValidationMiddleware.validate,
  OrderController.addOrderItem,
);

// Get items for an order (protected)
router.get(
  "/:id/items",
  AuthMiddleware.verifyToken,
  OrderController.getOrderItems,
);

// Update an order item (protected)
router.put(
  "/:id/items/:itemId",
  AuthMiddleware.verifyToken,
  OrderController.updateOrderItem,
);

// Delete an order item (protected)
router.delete(
  "/:id/items/:itemId",
  AuthMiddleware.verifyToken,
  OrderController.deleteOrderItem,
);

export default router;
