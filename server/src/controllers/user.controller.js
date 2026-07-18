// src/controllers/user.controller.js
import UserService from "../services/user.service.js";
import response from "../utils/response.js";

/**
 * UserController
 * - SRP: exposes user self-service endpoints.
 * - Cleanly delegates business rules to UserService.
 */
class UserController {
  async getProfile(req, res, next) {
    try {
      const user = await UserService.getProfile(req.user.id);
      return response.success(res, user, "Profile retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const { full_name, phone, location } = req.body;
      const updated = await UserService.updateProfile(req.user.id, {
        full_name,
        phone,
        location,
      });
      return response.success(res, updated, "Profile updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async uploadAvatar(req, res, next) {
    try {
      const updated = await UserService.uploadAvatar(req.user.id, req.file);
      return response.success(res, updated, "Avatar uploaded successfully");
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { current_password, new_password } = req.body;
      await UserService.changePassword(req.user.id, {
        current_password,
        new_password,
      });
      return response.success(res, null, "Password changed successfully");
    } catch (error) {
      next(error);
    }
  }

  async getUserStats(req, res, next) {
    try {
      const stats = await UserService.getStats(req.user.id);
      return response.success(
        res,
        stats,
        "User statistics retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  async getUserProducts(req, res, next) {
    try {
      const products = await UserService.getProducts(req.user.id);
      return response.success(
        res,
        products,
        "User products retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req, res, next) {
    try {
      const orders = await UserService.getOrders(req.user.id);
      return response.success(
        res,
        orders,
        "User orders retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  async saveNotifications(req, res, next) {
    try {
      const updated = await UserService.saveNotifications(
        req.user.id,
        req.body,
      );
      return response.success(
        res,
        updated,
        "Notification preferences saved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req, res, next) {
    try {
      await UserService.deleteAccount(req.user.id);
      return response.success(res, null, "Account deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
