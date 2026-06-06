// src/services/cart.service.js
import CartRepository from "../repositories/cart.repository.js";

/**
 * CartService
 * - OOP: Encapsulated in a class, exposing only public methods.
 * - SOLID:
 *   - SRP: Handles only cart-related business logic.
 *   - OCP: Can be extended with new rules (e.g., stock validation) without modifying existing methods.
 *   - DIP: Depends on CartRepository abstraction, not raw DB queries.
 */
class CartService {
  // Add item to cart
  async addItem(userId, productId, quantity = 1) {
    await CartRepository.addItem(userId, productId, quantity);
    return await CartRepository.getCartByUser(userId);
  }

  // Get cart by user
  async getCartByUser(userId) {
    return await CartRepository.getCartByUser(userId);
  }

  // Update item quantity
  async updateQuantity(userId, productId, quantity) {
    await CartRepository.updateQuantity(userId, productId, quantity);
    return await CartRepository.getCartByUser(userId);
  }

  // Remove item from cart
  async removeItem(userId, productId) {
    await CartRepository.removeItem(userId, productId);
    return await CartRepository.getCartByUser(userId);
  }

  // Clear cart
  async clearCart(userId) {
    await CartRepository.clearCart(userId);
    return [];
  }
}

export default new CartService();
