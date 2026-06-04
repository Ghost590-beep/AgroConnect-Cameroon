import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

console.log("USER ROUTES LOADED");

const router = express.Router();

/* ─────────────────────────────
   BASE URL (IMPORTANT FIX)
───────────────────────────── */
const BASE_URL = "http://localhost:5000";

/* ─────────────────────────────
   GET USER PROFILE
   (FIXED: returns full image URL)
───────────────────────────── */
router.get("/profile", verifyToken, (req, res) => {
  const sql = `
    SELECT id, full_name, email, phone, location, profile_image, created_at
    FROM users
    WHERE id = ?
  `;

  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      console.error("GET /profile error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];

    // ✅ FIX: always return full URL
    user.profile_image = user.profile_image
      ? `${BASE_URL}${user.profile_image}`
      : null;

    res.json(user);
  });
});

/* ─────────────────────────────
   AVATAR UPLOAD CONFIG
───────────────────────────── */
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/avatars";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `avatar_${req.user.id}_${Date.now()}${ext}`);
  },
});

const avatarUpload = multer({
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimeOk = allowed.test(file.mimetype);
    if (extOk && mimeOk) return cb(null, true);
    cb(new Error("Only JPG, PNG, or WebP images are allowed"));
  },
});

/* ─────────────────────────────
   UPDATE PROFILE
───────────────────────────── */
router.put("/profile", verifyToken, (req, res) => {
  const { full_name, phone, location } = req.body;

  if (!full_name || !phone) {
    return res.status(400).json({ message: "Name and phone are required" });
  }

  const sql = `
    UPDATE users
    SET full_name = ?, phone = ?, location = ?
    WHERE id = ?
  `;

  db.query(sql, [full_name, phone, location || "", req.user.id], (err) => {
    if (err) {
      console.error("PUT /profile error:", err);
      return res.status(500).json({ message: "Failed to update profile" });
    }

    res.json({ full_name, phone, location });
  });
});

/* ─────────────────────────────
   UPLOAD PROFILE PICTURE
   FIXED: returns full URL + safer delete
───────────────────────────── */
router.put(
  "/profile/avatar",
  verifyToken,
  avatarUpload.single("profile_image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = `/${req.file.path.replace(/\\/g, "/")}`;

    // delete old image safely
    db.query(
      "SELECT profile_image FROM users WHERE id = ?",
      [req.user.id],
      (err, rows) => {
        if (!err && rows.length > 0 && rows[0].profile_image) {
          const oldPath = rows[0].profile_image.replace(/^\//, "");
          if (fs.existsSync(oldPath)) {
            try {
              fs.unlinkSync(oldPath);
            } catch (_) {}
          }
        }
      }
    );

    db.query(
      "UPDATE users SET profile_image = ? WHERE id = ?",
      [imageUrl, req.user.id],
      (err) => {
        if (err) {
          console.error("avatar upload error:", err);
          return res.status(500).json({ message: "Upload failed" });
        }

        res.json({
          message: "Profile picture updated",
          profile_image: `${BASE_URL}${imageUrl}`, // ✅ FIX HERE
        });
      }
    );
  }
);

/* ─────────────────────────────
   GET STATS
───────────────────────────── */
router.get("/stats", verifyToken, (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM products WHERE user_id = ?) AS products_listed,
      (SELECT COUNT(*) FROM orders o JOIN products p ON o.product_id = p.id
        WHERE p.user_id = ? AND o.status = 'delivered') AS orders_completed,
      (SELECT IFNULL(ROUND(AVG(rating),1),0) FROM reviews WHERE seller_id = ?) AS rating,
      (SELECT IFNULL(SUM(o.total_amount),0)
        FROM orders o JOIN products p ON o.product_id = p.id
        WHERE p.user_id = ? AND o.status = 'delivered') AS total_earnings
  `;

  db.query(sql, [req.user.id, req.user.id, req.user.id, req.user.id], (err, result) => {
    if (err) {
      console.error("stats error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result[0]);
  });
});

/* ─────────────────────────────
   GET PRODUCTS
───────────────────────────── */
router.get("/products", verifyToken, (req, res) => {
  db.query(
    `SELECT * FROM products WHERE user_id = ? ORDER BY created_at DESC`,
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB error" });

      const products = result.map(p => ({
        ...p,
        image: p.image ? `${BASE_URL}${p.image}` : null, // ✅ FIX
      }));

      res.json(products);
    }
  );
});

/* ─────────────────────────────
   GET ORDERS
───────────────────────────── */
router.get("/orders", verifyToken, (req, res) => {
  const sql = `
    SELECT
      o.id,
      o.quantity,
      o.total_amount,
      o.status,
      o.created_at,
      p.name AS product_name,
      p.unit
    FROM orders o
    LEFT JOIN products p ON o.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      console.error("GET /orders error:", err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json(result);
  });
});

/* ─────────────────────────────
   CHANGE PASSWORD
───────────────────────────── */
router.put("/change-password", verifyToken, async (req, res) => {
  const { current_password, new_password } = req.body;

  db.query(
    "SELECT password FROM users WHERE id = ?",
    [req.user.id],
    async (err, result) => {
      if (err || result.length === 0)
        return res.status(500).json({ message: "User not found" });

      const valid = await bcrypt.compare(current_password, result[0].password);
      if (!valid)
        return res.status(401).json({ message: "Wrong password" });

      const hashed = await bcrypt.hash(new_password, 10);

      db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashed, req.user.id],
        (err2) => {
          if (err2)
            return res.status(500).json({ message: "Update failed" });

          res.json({ message: "Password updated" });
        }
      );
    }
  );
});

/* ─────────────────────────────
   NOTIFICATIONS
───────────────────────────── */
router.put("/notifications", verifyToken, (req, res) => {
  db.query(
    "UPDATE users SET notification_prefs = ? WHERE id = ?",
    [JSON.stringify(req.body), req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Failed" });
      res.json({ message: "Saved" });
    }
  );
});

/* ─────────────────────────────
   DELETE ACCOUNT
───────────────────────────── */
router.delete("/account", verifyToken, (req, res) => {
  db.query("DELETE FROM products WHERE user_id = ?", [req.user.id], () => {
    db.query("DELETE FROM orders WHERE user_id = ?", [req.user.id], () => {
      db.query("DELETE FROM users WHERE id = ?", [req.user.id], (err) => {
        if (err) return res.status(500).json({ message: "Failed" });

        res.json({ message: "Account deleted" });
      });
    });
  });
});

export default router;