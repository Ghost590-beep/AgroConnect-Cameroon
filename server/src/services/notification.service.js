// src/services/notification.service.js
import NotificationRepository from "../repositories/notification.repository.js";

class NotificationService {
  // =========================
  // Initialize default preferences for a new user
  // =========================
  async initializePreferences(userId) {
    const existing = await NotificationRepository.getByUserId(userId);
    if (existing) {
      throw new Error("Notification preferences already exist for this user");
    }
    const prefId = await NotificationRepository.createForUser(userId);
    return await NotificationRepository.getByUserId(userId);
  }

  // =========================
  // Get preferences for a user
  // =========================
  async getPreferences(userId) {
    return await NotificationRepository.getByUserId(userId);
  }

  // =========================
  // Update preferences for a user
  // =========================
  async updatePreferences(userId, prefs) {
    return await NotificationRepository.updatePreferences(userId, prefs);
  }

  // =========================
  // Enable a specific notification type
  // =========================
  async enableNotification(userId, type) {
    return await NotificationRepository.enableNotification(userId, type);
  }

  // =========================
  // Disable a specific notification type
  // =========================
  async disableNotification(userId, type) {
    return await NotificationRepository.disableNotification(userId, type);
  }

  // =========================
  // Delete preferences for a user (cleanup on account deletion)
  // =========================
  async deletePreferences(userId) {
    return await NotificationRepository.deleteByUserId(userId);
  }

  // =========================
  // Get all users subscribed to a specific notification type
  // =========================
  async getUsersByPreference(type) {
    return await NotificationRepository.getUsersByPreference(type);
  }

  // =========================
  // Business rule: send notification if user has enabled it
  // =========================
  async sendNotification(userId, type, message) {
    const prefs = await NotificationRepository.getByUserId(userId);
    if (!prefs || !prefs[type]) {
      return {
        success: false,
        message: "User has disabled this notification type",
      };
    }

    // Here you would integrate with actual notification delivery (email, SMS, push)
    return {
      success: true,
      message: `Notification sent to user ${userId}: ${message}`,
    };
  }
}

export default new NotificationService();
