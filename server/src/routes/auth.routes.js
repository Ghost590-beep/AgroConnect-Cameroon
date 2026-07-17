// src/routes/auth.routes.js
import express from "express";
import AuthController from "../controllers/auth.controller.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import AuthValidator from "../validators/auth.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Registration and sign-in
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [full_name, email, password, phone]
 *             properties:
 *               full_name: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string }
 *               phone: { type: string }
 *               location: { type: string }
 *     responses:
 *       201: { description: User registered successfully }
 *       400: { description: Validation failed }
 *       409: { description: Email already registered }
 */
router.post(
  "/register",
  AuthValidator.register,
  ValidationMiddleware.validate,
  AuthController.register,
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login successful }
 *       401: { description: Invalid credentials }
 */
router.post(
  "/login",
  AuthValidator.login,
  ValidationMiddleware.validate,
  AuthController.login,
);

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     tags: [Auth]
 *     summary: Sign in or register with a Google ID token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_token]
 *             properties:
 *               id_token: { type: string }
 *     responses:
 *       200: { description: Google sign-in successful }
 *       401: { description: Invalid Google token }
 */
router.post(
  "/google",
  AuthValidator.googleAuth,
  ValidationMiddleware.validate,
  AuthController.googleAuth,
);

export default router;
