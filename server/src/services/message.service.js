// src/services/message.service.js
import MessageRepository from "../repositories/message.repository.js";

class MessageService {
  // =========================
  // Send a new message
  // =========================
  async sendMessage(senderId, receiverId, content) {
    if (!content || content.trim() === "") {
      throw new Error("Message content cannot be empty");
    }
    const messageId = await MessageRepository.create(
      senderId,
      receiverId,
      content,
    );
    return await MessageRepository.findById(messageId);
  }

  // =========================
  // Get conversation between two users
  // =========================
  async getConversation(userAId, userBId) {
    return await MessageRepository.findConversation(userAId, userBId);
  }

  // =========================
  // Get all received messages for a user
  // =========================
  async getReceivedMessages(userId) {
    return await MessageRepository.findReceivedMessages(userId);
  }

  // =========================
  // Get all sent messages for a user
  // =========================
  async getSentMessages(userId) {
    return await MessageRepository.findSentMessages(userId);
  }

  // =========================
  // Get a single message by ID
  // =========================
  async getMessageById(messageId) {
    return await MessageRepository.findById(messageId);
  }

  // =========================
  // Mark a message as read
  // =========================
  async markMessageAsRead(messageId) {
    return await MessageRepository.markAsRead(messageId);
  }

  // =========================
  // Delete a specific message
  // =========================
  async deleteMessage(messageId) {
    return await MessageRepository.delete(messageId);
  }

  // =========================
  // Delete all messages between two users
  // =========================
  async deleteConversation(userAId, userBId) {
    return await MessageRepository.deleteConversation(userAId, userBId);
  }

  // =========================
  // Count unread messages for a user
  // =========================
  async countUnreadMessages(userId) {
    return await MessageRepository.countUnread(userId);
  }

  // =========================
  // Get latest messages (for inbox preview)
  // =========================
  async getLatestMessages(userId, limit = 10) {
    return await MessageRepository.findLatest(userId, limit);
  }

  // =========================
  // Business rule: mark all messages in a conversation as read
  // =========================
  async markConversationAsRead(userAId, userBId) {
    const conversation = await MessageRepository.findConversation(
      userAId,
      userBId,
    );
    for (const msg of conversation) {
      if (msg.status === "unread" && msg.receiver_id === userAId) {
        await MessageRepository.markAsRead(msg.id);
      }
    }
    return await this.getConversation(userAId, userBId);
  }
}

export default new MessageService();
