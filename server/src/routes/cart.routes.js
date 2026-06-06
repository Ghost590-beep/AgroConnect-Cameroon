// src/routes/cart.routes.js
import express from "express";
import CartController from "../controllers/cart.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import CartValidator from "../validators/cart.validator.js";

const router = express.Router();

/**
 * Cart Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to cart controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., discount codes).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Add item to cart (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  CartValidator.addItem,
  ValidationMiddleware.validate,
  CartController.addItem,
);

// Get cart by user (protected)
router.get("/", AuthMiddleware.verifyToken, CartController.getCartByUser);

// Update item quantity (protected)
router.put(
  "/quantity",
  AuthMiddleware.verifyToken,
  CartValidator.updateQuantity,
  ValidationMiddleware.validate,
  CartController.updateQuantity,
);

// Remove item from cart (protected)
router.delete(
  "/:productId",
  AuthMiddleware.verifyToken,
  CartController.removeItem,
);

// Clear cart (protected)
router.delete("/", AuthMiddleware.verifyToken, CartController.clearCart);

export default router;
