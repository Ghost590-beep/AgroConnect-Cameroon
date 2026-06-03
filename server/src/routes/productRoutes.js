import express from "express";

import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET ALL PRODUCTS */
router.get("/", getProducts);

/* CREATE PRODUCT */
router.post("/", verifyToken, createProduct);

export default router;