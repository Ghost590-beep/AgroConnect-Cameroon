// src/repositories/userActions.repository.js
import db from "../config/db.js";

/**
 * UserActionsRepository
 * - SRP: Handles only user action-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class UserActionsRepository {
  // =========================
  // Create a new action for a user
  // =========================
  async create(userId, action) {
    const result = await db.query(
      "INSERT INTO user_actions (user_id, action) VALUES (?, ?)",
      [userId, action],
    );
    return result.insertId;
  }

  // =========================
  // Get all actions for a user
  // =========================
  async findByUserId(userId) {
    return await db.query("SELECT * FROM user_actions WHERE user_id=?", [
      userId,
    ]);
  }

  // =========================
  // Check if user has a specific action
  // =========================
  async hasAction(userId, action) {
    const rows = await db.query(
      "SELECT * FROM user_actions WHERE user_id=? AND action=?",
      [userId, action],
    );
    return rows.length > 0;
  }

  // =========================
  // Update a user’s action (e.g., change farmer → buyer)
  // =========================
  async updateAction(actionId, newAction) {
    await db.query("UPDATE user_actions SET action=? WHERE id=?", [
      newAction,
      actionId,
    ]);
    return this.findById(actionId);
  }

  // =========================
  // Get action by ID
  // =========================
  async findById(actionId) {
    const rows = await db.query("SELECT * FROM user_actions WHERE id=?", [
      actionId,
    ]);
    return rows[0];
  }

  // =========================
  // Delete a specific action for a user
  // =========================
  async delete(userId, action) {
    await db.query("DELETE FROM user_actions WHERE user_id=? AND action=?", [
      userId,
      action,
    ]);
    return true;
  }

  // =========================
  // Delete all actions for a user (e.g., account removal)
  // =========================
  async deleteAllByUser(userId) {
    await db.query("DELETE FROM user_actions WHERE user_id=?", [userId]);
    return true;
  }

  // =========================
  // Get all users with a specific action (e.g., all farmers)
  // =========================
  async findUsersByAction(action) {
    return await db.query("SELECT user_id FROM user_actions WHERE action=?", [
      action,
    ]);
  }
}

export default new UserActionsRepository();
