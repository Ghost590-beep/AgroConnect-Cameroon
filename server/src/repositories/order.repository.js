// src/repositories/order.repository.js
import db from "../config/db.js";

/**
 * OrderRepository
 * - SRP: Handles only order-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class OrderRepository {
  // =========================
  // Create a new order
  // =========================
  async create(order) {
    const {
      user_id,
      total_price,
      payment_method_id,
      payment_provider_id,
      delivery_name,
      delivery_phone,
      delivery_location,
      notes,
    } = order;

    const result = await db.query(
      `INSERT INTO orders 
       (user_id, total_price, payment_method_id, payment_provider_id, delivery_name, delivery_phone, delivery_location, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        total_price,
        payment_method_id,
        payment_provider_id,
        delivery_name,
        delivery_phone,
        delivery_location,
        notes,
      ],
    );
    return result.insertId;
  }

  // =========================
  // Add item to an order
  // =========================
  async addOrderItem(orderId, item) {
    const { product_id, quantity, price } = item;
    await db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [orderId, product_id, quantity, price],
    );
  }

  // =========================
  // Get order by ID
  // =========================
  async findById(orderId) {
    const rows = await db.query("SELECT * FROM orders WHERE id = ?", [orderId]);
    return rows[0];
  }

  // =========================
  // Get all orders for a user
  // =========================
  async findByUserId(userId) {
    return await db.query("SELECT * FROM orders WHERE user_id = ?", [userId]);
  }

  // =========================
  // Get all items for an order
  // =========================
  async findItemsByOrderId(orderId) {
    return await db.query("SELECT * FROM order_items WHERE order_id = ?", [
      orderId,
    ]);
  }

  // =========================
  // Update order status
  // =========================
  async updateStatus(orderId, status) {
    await db.query("UPDATE orders SET status=? WHERE id=?", [status, orderId]);
    return this.findById(orderId);
  }

  // =========================
  // Update payment status
  // =========================
  async updatePaymentStatus(orderId, paymentStatus) {
    await db.query("UPDATE orders SET payment_status=? WHERE id=?", [
      paymentStatus,
      orderId,
    ]);
    return this.findById(orderId);
  }

  // =========================
  // Delete an order
  // =========================
  async delete(orderId) {
    await db.query("DELETE FROM orders WHERE id=?", [orderId]);
    return true;
  }

  // =========================
  // Get all orders (admin use)
  // =========================
  async findAll() {
    return await db.query("SELECT * FROM orders");
  }

  // =========================
  // Get orders by status
  // =========================
  async findByStatus(status) {
    return await db.query("SELECT * FROM orders WHERE status=?", [status]);
  }

  // =========================
  // Get orders with escrow info
  // =========================
  async findWithEscrow(orderId) {
    const rows = await db.query(
      `SELECT o.*, e.status AS escrow_status, e.amount AS escrow_amount
       FROM orders o
       LEFT JOIN escrow_accounts e ON o.id = e.order_id
       WHERE o.id = ?`,
      [orderId],
    );
    return rows[0];
  }
}

export default new OrderRepository();
