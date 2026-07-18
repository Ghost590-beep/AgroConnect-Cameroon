// src/routes/user.routes.js
import express from "express";
import UserController from "../controllers/user.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import UserValidator from "../validators/user.validator.js";
import upload from "../config/multer.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Self-service profile management (all routes require a bearer token)
 */

router.use(AuthMiddleware.verifyToken);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     tags: [User]
 *     summary: Get the current user's profile
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Profile retrieved successfully }
 *   put:
 *     tags: [User]
 *     summary: Update the current user's profile
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Profile updated successfully }
 */
router.get("/profile", asyncHandler(UserController.getProfile));
router.put(
  "/profile",
  UserValidator.updateProfile,
  ValidationMiddleware.validate,
  asyncHandler(UserController.updateProfile),
);

/**
 * @swagger
 * /api/user/profile/avatar:
 *   put:
 *     tags: [User]
 *     summary: Upload a profile avatar
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_image: { type: string, format: binary }
 *     responses:
 *       200: { description: Avatar uploaded successfully }
 */
router.put(
  "/profile/avatar",
  upload.single("profile_image"),
  asyncHandler(UserController.uploadAvatar),
);

/**
 * @swagger
 * /api/user/change-password:
 *   post:
 *     tags: [User]
 *     summary: Change the current user's password
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Password changed successfully }
 *       401: { description: Current password is incorrect }
 */
router.post(
  "/change-password",
  UserValidator.changePassword,
  ValidationMiddleware.validate,
  asyncHandler(UserController.changePassword),
);

/**
 * @swagger
 * /api/user/stats:
 *   get:
 *     tags: [User]
 *     summary: Get the current user's stats (products listed, orders completed, rating, earnings)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Stats retrieved successfully }
 */
router.get("/stats", asyncHandler(UserController.getUserStats));

/**
 * @swagger
 * /api/user/products:
 *   get:
 *     tags: [User]
 *     summary: Get the current user's own products (includes drafts)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Products retrieved successfully }
 */
router.get("/products", asyncHandler(UserController.getUserProducts));

/**
 * @swagger
 * /api/user/orders:
 *   get:
 *     tags: [User]
 *     summary: Get the current user's order history
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Orders retrieved successfully }
 */
router.get("/orders", asyncHandler(UserController.getUserOrders));

/**
 * @swagger
 * /api/user/notifications:
 *   post:
 *     tags: [User]
 *     summary: Save notification preferences
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orders: { type: boolean }
 *               promotions: { type: boolean }
 *               newsletter: { type: boolean }
 *               sms: { type: boolean }
 *     responses:
 *       200: { description: Preferences saved successfully }
 */
router.post(
  "/notifications",
  UserValidator.notifications,
  ValidationMiddleware.validate,
  asyncHandler(UserController.saveNotifications),
);

/**
 * @swagger
 * /api/user/account:
 *   delete:
 *     tags: [User]
 *     summary: Delete the current user's account
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Account deleted successfully }
 */
router.delete("/account", asyncHandler(UserController.deleteAccount));

export default router;
