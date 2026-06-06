// src/validators/notification.validator.js
import { body } from "express-validator";

/**
 * Notification Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for notifications.
 *   - OCP: Easily extendable with new rules (e.g., push notification payloads).
 */
class NotificationValidator {
  static updatePreferences = [
    body("receives_order_notifications").isBoolean().optional(),
    body("receives_promotion_notifications").isBoolean().optional(),
    body("receives_newsletter").isBoolean().optional(),
    body("receives_sms_notifications").isBoolean().optional(),
  ];

  static enableNotification = [
    body("type").notEmpty().withMessage("Notification type is required"),
  ];

  static disableNotification = [
    body("type").notEmpty().withMessage("Notification type is required"),
  ];

  static sendNotification = [
    body("type").notEmpty().withMessage("Notification type is required"),
    body("message")
      .isLength({ min: 3 })
      .withMessage("Message must be at least 3 characters"),
  ];
}

export default NotificationValidator;
