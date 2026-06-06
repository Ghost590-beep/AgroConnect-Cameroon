// src/controllers/user.controller.js
import UserService from "../services/user.service.js";
import UserActionsService from "../services/userActions.service.js";
import response from "../utils/response.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

class UserController {
  // =========================
  // Register new user
  // =========================
  async register(req, res, next) {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.error(res, errors.array(), "Validation failed", 400);
      }

      const { full_name, email, password, phone, location, role } = req.body;

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserService.register({
        full_name,
        email,
        password: hashedPassword,
        phone,
        location,
        role,
      });

      return response.success(res, user, "User registered successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Login user
  // =========================
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await UserService.getUserByEmail(email);
      if (!user) throw new Error("Invalid credentials");

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new Error("Invalid credentials");

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, roles: user.roles || [] },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      return response.success(res, { user, token }, "Login successful");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get user by ID
  // =========================
  async getUserById(req, res, next) {
    try {
      const user = await UserService.getUserWithRoles(req.params.id);
      if (!user) throw new Error("User not found");
      return response.success(res, user, "User retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Update user profile
  // =========================
  async updateProfile(req, res, next) {
    try {
      const updated = await UserService.updateProfile(req.params.id, req.body);
      return response.success(res, updated, "Profile updated successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Delete user
  // =========================
  async deleteUser(req, res, next) {
    try {
      await UserActionsService.removeAllActions(req.params.id);
      await UserService.deleteUser(req.params.id);
      return response.success(res, null, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Assign role/action to user
  // =========================
  async assignRole(req, res, next) {
    try {
      const { role } = req.body;
      const roles = await UserService.assignRole(req.params.id, role);
      return response.success(res, roles, "Role assigned successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get all actions for a user
  // =========================
  async getUserActions(req, res, next) {
    try {
      const actions = await UserActionsService.getUserActions(req.params.id);
      return response.success(
        res,
        actions,
        "User actions retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
