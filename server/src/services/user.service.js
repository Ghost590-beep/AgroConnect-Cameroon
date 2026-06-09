// src/services/user.service.js
import UserRepository from "../repositories/user.repository.js";
import UserActionsRepository from "../repositories/userActions.repository.js"; // optional if roles/actions are used
import ProductService from "./product.service.js";
import OrderService from "./order.service.js";

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
};

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
    if (!user) return null;
    const roles = await UserActionsRepository.findByUserId(userId);
    return { ...sanitizeUser(user), roles };
  }

  // =========================
  // Get user statistics
  // =========================
  async getUserStats(userId) {
    try {
      const [products, orders] = await Promise.all([
        ProductService.getProductsByUser(userId),
        OrderService.getOrdersByUser(userId),
      ]);

      return {
        products_listed: products.length,
        orders_completed: orders.filter((order) => order.status === "completed")
          .length,
        rating: 0,
        total_earnings: 0,
      };
    } catch (error) {
      throw error;
    }
  }

  // =========================
  // Get user products
  // =========================
  async getUserProducts(userId) {
    try {
      return await ProductService.getProductsByUser(userId);
    } catch (error) {
      throw error;
    }
  }

  // =========================
  // Get user orders
  // =========================
  async getUserOrders(userId) {
    try {
      return await OrderService.getOrdersByUser(userId);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
