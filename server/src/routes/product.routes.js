// src/routes/product.routes.js
import express from "express";
import ProductController from "../controllers/product.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import ProductValidator from "../validators/product.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product catalog and management
 */

/**
 * Product Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., product analytics).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Add a new product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: integer
 *               description:
 *                 type: string
 *             example:
 *               name: Cocoa Beans
 *               price: 1500
 *               categoryId: 1
 *               description: Premium cocoa beans from the west region.
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Validation failed
 */
// Add new product (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  ProductValidator.addProduct,
  ValidationMiddleware.validate,
  ProductController.addProduct,
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product details by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */
// Get product by ID (with images & reviews)
router.get("/:id", ProductController.getProductById);

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: List all products
 *     responses:
 *       200:
 *         description: List of products
 */
// Get all products
router.get("/", ProductController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation failed
 */
// Update product (protected)
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  ProductValidator.updateProduct,
  ValidationMiddleware.validate,
  ProductController.updateProduct,
);

// Search products
router.get("/search", ProductController.searchProducts);

// Delete product (protected)
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  ProductController.deleteProduct,
);

// Add image to product (protected)
router.post(
  "/:id/images",
  AuthMiddleware.verifyToken,
  ProductValidator.addProductImage,
  ValidationMiddleware.validate,
  ProductController.addProductImage,
);

// Delete product image (protected)
router.delete(
  "/:id/images/:imageId",
  AuthMiddleware.verifyToken,
  ProductController.deleteProductImage,
);

// Get product images
router.get("/:id/images", ProductController.getProductImages);

export default router;
