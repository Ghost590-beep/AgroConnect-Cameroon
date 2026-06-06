// src/services/review.service.js
import ReviewRepository from "../repositories/review.repository.js";

class ReviewService {
  // =========================
  // Add a new review
  // =========================
  async addReview(userId, productId, rating, comment) {
    // Optional rule: prevent duplicate reviews by same user for same product
    const existingReviews = await ReviewRepository.findByUserId(userId);
    const alreadyReviewed = existingReviews.some(
      (r) => r.product_id === productId,
    );
    if (alreadyReviewed) {
      throw new Error("User has already reviewed this product");
    }

    const reviewId = await ReviewRepository.create(
      userId,
      productId,
      rating,
      comment,
    );
    return await ReviewRepository.findById(reviewId);
  }

  // =========================
  // Get all reviews for a product
  // =========================
  async getProductReviews(productId) {
    return await ReviewRepository.findByProductId(productId);
  }

  // =========================
  // Get all reviews by a user
  // =========================
  async getUserReviews(userId) {
    return await ReviewRepository.findByUserId(userId);
  }

  // =========================
  // Get a single review by ID
  // =========================
  async getReviewById(reviewId) {
    return await ReviewRepository.findById(reviewId);
  }

  // =========================
  // Update a review
  // =========================
  async updateReview(reviewId, updates) {
    return await ReviewRepository.update(reviewId, updates);
  }

  // =========================
  // Delete a review
  // =========================
  async deleteReview(reviewId) {
    return await ReviewRepository.delete(reviewId);
  }

  // =========================
  // Get average rating for a product
  // =========================
  async getAverageRating(productId) {
    return await ReviewRepository.getAverageRating(productId);
  }

  // =========================
  // Count reviews for a product
  // =========================
  async countReviews(productId) {
    return await ReviewRepository.countByProductId(productId);
  }

  // =========================
  // Get latest reviews (for homepage/dashboard)
  // =========================
  async getLatestReviews(limit = 10) {
    return await ReviewRepository.findLatest(limit);
  }
}

export default new ReviewService();
