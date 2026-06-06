// src/repositories/notification.repository.js
import db from "../config/db.js";

/**
 * NotificationRepository
 * - SRP: Handles only notification-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class NotificationRepository {
  // =========================
  // Get notification preferences by user ID
  // =========================
  async getByUserId(userId) {
    const rows = await db.query(
      "SELECT * FROM notifications WHERE user_id = ?",
      [userId],
    );
    return rows[0];
  }

  // =========================
  // Create default notification preferences for a new user
  // =========================
  async createForUser(userId) {
    const result = await db.query(
      `INSERT INTO notifications 
       (user_id, receives_order_notifications, receives_promotion_notifications, receives_newsletter, receives_sms_notifications)
       VALUES (?, TRUE, TRUE, TRUE, FALSE)`,
      [userId],
    );
    return result.insertId;
  }

  // =========================
  // Update notification preferences
  // =========================
  async updatePreferences(userId, prefs) {
    const {
      receives_order_notifications,
      receives_promotion_notifications,
      receives_newsletter,
      receives_sms_notifications,
    } = prefs;

    await db.query(
      `UPDATE notifications 
       SET receives_order_notifications=?, receives_promotion_notifications=?, receives_newsletter=?, receives_sms_notifications=? 
       WHERE user_id=?`,
      [
        receives_order_notifications,
        receives_promotion_notifications,
        receives_newsletter,
        receives_sms_notifications,
        userId,
      ],
    );
    return this.getByUserId(userId);
  }

  // =========================
  // Enable a specific notification type
  // =========================
  async enableNotification(userId, type) {
    await db.query(`UPDATE notifications SET ${type}=? WHERE user_id=?`, [
      true,
      userId,
    ]);
    return this.getByUserId(userId);
  }

  // =========================
  // Disable a specific notification type
  // =========================
  async disableNotification(userId, type) {
    await db.query(`UPDATE notifications SET ${type}=? WHERE user_id=?`, [
      false,
      userId,
    ]);
    return this.getByUserId(userId);
  }

  // =========================
  // Delete notification preferences for a user (e.g., if user account is deleted)
  // =========================
  async deleteByUserId(userId) {
    await db.query("DELETE FROM notifications WHERE user_id=?", [userId]);
    return true;
  }

  // =========================
  // Get all users subscribed to a specific notification type
  // =========================
  async getUsersByPreference(type) {
    return await db.query(
      `SELECT user_id FROM notifications WHERE ${type} = TRUE`,
    );
  }
}

export default new NotificationRepository();
