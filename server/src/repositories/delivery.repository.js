// src/repositories/delivery.repository.js
import db from "../config/db.js";

/**
 * DeliveryRepository
 * - SRP: Handles only delivery-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class DeliveryRepository {
  // =========================
  // Create a new delivery record
  // =========================
  async create(orderId, address, carrier, status = "pending") {
    const result = await db.query(
      `INSERT INTO deliveries (order_id, address, carrier, status, created_at) 
       VALUES (?, ?, ?, ?, NOW())`,
      [orderId, address, carrier, status],
    );
    return result.insertId;
  }

  // =========================
  // Get delivery by ID
  // =========================
  async findById(deliveryId) {
    const rows = await db.query("SELECT * FROM deliveries WHERE id=?", [
      deliveryId,
    ]);
    return rows[0];
  }

  // =========================
  // Get delivery by order ID
  // =========================
  async findByOrderId(orderId) {
    const rows = await db.query("SELECT * FROM deliveries WHERE order_id=?", [
      orderId,
    ]);
    return rows[0];
  }

  // =========================
  // Get all deliveries
  // =========================
  async findAll() {
    return await db.query("SELECT * FROM deliveries ORDER BY created_at DESC");
  }

  // =========================
  // Update delivery details
  // =========================
  async update(deliveryId, updates) {
    const { address, carrier, status } = updates;
    await db.query(
      "UPDATE deliveries SET address=?, carrier=?, status=? WHERE id=?",
      [address, carrier, status, deliveryId],
    );
    return this.findById(deliveryId);
  }

  // =========================
  // Update delivery status only
  // =========================
  async updateStatus(deliveryId, status) {
    await db.query("UPDATE deliveries SET status=? WHERE id=?", [
      status,
      deliveryId,
    ]);
    return this.findById(deliveryId);
  }

  // =========================
  // Delete delivery record
  // =========================
  async delete(deliveryId) {
    await db.query("DELETE FROM deliveries WHERE id=?", [deliveryId]);
    return true;
  }

  // =========================
  // Get deliveries by status
  // =========================
  async findByStatus(status) {
    return await db.query("SELECT * FROM deliveries WHERE status=?", [status]);
  }

  // =========================
  // Get deliveries by carrier
  // =========================
  async findByCarrier(carrier) {
    return await db.query("SELECT * FROM deliveries WHERE carrier=?", [
      carrier,
    ]);
  }

  // =========================
  // Count deliveries by status
  // =========================
  async countByStatus(status) {
    const rows = await db.query(
      "SELECT COUNT(*) AS total FROM deliveries WHERE status=?",
      [status],
    );
    return rows[0].total;
  }
}

export default new DeliveryRepository();
