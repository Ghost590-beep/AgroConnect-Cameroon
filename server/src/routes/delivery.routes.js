// src/routes/delivery.routes.js
import express from "express";
import DeliveryController from "../controllers/delivery.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import DeliveryValidator from "../validators/delivery.validator.js";

const router = express.Router();

/**
 * Delivery Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to delivery controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., delivery tracking).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Create new delivery (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  DeliveryValidator.createDelivery,
  ValidationMiddleware.validate,
  DeliveryController.createDelivery,
);

// Get delivery by ID (protected)
router.get(
  "/:id",
  AuthMiddleware.verifyToken,
  DeliveryController.getDeliveryById,
);

// Get delivery by order ID (protected)
router.get(
  "/order/:orderId",
  AuthMiddleware.verifyToken,
  DeliveryController.getDeliveryByOrder,
);

// Update delivery details (protected)
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  DeliveryController.updateDelivery,
);

// Update delivery status (protected)
router.put(
  "/:id/status",
  AuthMiddleware.verifyToken,
  DeliveryValidator.updateDeliveryStatus,
  ValidationMiddleware.validate,
  DeliveryController.updateDeliveryStatus,
);

// Complete delivery (protected, business rule)
router.put(
  "/:id/complete",
  AuthMiddleware.verifyToken,
  DeliveryController.completeDelivery,
);

// Cancel delivery (protected, business rule)
router.put(
  "/:id/cancel",
  AuthMiddleware.verifyToken,
  DeliveryController.cancelDelivery,
);

export default router;
