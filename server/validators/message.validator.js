// src/validators/message.validator.js
import { body } from "express-validator";

/**
 * Message Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for messages.
 *   - OCP: Easily extendable with new rules (e.g., attachments).
 */
class MessageValidator {
  static sendMessage = [
    body("receiverId").isInt().withMessage("Receiver ID must be an integer"),
    body("content")
      .isLength({ min: 1 })
      .withMessage("Message content cannot be empty"),
  ];
}

export default MessageValidator;
