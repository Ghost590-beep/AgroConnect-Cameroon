// src/repositories/orderItem.repository.js
import db from "../config/db.js";

/**
 * OrderItemRepository
 * - SRP: Handles only order item-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class OrderItemRepository {
  // =========================
  // Add a new item to an order
  // =========================
  async create(orderId, productId, quantity, price) {
    const result = await db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [orderId, productId, quantity, price],
    );
    return result.insertId;
  }

  // =========================
  // Get all items for an order
  // =========================
  async findByOrderId(orderId) {
    return await db.query(
      `SELECT oi.*, p.name, p.price AS product_price 
       FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id=?`,
      [orderId],
    );
  }

  // =========================
  // Get a single order item by ID
  // =========================
  async findById(itemId) {
    const rows = await db.query("SELECT * FROM order_items WHERE id=?", [
      itemId,
    ]);
    return rows[0];
  }

  // =========================
  // Update quantity or price of an order item
  // =========================
  async update(itemId, updates) {
    const { quantity, price } = updates;
    await db.query("UPDATE order_items SET quantity=?, price=? WHERE id=?", [
      quantity,
      price,
      itemId,
    ]);
    return this.findById(itemId);
  }

  // =========================
  // Delete a specific order item
  // =========================
  async delete(itemId) {
    await db.query("DELETE FROM order_items WHERE id=?", [itemId]);
    return true;
  }

  // =========================
  // Delete all items for an order
  // =========================
  async deleteByOrderId(orderId) {
    await db.query("DELETE FROM order_items WHERE order_id=?", [orderId]);
    return true;
  }

  // =========================
  // Get total cost of items in an order
  // =========================
  async calculateTotal(orderId) {
    const rows = await db.query(
      "SELECT SUM(quantity * price) AS total FROM order_items WHERE order_id=?",
      [orderId],
    );
    return rows[0].total || 0;
  }

  // =========================
  // Get product quantities across all orders (analytics)
  // =========================
  async getProductSales(productId) {
    const rows = await db.query(
      "SELECT SUM(quantity) AS total_sold FROM order_items WHERE product_id=?",
      [productId],
    );
    return rows[0].total_sold || 0;
  }
}

export default new OrderItemRepository();
1;
