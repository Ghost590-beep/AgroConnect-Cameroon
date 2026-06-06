// src/services/orderItem.service.js
import OrderItemRepository from "../repositories/orderItem.repository.js";
import ProductRepository from "../repositories/product.repository.js";

class OrderItemService {
  // =========================
  // Add a new item to an order
  // =========================
  async addItem(orderId, productId, quantity, price) {
    // Validate product exists
    const product = await ProductRepository.findById(productId);
    if (!product) throw new Error("Product not found");

    // Optional: check stock availability
    if (product.stock < quantity) {
      throw new Error("Insufficient stock for product");
    }

    const itemId = await OrderItemRepository.create(
      orderId,
      productId,
      quantity,
      price,
    );
    return await OrderItemRepository.findById(itemId);
  }

  // =========================
  // Get all items for an order
  // =========================
  async getItemsByOrder(orderId) {
    return await OrderItemRepository.findByOrderId(orderId);
  }

  // =========================
  // Get a single order item by ID
  // =========================
  async getItemById(itemId) {
    return await OrderItemRepository.findById(itemId);
  }

  // =========================
  // Update quantity or price of an order item
  // =========================
  async updateItem(itemId, updates) {
    return await OrderItemRepository.update(itemId, updates);
  }

  // =========================
  // Delete a specific order item
  // =========================
  async deleteItem(itemId) {
    return await OrderItemRepository.delete(itemId);
  }

  // =========================
  // Delete all items for an order
  // =========================
  async clearOrderItems(orderId) {
    return await OrderItemRepository.deleteByOrderId(orderId);
  }

  // =========================
  // Get total cost of items in an order
  // =========================
  async calculateOrderTotal(orderId) {
    return await OrderItemRepository.calculateTotal(orderId);
  }

  // =========================
  // Get product sales count across all orders (analytics)
  // =========================
  async getProductSales(productId) {
    return await OrderItemRepository.getProductSales(productId);
  }
}

export default new OrderItemService();
