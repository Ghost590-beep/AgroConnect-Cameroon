// src/routes/auth.routes.js
import express from "express";
import UserController from "../controllers/user.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import UserValidator from "../validators/user.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and user account management
 */

/**
 * User Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to controller methods.
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - password
 *               - phone
 *               - location
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               location:
 *                 type: string
 *             example:
 *               full_name: Jane Doe
 *               email: jane@example.com
 *               password: strongpass123
 *               phone: "+237123456789"
 *               location: Yaounde
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation failed
 */
// Register new user
router.post(
  "/register",
  UserValidator.register,
  ValidationMiddleware.validate,
  UserController.register,
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             example:
 *               email: jane@example.com
 *               password: strongpass123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation failed or invalid credentials
 */
// Login user
router.post(
  "/login",
  UserValidator.login,
  ValidationMiddleware.validate,
  UserController.login,
);

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign in or register with Google
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_token
 *             properties:
 *               id_token:
 *                 type: string
 *             example:
 *               id_token: "YOUR_GOOGLE_ID_TOKEN"
 *     responses:
 *       200:
 *         description: Google sign-in successful
 *       400:
 *         description: Validation failed or invalid token
 */
router.post(
  "/google",
  UserValidator.googleAuth,
  ValidationMiddleware.validate,
  UserController.googleAuth,
);

/**
 * @swagger
 * /api/auth/{id}:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
// Get user by ID (protected)
router.get("/:id", AuthMiddleware.verifyToken, UserController.getUserById);

// Update user profile (protected)
/**
 * @swagger
 * /api/auth/{id}/profile:
 *   put:
 *     tags:
 *       - Auth
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation failed
 */
router.put(
  "/:id/profile",
  AuthMiddleware.verifyToken,
  UserValidator.updateProfile,
  ValidationMiddleware.validate,
  UserController.updateProfile,
);

// Delete user (protected)
router.delete("/:id", AuthMiddleware.verifyToken, UserController.deleteUser);

// Assign role/action to user (protected)
router.post(
  "/:id/actions",
  AuthMiddleware.verifyToken,
  UserValidator.assignRole,
  ValidationMiddleware.validate,
  UserController.assignRole,
);

// Get all actions for a user (protected)
router.get(
  "/:id/actions",
  AuthMiddleware.verifyToken,
  UserController.getUserActions,
);

export default router;
