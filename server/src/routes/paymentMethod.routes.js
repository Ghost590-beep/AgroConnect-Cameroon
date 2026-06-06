// src/routes/paymentMethod.routes.js
import express from "express";
import PaymentMethodController from "../controllers/paymentMethod.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import PaymentMethodValidator from "../validators/paymentMethod.validator.js";

const router = express.Router();

/**
 * Payment Method Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to method controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., method analytics).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Add method (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  PaymentMethodValidator.addMethod,
  ValidationMiddleware.validate,
  PaymentMethodController.addMethod,
);

// Get all methods
router.get("/", PaymentMethodController.getAllMethods);

// Get method by ID
router.get("/:id", PaymentMethodController.getMethodById);

// Update method (protected)
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  PaymentMethodValidator.updateMethod,
  ValidationMiddleware.validate,
  PaymentMethodController.updateMethod,
);

// Delete method (protected)
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  PaymentMethodController.deleteMethod,
);

// Count methods
router.get("/count/all", PaymentMethodController.countMethods);

export default router;
