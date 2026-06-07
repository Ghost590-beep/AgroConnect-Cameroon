// src/routes/user.routes.js
import express from "express";
import UserController from "../controllers/user.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";

const router = express.Router();

/**
 * User Profile Routes
 * Protected routes - require valid JWT token
 */

// Get user profile
router.get(
  "/profile",
  AuthMiddleware.verifyToken,
  UserController.getProfile
);

// Update user profile
router.put(
  "/profile",
  AuthMiddleware.verifyToken,
  UserController.updateProfile
);

// Upload user avatar
router.put(
  "/profile/avatar",
  AuthMiddleware.verifyToken,
  upload.single('profile_image'),
  UserController.uploadAvatar
);

// Change user password
router.post(
  "/change-password",
  AuthMiddleware.verifyToken,
  UserController.changePassword
);

// Get user statistics
router.get(
  "/stats",
  AuthMiddleware.verifyToken,
  UserController.getUserStats
);

// Get user products
router.get(
  "/products",
  AuthMiddleware.verifyToken,
  UserController.getUserProducts
);

// Get user orders
router.get(
  "/orders",
  AuthMiddleware.verifyToken,
  UserController.getUserOrders
);

// Save notification preferences
router.post(
  "/notifications",
  AuthMiddleware.verifyToken,
  UserController.saveNotifications
);

// Delete user account (protected)
router.delete(
  "/account",
  AuthMiddleware.verifyToken,
  UserController.deleteAccount
);

export default router;
