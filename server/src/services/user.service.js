// src/services/user.service.js
import UserRepository from "../repositories/user.repository.js";
import UserActionsRepository from "../repositories/userActions.repository.js"; // optional if roles/actions are used

class UserService {
  // =========================
  // Register new user
  // =========================
  async register(userData) {
    // userData: { full_name, email, password, phone, location }
    const userId = await UserRepository.create(userData);

    // Optionally assign default role/action
    if (userData.role) {
      await UserActionsRepository.create(userId, userData.role);
    }

    return await UserRepository.findById(userId);
  }

  // =========================
  // Authenticate user
  // =========================
  async login(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error("Invalid credentials");
    }
    return user;
  }

  // =========================
  // Get user by ID
  // =========================
  async getUserById(userId) {
    return await UserRepository.findById(userId);
  }

  // =========================
  // Get user by email
  // =========================
  async getUserByEmail(email) {
    return await UserRepository.findByEmail(email);
  }

  // =========================
  // Update user profile
  // =========================
  async updateProfile(userId, updates) {
    return await UserRepository.updateProfile(userId, updates);
  }

  // =========================
  // Delete user account
  // =========================
  async deleteUser(userId) {
    return await UserRepository.delete(userId);
  }

  // =========================
  // Assign role/action to user
  // =========================
  async assignRole(userId, role) {
    if (!(await UserActionsRepository.hasAction(userId, role))) {
      await UserActionsRepository.create(userId, role);
    }
    return await UserActionsRepository.findByUserId(userId);
  }

  // =========================
  // Get user with roles/actions
  // =========================
  async getUserWithRoles(userId) {
    const user = await UserRepository.findById(userId);
    const roles = await UserActionsRepository.findByUserId(userId);
    return { ...user, roles };
  }
}

export default new UserService();
