import express from "express";
import db from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

console.log("USER ROUTES LOADED");

const router = express.Router();

/* GET USER PROFILE */
router.get("/profile", verifyToken, (req, res) => {
  const sql =
    "SELECT id, full_name, email, phone, location, profile_image FROM users WHERE id = ?";

  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result[0]);
  });
});

export default router;