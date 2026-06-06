// src/routes/review.routes.js
import express from "express";
import ReviewController from "../controllers/review.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import ReviewValidator from "../validators/review.validator.js";

const router = express.Router();

/**
 * Review Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to controller methods.
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Add a new review (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  ReviewValidator.addReview,
  ValidationMiddleware.validate,
  ReviewController.addReview,
);

// Get all reviews for a product
router.get("/product/:productId", ReviewController.getProductReviews);

// Get all reviews by a user
router.get("/user/:userId", ReviewController.getUserReviews);

// Get a single review by ID
router.get("/:id", ReviewController.getReviewById);

// Update a review (protected)
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  ReviewValidator.updateReview,
  ValidationMiddleware.validate,
  ReviewController.updateReview,
);

// Delete a review (protected)
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  ReviewController.deleteReview,
);

// Get average rating for a product
router.get("/product/:productId/average", ReviewController.getAverageRating);

// Count reviews for a product
router.get("/product/:productId/count", ReviewController.countReviews);

// Get latest reviews
router.get("/latest", ReviewController.getLatestReviews);

export default router;
