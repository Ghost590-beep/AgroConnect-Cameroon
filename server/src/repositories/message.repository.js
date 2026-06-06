// src/repositories/message.repository.js
import db from "../config/db.js";

/**
 * MessageRepository
 * - SRP: Handles only message-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class MessageRepository {
  // =========================
  // Send a new message
  // =========================
  async create(senderId, receiverId, content) {
    const result = await db.query(
      `INSERT INTO messages (sender_id, receiver_id, content, status, created_at) 
       VALUES (?, ?, ?, 'unread', NOW())`,
      [senderId, receiverId, content],
    );
    return result.insertId;
  }

  // =========================
  // Get all messages between two users (conversation)
  // =========================
  async findConversation(userAId, userBId) {
    return await db.query(
      `SELECT * FROM messages 
       WHERE (sender_id=? AND receiver_id=?) 
          OR (sender_id=? AND receiver_id=?) 
       ORDER BY created_at ASC`,
      [userAId, userBId, userBId, userAId],
    );
  }

  // =========================
  // Get all messages received by a user
  // =========================
  async findReceivedMessages(userId) {
    return await db.query(
      "SELECT * FROM messages WHERE receiver_id=? ORDER BY created_at DESC",
      [userId],
    );
  }

  // =========================
  // Get all messages sent by a user
  // =========================
  async findSentMessages(userId) {
    return await db.query(
      "SELECT * FROM messages WHERE sender_id=? ORDER BY created_at DESC",
      [userId],
    );
  }

  // =========================
  // Get a single message by ID
  // =========================
  async findById(messageId) {
    const rows = await db.query("SELECT * FROM messages WHERE id=?", [
      messageId,
    ]);
    return rows[0];
  }

  // =========================
  // Mark a message as read
  // =========================
  async markAsRead(messageId) {
    await db.query("UPDATE messages SET status='read' WHERE id=?", [messageId]);
    return this.findById(messageId);
  }

  // =========================
  // Delete a specific message
  // =========================
  async delete(messageId) {
    await db.query("DELETE FROM messages WHERE id=?", [messageId]);
    return true;
  }

  // =========================
  // Delete all messages between two users
  // =========================
  async deleteConversation(userAId, userBId) {
    await db.query(
      `DELETE FROM messages 
       WHERE (sender_id=? AND receiver_id=?) 
          OR (sender_id=? AND receiver_id=?)`,
      [userAId, userBId, userBId, userAId],
    );
    return true;
  }

  // =========================
  // Count unread messages for a user
  // =========================
  async countUnread(userId) {
    const rows = await db.query(
      "SELECT COUNT(*) AS total FROM messages WHERE receiver_id=? AND status='unread'",
      [userId],
    );
    return rows[0].total;
  }

  // =========================
  // Get latest messages (for inbox preview)
  // =========================
  async findLatest(userId, limit = 10) {
    return await db.query(
      "SELECT * FROM messages WHERE receiver_id=? ORDER BY created_at DESC LIMIT ?",
      [userId, limit],
    );
  }
}

export default new MessageRepository();
