// src/repositories/paymentProvider.repository.js
import db from "../config/db.js";

/**
 * PaymentProviderRepository
 * - SRP: Handles only payment provider-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class PaymentProviderRepository {
  // =========================
  // Create a new payment provider
  // =========================
  async create(name, description) {
    const result = await db.query(
      "INSERT INTO payment_providers (name, description) VALUES (?, ?)",
      [name, description],
    );
    return result.insertId;
  }

  // =========================
  // Get all payment providers
  // =========================
  async findAll() {
    return await db.query("SELECT * FROM payment_providers");
  }

  // =========================
  // Get provider by ID
  // =========================
  async findById(id) {
    const rows = await db.query("SELECT * FROM payment_providers WHERE id=?", [
      id,
    ]);
    return rows[0];
  }

  // =========================
  // Get provider by name
  // =========================
  async findByName(name) {
    const rows = await db.query(
      "SELECT * FROM payment_providers WHERE name=?",
      [name],
    );
    return rows[0];
  }

  // =========================
  // Update provider details
  // =========================
  async update(id, updates) {
    const { name, description } = updates;
    await db.query(
      "UPDATE payment_providers SET name=?, description=? WHERE id=?",
      [name, description, id],
    );
    return this.findById(id);
  }

  // =========================
  // Delete provider
  // =========================
  async delete(id) {
    await db.query("DELETE FROM payment_providers WHERE id=?", [id]);
    return true;
  }

  // =========================
  // Check if provider exists
  // =========================
  async exists(name) {
    const rows = await db.query(
      "SELECT * FROM payment_providers WHERE name=?",
      [name],
    );
    return rows.length > 0;
  }

  // =========================
  // Count total providers
  // =========================
  async count() {
    const rows = await db.query(
      "SELECT COUNT(*) AS total FROM payment_providers",
    );
    return rows[0].total;
  }
}

export default new PaymentProviderRepository();
