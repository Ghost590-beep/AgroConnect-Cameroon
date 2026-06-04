import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ─────────────────────────────
   MULTER CONFIG
───────────────────────────── */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/products";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    cb(
      null,
      `product_${Date.now()}${ext}`
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;

    const extOk = allowed.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimeOk = allowed.test(file.mimetype);

    if (extOk && mimeOk) {
      return cb(null, true);
    }

    cb(new Error("Only JPG, PNG and WebP images are allowed"));
  },
});

/* ─────────────────────────────
   GET ALL PRODUCTS
───────────────────────────── */

router.get("/", getProducts);

/* ─────────────────────────────
   CREATE PRODUCT
───────────────────────────── */

router.post(
  "/",
  verifyToken,
  upload.single("image"),
  createProduct
);

export default router;