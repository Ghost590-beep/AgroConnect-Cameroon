// src/controllers/cart.controller.js
import CartService from "../services/cart.service.js";
import response from "../utils/response.js";

/**
 * CartController
 * - OOP: Encapsulated in a class, exposing only public methods.
 * - SOLID:
 *   - SRP: Handles only cart-related request/response logic.
 *   - OCP: Can be extended with new endpoints (e.g., apply discount codes) without modifying existing ones.
 *   - DIP: Depends on CartService abstraction, not repository directly.
 * - OOP Concepts:
 *   - Encapsulation: Internal cart logic hidden in service, controller only exposes endpoints.
 *   - Polymorphism: Different methods (addItem, updateQuantity, clearCart) provide varied behaviors but share consistent interface style.
 *   - Inheritance (future): Could extend a BaseController for shared methods like error handling.
 */
class CartController {
  // Add item to cart
  async addItem(req, res, next) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id; // from JWT middleware
      const cart = await CartService.addItem(userId, productId, quantity);
      return response.success(res, cart, "Item added to cart", 201);
    } catch (error) {
      next(error);
    }
  }

  // Get cart by user
  async getCartByUser(req, res, next) {
    try {
      const userId = req.user.id;
      const cart = await CartService.getCartByUser(userId);
      return response.success(res, cart, "Cart retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Update item quantity
  async updateQuantity(req, res, next) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id;
      const cart = await CartService.updateQuantity(
        userId,
        productId,
        quantity,
      );
      return response.success(res, cart, "Cart updated successfully");
    } catch (error) {
      next(error);
    }
  }

  // Remove item from cart
  async removeItem(req, res, next) {
    try {
      const userId = req.user.id;
      const cart = await CartService.removeItem(userId, req.params.productId);
      return response.success(res, cart, "Item removed from cart");
    } catch (error) {
      next(error);
    }
  }

  // Clear cart
  async clearCart(req, res, next) {
    try {
      const userId = req.user.id;
      await CartService.clearCart(userId);
      return response.success(res, [], "Cart cleared successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
