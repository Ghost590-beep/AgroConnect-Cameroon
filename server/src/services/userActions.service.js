// src/services/userActions.service.js
import UserActionsRepository from "../repositories/userActions.repository.js";

class UserActionsService {
  // =========================
  // Assign a new action to a user
  // =========================
  async assignAction(userId, action) {
    const alreadyHas = await UserActionsRepository.hasAction(userId, action);
    if (alreadyHas) {
      throw new Error(`User already has action: ${action}`);
    }
    const actionId = await UserActionsRepository.create(userId, action);
    return await UserActionsRepository.findById(actionId);
  }

  // =========================
  // Get all actions for a user
  // =========================
  async getUserActions(userId) {
    return await UserActionsRepository.findByUserId(userId);
  }

  // =========================
  // Check if user has a specific action
  // =========================
  async hasAction(userId, action) {
    return await UserActionsRepository.hasAction(userId, action);
  }

  // =========================
  // Update a user’s action (e.g., change farmer → buyer)
  // =========================
  async updateAction(actionId, newAction) {
    return await UserActionsRepository.updateAction(actionId, newAction);
  }

  // =========================
  // Remove a specific action from a user
  // =========================
  async removeAction(userId, action) {
    return await UserActionsRepository.delete(userId, action);
  }

  // =========================
  // Remove all actions for a user (e.g., account removal)
  // =========================
  async removeAllActions(userId) {
    return await UserActionsRepository.deleteAllByUser(userId);
  }

  // =========================
  // Get all users with a specific action (e.g., all farmers)
  // =========================
  async getUsersByAction(action) {
    return await UserActionsRepository.findUsersByAction(action);
  }
}

export default new UserActionsService();
