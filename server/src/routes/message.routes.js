// src/routes/message.routes.js
import express from "express";
import MessageController from "../controllers/message.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import MessageValidator from "../validators/message.validator.js";

const router = express.Router();

/**
 * Message Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to message controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., group chat).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Send a new message (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  MessageValidator.sendMessage,
  ValidationMiddleware.validate,
  MessageController.sendMessage,
);

// Get conversation between two users (protected)
router.get(
  "/conversation/:userAId/:userBId",
  AuthMiddleware.verifyToken,
  MessageController.getConversation,
);

// Get received messages (protected)
router.get(
  "/received/:userId",
  AuthMiddleware.verifyToken,
  MessageController.getReceivedMessages,
);

// Get sent messages (protected)
router.get(
  "/sent/:userId",
  AuthMiddleware.verifyToken,
  MessageController.getSentMessages,
);

// Mark message as read (protected)
router.put(
  "/:id/read",
  AuthMiddleware.verifyToken,
  MessageController.markMessageAsRead,
);

// Delete message (protected)
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  MessageController.deleteMessage,
);

// Count unread messages (protected)
router.get(
  "/unread/:userId",
  AuthMiddleware.verifyToken,
  MessageController.countUnreadMessages,
);

// Mark conversation as read (protected)
router.put(
  "/conversation/:userAId/:userBId/read",
  AuthMiddleware.verifyToken,
  MessageController.markConversationAsRead,
);

export default router;
