// src/routes/paymentProvider.routes.js
import express from "express";
import PaymentProviderController from "../controllers/paymentProvider.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import PaymentProviderValidator from "../validators/paymentProvider.validator.js";

const router = express.Router();

/**
 * Payment Provider Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to provider controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., provider analytics).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Add provider (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  PaymentProviderValidator.addProvider,
  ValidationMiddleware.validate,
  PaymentProviderController.addProvider,
);

// Get all providers
router.get("/", PaymentProviderController.getAllProviders);

// Get provider by ID
router.get("/:id", PaymentProviderController.getProviderById);

// Update provider (protected)
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  PaymentProviderValidator.updateProvider,
  ValidationMiddleware.validate,
  PaymentProviderController.updateProvider,
);

// Delete provider (protected)
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  PaymentProviderController.deleteProvider,
);

// Count providers
router.get("/count/all", PaymentProviderController.countProviders);

export default router;
