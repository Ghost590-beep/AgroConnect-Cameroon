// src/services/favorite.service.js
import FavoriteRepository from "../repositories/favorite.repository.js";

class FavoriteService {
  // =========================
  // Add product to user's favorites
  // =========================
  async addFavorite(userId, productId) {
    const exists = await FavoriteRepository.exists(userId, productId);
    if (exists) {
      throw new Error("Product already in favorites");
    }
    const favoriteId = await FavoriteRepository.add(userId, productId);
    return { id: favoriteId, userId, productId };
  }

  // =========================
  // Remove product from user's favorites
  // =========================
  async removeFavorite(userId, productId) {
    return await FavoriteRepository.remove(userId, productId);
  }

  // =========================
  // Get all favorites for a user
  // =========================
  async getUserFavorites(userId) {
    return await FavoriteRepository.findByUserId(userId);
  }

  // =========================
  // Check if product is in user's favorites
  // =========================
  async isFavorite(userId, productId) {
    return await FavoriteRepository.exists(userId, productId);
  }

  // =========================
  // Count total favorites for a user
  // =========================
  async countFavorites(userId) {
    return await FavoriteRepository.countByUserId(userId);
  }

  // =========================
  // Get all users who favorited a product
  // =========================
  async getUsersByProduct(productId) {
    return await FavoriteRepository.findUsersByProductId(productId);
  }

  // =========================
  // Delete all favorites for a product (cleanup when product is removed)
  // =========================
  async clearFavoritesForProduct(productId) {
    return await FavoriteRepository.deleteByProductId(productId);
  }

  // =========================
  // Business rule: toggle favorite (add/remove)
  // =========================
  async toggleFavorite(userId, productId) {
    const exists = await FavoriteRepository.exists(userId, productId);
    if (exists) {
      await FavoriteRepository.remove(userId, productId);
      return { status: "removed", productId };
    } else {
      const favoriteId = await FavoriteRepository.add(userId, productId);
      return { status: "added", id: favoriteId, productId };
    }
  }
}

export default new FavoriteService();
