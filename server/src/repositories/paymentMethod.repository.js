// src/repositories/paymentMethod.repository.js
import db from "../config/db.js";

/**
 * PaymentMethodRepository
 * - SRP: Handles only payment method-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class PaymentMethodRepository {
  // =========================
  // Create a new payment method
  // =========================
  async create(name, description) {
    const result = await db.query(
      "INSERT INTO payment_methods (name, description) VALUES (?, ?)",
      [name, description],
    );
    return result.insertId;
  }

  // =========================
  // Get all payment methods
  // =========================
  async findAll() {
    return await db.query("SELECT * FROM payment_methods");
  }

  // =========================
  // Get payment method by ID
  // =========================
  async findById(id) {
    const rows = await db.query("SELECT * FROM payment_methods WHERE id=?", [
      id,
    ]);
    return rows[0];
  }

  // =========================
  // Get payment method by name
  // =========================
  async findByName(name) {
    const rows = await db.query("SELECT * FROM payment_methods WHERE name=?", [
      name,
    ]);
    return rows[0];
  }

  // =========================
  // Update payment method details
  // =========================
  async update(id, updates) {
    const { name, description } = updates;
    await db.query(
      "UPDATE payment_methods SET name=?, description=? WHERE id=?",
      [name, description, id],
    );
    return this.findById(id);
  }

  // =========================
  // Delete a payment method
  // =========================
  async delete(id) {
    await db.query("DELETE FROM payment_methods WHERE id=?", [id]);
    return true;
  }

  // =========================
  // Check if a payment method exists
  // =========================
  async exists(name) {
    const rows = await db.query("SELECT * FROM payment_methods WHERE name=?", [
      name,
    ]);
    return rows.length > 0;
  }

  // =========================
  // Count total payment methods
  // =========================
  async count() {
    const rows = await db.query(
      "SELECT COUNT(*) AS total FROM payment_methods",
    );
    return rows[0].total;
  }
}

export default new PaymentMethodRepository();
1;
