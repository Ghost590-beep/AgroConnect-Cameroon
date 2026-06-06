// src/controllers/favorite.controller.js
import FavoriteService from "../services/favorite.service.js";
import response from "../utils/response.js";

/**
 * FavoriteController
 * - OOP: Encapsulated in a class, exposing only public methods.
 * - SOLID:
 *   - SRP: Handles only favorite-related request/response.
 *   - OCP: Can be extended with new endpoints (e.g., bulk favorites) without modifying existing ones.
 *   - DIP: Depends on FavoriteService abstraction, not repository directly.
 */
class FavoriteController {
  // Add product to favorites
  async addFavorite(req, res, next) {
    try {
      const { productId } = req.body;
      const userId = req.user.id; // from JWT middleware
      const favorite = await FavoriteService.addFavorite(userId, productId);
      return response.success(res, favorite, "Product added to favorites", 201);
    } catch (error) {
      next(error);
    }
  }

  // Remove product from favorites
  async removeFavorite(req, res, next) {
    try {
      const userId = req.user.id;
      await FavoriteService.removeFavorite(userId, req.params.productId);
      return response.success(res, null, "Product removed from favorites");
    } catch (error) {
      next(error);
    }
  }

  // Get all favorites for a user
  async getUserFavorites(req, res, next) {
    try {
      const favorites = await FavoriteService.getUserFavorites(
        req.params.userId,
      );
      return response.success(
        res,
        favorites,
        "User favorites retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Toggle favorite (business rule)
  async toggleFavorite(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await FavoriteService.toggleFavorite(
        userId,
        req.params.productId,
      );
      return response.success(res, result, "Favorite toggled successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new FavoriteController();
