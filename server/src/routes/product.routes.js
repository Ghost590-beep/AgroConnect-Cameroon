// src/routes/product.routes.js
import express from "express";
import ProductController from "../controllers/product.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import ProductValidator from "../validators/product.validator.js";
import upload from "../config/multer.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product catalog
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: List all active (non-draft) products
 *     responses:
 *       200: { description: List of products }
 *   post:
 *     tags: [Products]
 *     summary: Create a product
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               category: { type: string }
 *               subcategory: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               stock_quantity: { type: integer }
 *               unit: { type: string }
 *               min_order: { type: integer }
 *               location: { type: string }
 *               status: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201: { description: Product created successfully }
 *       400: { description: Validation failed }
 */
router.get("/", asyncHandler(ProductController.getAllProducts));
router.post(
  "/",
  AuthMiddleware.verifyToken,
  upload.single("image"),
  ProductValidator.addProduct,
  ValidationMiddleware.validate,
  asyncHandler(ProductController.addProduct),
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product details by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Product retrieved successfully }
 *       404: { description: Product not found }
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product you own
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Product deleted successfully }
 *       403: { description: Not the owner of this product }
 *       404: { description: Product not found }
 */
router.get("/:id", asyncHandler(ProductController.getProductById));
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  asyncHandler(ProductController.deleteProduct),
);

export default router;
