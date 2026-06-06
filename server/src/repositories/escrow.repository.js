// src/repositories/escrow.repository.js
import db from "../config/db.js";

/**
 * EscrowRepository
 * - SRP: Handles only escrow-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class EscrowRepository {
  // =========================
  // Create escrow record for an order
  // =========================
  async create(orderId, amount) {
    const result = await db.query(
      "INSERT INTO escrow_accounts (order_id, amount, status) VALUES (?, ?, 'holding')",
      [orderId, amount],
    );
    return result.insertId;
  }

  // =========================
  // Release funds when buyer confirms delivery
  // =========================
  async release(orderId) {
    await db.query(
      "UPDATE escrow_accounts SET status='released' WHERE order_id=?",
      [orderId],
    );
    return this.findByOrderId(orderId);
  }

  // =========================
  // Refund funds if order is cancelled
  // =========================
  async refund(orderId) {
    await db.query(
      "UPDATE escrow_accounts SET status='refunded' WHERE order_id=?",
      [orderId],
    );
    return this.findByOrderId(orderId);
  }

  // =========================
  // Get escrow record by order ID
  // =========================
  async findByOrderId(orderId) {
    const rows = await db.query(
      "SELECT * FROM escrow_accounts WHERE order_id=?",
      [orderId],
    );
    return rows[0];
  }

  // =========================
  // Get all escrow records (admin use)
  // =========================
  async findAll() {
    return await db.query("SELECT * FROM escrow_accounts");
  }

  // =========================
  // Get all escrow records by status
  // =========================
  async findByStatus(status) {
    return await db.query("SELECT * FROM escrow_accounts WHERE status=?", [
      status,
    ]);
  }

  // =========================
  // Update escrow amount (e.g., partial refund or adjustment)
  // =========================
  async updateAmount(orderId, newAmount) {
    await db.query("UPDATE escrow_accounts SET amount=? WHERE order_id=?", [
      newAmount,
      orderId,
    ]);
    return this.findByOrderId(orderId);
  }

  // =========================
  // Delete escrow record (e.g., cleanup after order deletion)
  // =========================
  async delete(orderId) {
    await db.query("DELETE FROM escrow_accounts WHERE order_id=?", [orderId]);
    return true;
  }
}

export default new EscrowRepository();
