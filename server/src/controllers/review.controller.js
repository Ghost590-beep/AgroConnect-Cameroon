// src/controllers/review.controller.js
import ReviewService from "../services/review.service.js";
import response from "../utils/response.js";
import { validationResult } from "express-validator";

class ReviewController {
  // =========================
  // Add a new review
  // =========================
  async addReview(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.error(res, errors.array(), "Validation failed", 400);
      }

      const { productId, rating, comment } = req.body;
      const userId = req.user.id; // from JWT middleware

      const review = await ReviewService.addReview(
        userId,
        productId,
        rating,
        comment,
      );
      return response.success(res, review, "Review added successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get all reviews for a product
  // =========================
  async getProductReviews(req, res, next) {
    try {
      const reviews = await ReviewService.getProductReviews(
        req.params.productId,
      );
      return response.success(
        res,
        reviews,
        "Product reviews retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get all reviews by a user
  // =========================
  async getUserReviews(req, res, next) {
    try {
      const reviews = await ReviewService.getUserReviews(req.params.userId);
      return response.success(
        res,
        reviews,
        "User reviews retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get a single review by ID
  // =========================
  async getReviewById(req, res, next) {
    try {
      const review = await ReviewService.getReviewById(req.params.id);
      if (!review) throw new Error("Review not found");
      return response.success(res, review, "Review retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Update a review
  // =========================
  async updateReview(req, res, next) {
    try {
      const updated = await ReviewService.updateReview(req.params.id, req.body);
      return response.success(res, updated, "Review updated successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Delete a review
  // =========================
  async deleteReview(req, res, next) {
    try {
      await ReviewService.deleteReview(req.params.id);
      return response.success(res, null, "Review deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get average rating for a product
  // =========================
  async getAverageRating(req, res, next) {
    try {
      const avg = await ReviewService.getAverageRating(req.params.productId);
      return response.success(
        res,
        { average: avg },
        "Average rating retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Count reviews for a product
  // =========================
  async countReviews(req, res, next) {
    try {
      const count = await ReviewService.countReviews(req.params.productId);
      return response.success(
        res,
        { total: count },
        "Review count retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get latest reviews
  // =========================
  async getLatestReviews(req, res, next) {
    try {
      const limit = req.query.limit || 10;
      const reviews = await ReviewService.getLatestReviews(limit);
      return response.success(
        res,
        reviews,
        "Latest reviews retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new ReviewController();
