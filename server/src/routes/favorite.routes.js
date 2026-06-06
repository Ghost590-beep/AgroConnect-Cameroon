// src/routes/favorite.routes.js
import express from "express";
import FavoriteController from "../controllers/favorite.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import FavoriteValidator from "../validators/favorite.validator.js";

const router = express.Router();

/**
 * Favorite Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to favorite controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., bulk favorites).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Add product to favorites (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  FavoriteValidator.addFavorite,
  ValidationMiddleware.validate,
  FavoriteController.addFavorite,
);

// Remove product from favorites (protected)
router.delete(
  "/:productId",
  AuthMiddleware.verifyToken,
  FavoriteController.removeFavorite,
);

// Get all favorites for a user (protected)
router.get(
  "/user/:userId",
  AuthMiddleware.verifyToken,
  FavoriteController.getUserFavorites,
);

// Toggle favorite (protected)
router.put(
  "/:productId/toggle",
  AuthMiddleware.verifyToken,
  FavoriteController.toggleFavorite,
);

export default router;
