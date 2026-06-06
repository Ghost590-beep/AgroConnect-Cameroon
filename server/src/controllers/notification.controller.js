// src/controllers/notification.controller.js
import NotificationService from "../services/notification.service.js";
import response from "../utils/response.js";

/**
 * NotificationController
 * - OOP: Encapsulated in a class, exposing only public methods.
 * - SOLID:
 *   - SRP: Handles only notification-related request/response.
 *   - OCP: Can be extended with new endpoints (e.g., push notifications) without modifying existing ones.
 *   - DIP: Depends on NotificationService abstraction, not repository directly.
 */
class NotificationController {
  // Initialize preferences for a new user
  async initializePreferences(req, res, next) {
    try {
      const prefs = await NotificationService.initializePreferences(
        req.params.userId,
      );
      return response.success(
        res,
        prefs,
        "Preferences initialized successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  // Get preferences
  async getPreferences(req, res, next) {
    try {
      const prefs = await NotificationService.getPreferences(req.params.userId);
      return response.success(res, prefs, "Preferences retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Update preferences
  async updatePreferences(req, res, next) {
    try {
      const updated = await NotificationService.updatePreferences(
        req.params.userId,
        req.body,
      );
      return response.success(res, updated, "Preferences updated successfully");
    } catch (error) {
      next(error);
    }
  }

  // Enable notification type
  async enableNotification(req, res, next) {
    try {
      const result = await NotificationService.enableNotification(
        req.params.userId,
        req.body.type,
      );
      return response.success(res, result, "Notification enabled successfully");
    } catch (error) {
      next(error);
    }
  }

  // Disable notification type
  async disableNotification(req, res, next) {
    try {
      const result = await NotificationService.disableNotification(
        req.params.userId,
        req.body.type,
      );
      return response.success(
        res,
        result,
        "Notification disabled successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Send notification (business rule)
  async sendNotification(req, res, next) {
    try {
      const { type, message } = req.body;
      const result = await NotificationService.sendNotification(
        req.params.userId,
        type,
        message,
      );
      return response.success(res, result, "Notification processed");
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();
