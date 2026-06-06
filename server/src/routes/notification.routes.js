// src/routes/notification.routes.js
import express from "express";
import NotificationController from "../controllers/notification.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import NotificationValidator from "../validators/notification.validator.js";

const router = express.Router();

/**
 * Notification Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to notification controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., push notifications).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Initialize preferences (protected)
router.post(
  "/:userId/init",
  AuthMiddleware.verifyToken,
  NotificationController.initializePreferences,
);

// Get preferences (protected)
router.get(
  "/:userId",
  AuthMiddleware.verifyToken,
  NotificationController.getPreferences,
);

// Update preferences (protected)
router.put(
  "/:userId",
  AuthMiddleware.verifyToken,
  NotificationValidator.updatePreferences,
  ValidationMiddleware.validate,
  NotificationController.updatePreferences,
);

// Enable notification type (protected)
router.post(
  "/:userId/enable",
  AuthMiddleware.verifyToken,
  NotificationValidator.enableNotification,
  ValidationMiddleware.validate,
  NotificationController.enableNotification,
);

// Disable notification type (protected)
router.post(
  "/:userId/disable",
  AuthMiddleware.verifyToken,
  NotificationValidator.disableNotification,
  ValidationMiddleware.validate,
  NotificationController.disableNotification,
);

// Send notification (protected, business rule)
router.post(
  "/:userId/send",
  AuthMiddleware.verifyToken,
  NotificationValidator.sendNotification,
  ValidationMiddleware.validate,
  NotificationController.sendNotification,
);

export default router;
