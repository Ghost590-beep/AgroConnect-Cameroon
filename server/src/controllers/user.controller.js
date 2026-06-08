// src/controllers/user.controller.js
import UserService from "../services/user.service.js";
import UserActionsService from "../services/userActions.service.js";
import response from "../utils/response.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { validationResult } from "express-validator";
import path from "path";

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
};

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

      const token = jwt.sign(
        { id: user.id, roles: user.roles || [] },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      return response.success(
        res,
        { user: sanitizeUser(user), token },
        "User registered successfully",
        201,
      );
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

      return response.success(
        res,
        { user: sanitizeUser(user), token },
        "Login successful",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Google authentication
  // =========================
  async googleAuth(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.error(res, errors.array(), "Validation failed", 400);
      }

      const { id_token } = req.body;
      const googleClientId = process.env.GOOGLE_CLIENT_ID;
      if (!googleClientId) {
        throw new Error("Google auth is not configured on the server");
      }

      const tokenInfoResponse = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(
          id_token,
        )}`,
      );

      if (!tokenInfoResponse.ok) {
        throw new Error("Invalid Google token");
      }

      const payload = await tokenInfoResponse.json();
      const { email, name, picture, locale, email_verified } = payload;
      if (email_verified !== "true" && email_verified !== true) {
        throw new Error("Google account email is not verified");
      }

      let user = await UserService.getUserByEmail(email);
      if (!user) {
        const randomPassword = crypto.randomBytes(32).toString("hex");
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        user = await UserService.register({
          full_name: name || email.split("@")[0],
          email,
          password: hashedPassword,
          phone: null,
          location: locale || "Cameroon",
          profile_image: picture || null,
          role: "buyer",
        });
      }

      const token = jwt.sign(
        { id: user.id, roles: user.roles || [] },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      return response.success(
        res,
        { user: sanitizeUser(user), token },
        "Google sign-in successful",
      );
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
      return response.success(
        res,
        sanitizeUser(user),
        "User retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get user profile (from token)
  // =========================
  async getProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await UserService.getUserWithRoles(userId);
      if (!user) throw new Error("User not found");
      return response.success(
        res,
        sanitizeUser(user),
        "Profile retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Update user profile (from token)
  // =========================
  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const { full_name, phone, location } = req.body;

      const updated = await UserService.updateProfile(userId, {
        full_name,
        phone,
        location,
      });

      return response.success(
        res,
        sanitizeUser(updated),
        "Profile updated successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Upload user avatar
  // =========================
  async uploadAvatar(req, res, next) {
    try {
      const userId = req.user.id;

      if (!req.file) {
        return response.error(res, null, "No file provided", 400);
      }

      // Read the saved file and store its base64 data in DB
      const uploadPath = path.join(
        process.cwd(),
        "uploads",
        "avatars",
        req.file.filename,
      );
      try {
        const fileBuffer = await fs.readFile(uploadPath);
        const base64 = `data:${req.file.mimetype};base64,${fileBuffer.toString("base64")}`;

        // Update user profile with base64 image
        const updated = await UserService.updateProfile(userId, {
          profile_image: base64,
        });

        // Optionally remove file from disk since we persisted image in DB
        await fs.unlink(uploadPath).catch(() => {});

        return response.success(
          res,
          sanitizeUser(updated),
          "Avatar uploaded successfully",
        );
      } catch (fsErr) {
        // Fallback: store URL if reading failed
        const avatarUrl = `/uploads/avatars/${req.file.filename}`;
        const updated = await UserService.updateProfile(userId, {
          profile_image: avatarUrl,
        });
        return response.success(
          res,
          sanitizeUser(updated),
          "Avatar uploaded (file stored on disk)",
        );
      }
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Change user password
  // =========================
  async changePassword(req, res, next) {
    try {
      const userId = req.user.id;
      const { current_password, new_password } = req.body;

      // Get user with password hash
      const user = await UserService.getUserById(userId);
      if (!user) throw new Error("User not found");

      // Verify current password
      const validPassword = await bcrypt.compare(
        current_password,
        user.password,
      );
      if (!validPassword) throw new Error("Current password is incorrect");

      // Hash new password and update
      const hashedPassword = await bcrypt.hash(new_password, 10);
      await UserService.updateProfile(userId, { password: hashedPassword });

      return response.success(res, null, "Password changed successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get user statistics
  // =========================
  async getUserStats(req, res, next) {
    try {
      const userId = req.user.id;
      const stats = await UserService.getUserStats(userId);
      return response.success(
        res,
        stats,
        "User statistics retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get user products
  // =========================
  async getUserProducts(req, res, next) {
    try {
      const userId = req.user.id;
      const products = await UserService.getUserProducts(userId);
      return response.success(
        res,
        products,
        "User products retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get user orders
  // =========================
  async getUserOrders(req, res, next) {
    try {
      const userId = req.user.id;
      const orders = await UserService.getUserOrders(userId);
      return response.success(
        res,
        orders,
        "User orders retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Save notification preferences
  // =========================
  async saveNotifications(req, res, next) {
    try {
      const userId = req.user.id;
      const preferences = req.body;

      const updated = await UserService.updateProfile(userId, {
        notification_preferences: preferences,
      });

      return response.success(
        res,
        sanitizeUser(updated),
        "Notification preferences saved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Delete user account
  // =========================
  async deleteAccount(req, res, next) {
    try {
      const userId = req.user.id;

      await UserActionsService.removeAllActions(userId);
      await UserService.deleteUser(userId);

      return response.success(res, null, "Account deleted successfully");
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
