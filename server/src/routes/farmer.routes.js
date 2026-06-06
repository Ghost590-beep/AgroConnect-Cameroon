// src/routes/farmer.routes.js
import express from "express";
import FarmerController from "../controllers/farmer.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import FarmerValidator from "../validators/farmer.validator.js";

const router = express.Router();

/**
 * Farmer Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to farmer controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., farmer analytics).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Create farmer profile (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  FarmerValidator.createFarmer,
  ValidationMiddleware.validate,
  FarmerController.createFarmer,
);

// Get farmer by ID
router.get("/:id", FarmerController.getFarmerById);

// Get farmer by user ID
router.get("/user/:userId", FarmerController.getFarmerByUserId);

// Update farmer profile (protected)
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  FarmerValidator.updateFarmer,
  ValidationMiddleware.validate,
  FarmerController.updateFarmer,
);

// Delete farmer profile (protected)
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  FarmerController.deleteFarmer,
);

// Get farmer products
router.get("/:id/products", FarmerController.getFarmerProducts);

// Get farmers by location
router.get("/location/:location", FarmerController.getFarmersByLocation);

// Count farmers
router.get("/count/all", FarmerController.countFarmers);

export default router;
