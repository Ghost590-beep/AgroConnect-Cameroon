// src/repositories/auditLog.repository.js
import db from "../config/db.js";

/**
 * AuditLogRepository
 * - SRP: Handles only audit log-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class AuditLogRepository {
  // =========================
  // Create a new audit log entry
  // =========================
  async create(userId, action, entity, entityId, details) {
    const result = await db.query(
      `INSERT INTO audit_logs (user_id, action, entity, entity_id, details, timestamp) 
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [userId, action, entity, entityId, details],
    );
    return result.insertId;
  }

  // =========================
  // Get all audit logs
  // =========================
  async findAll() {
    return await db.query("SELECT * FROM audit_logs ORDER BY timestamp DESC");
  }

  // =========================
  // Get audit log by ID
  // =========================
  async findById(logId) {
    const rows = await db.query("SELECT * FROM audit_logs WHERE id=?", [logId]);
    return rows[0];
  }

  // =========================
  // Get audit logs by user
  // =========================
  async findByUserId(userId) {
    return await db.query(
      "SELECT * FROM audit_logs WHERE user_id=? ORDER BY timestamp DESC",
      [userId],
    );
  }

  // =========================
  // Get audit logs by action type
  // =========================
  async findByAction(action) {
    return await db.query(
      "SELECT * FROM audit_logs WHERE action=? ORDER BY timestamp DESC",
      [action],
    );
  }

  // =========================
  // Get audit logs by entity type
  // =========================
  async findByEntity(entity) {
    return await db.query(
      "SELECT * FROM audit_logs WHERE entity=? ORDER BY timestamp DESC",
      [entity],
    );
  }

  // =========================
  // Get audit logs for a specific entity record
  // =========================
  async findByEntityId(entity, entityId) {
    return await db.query(
      "SELECT * FROM audit_logs WHERE entity=? AND entity_id=? ORDER BY timestamp DESC",
      [entity, entityId],
    );
  }

  // =========================
  // Delete audit log by ID (admin use)
  // =========================
  async delete(logId) {
    await db.query("DELETE FROM audit_logs WHERE id=?", [logId]);
    return true;
  }

  // =========================
  // Clear all audit logs (admin use, maintenance)
  // =========================
  async clearAll() {
    await db.query("DELETE FROM audit_logs");
    return true;
  }

  // =========================
  // Count total audit logs
  // =========================
  async count() {
    const rows = await db.query("SELECT COUNT(*) AS total FROM audit_logs");
    return rows[0].total;
  }
}

export default new AuditLogRepository();
