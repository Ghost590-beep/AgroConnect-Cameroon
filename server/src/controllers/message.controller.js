// src/controllers/message.controller.js
import MessageService from "../services/message.service.js";
import response from "../utils/response.js";

/**
 * MessageController
 * - OOP: Encapsulated in a class, exposing only public methods.
 * - SOLID:
 *   - SRP: Handles only message-related request/response.
 *   - OCP: Can be extended with new endpoints (e.g., group chat) without modifying existing ones.
 *   - DIP: Depends on MessageService abstraction, not repository directly.
 * - OOP Concepts:
 *   - Polymorphism: Different methods (sendMessage, getConversation, markMessageAsRead) provide varied behaviors but share the same interface style.
 *   - Encapsulation: Internal logic hidden inside service, controller only exposes endpoints.
 */
class MessageController {
  // Send a new message
  async sendMessage(req, res, next) {
    try {
      const { receiverId, content } = req.body;
      const senderId = req.user.id; // from JWT middleware
      const message = await MessageService.sendMessage(
        senderId,
        receiverId,
        content,
      );
      return response.success(res, message, "Message sent successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  // Get conversation between two users
  async getConversation(req, res, next) {
    try {
      const conversation = await MessageService.getConversation(
        req.params.userAId,
        req.params.userBId,
      );
      return response.success(
        res,
        conversation,
        "Conversation retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Get received messages
  async getReceivedMessages(req, res, next) {
    try {
      const messages = await MessageService.getReceivedMessages(
        req.params.userId,
      );
      return response.success(
        res,
        messages,
        "Received messages retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Get sent messages
  async getSentMessages(req, res, next) {
    try {
      const messages = await MessageService.getSentMessages(req.params.userId);
      return response.success(
        res,
        messages,
        "Sent messages retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Mark message as read
  async markMessageAsRead(req, res, next) {
    try {
      const updated = await MessageService.markMessageAsRead(req.params.id);
      return response.success(res, updated, "Message marked as read");
    } catch (error) {
      next(error);
    }
  }

  // Delete message
  async deleteMessage(req, res, next) {
    try {
      await MessageService.deleteMessage(req.params.id);
      return response.success(res, null, "Message deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // Count unread messages
  async countUnreadMessages(req, res, next) {
    try {
      const count = await MessageService.countUnreadMessages(req.params.userId);
      return response.success(
        res,
        { total: count },
        "Unread messages counted successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Business rule: mark conversation as read
  async markConversationAsRead(req, res, next) {
    try {
      const updated = await MessageService.markConversationAsRead(
        req.params.userAId,
        req.params.userBId,
      );
      return response.success(res, updated, "Conversation marked as read");
    } catch (error) {
      next(error);
    }
  }
}

export default new MessageController();
