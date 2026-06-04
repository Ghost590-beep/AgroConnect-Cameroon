import bcrypt from "bcryptjs";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

/* ─────────────────────────────────────────────
   REGISTER USER
───────────────────────────────────────────── */
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error during user check",
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
        INSERT INTO users (full_name, email, password, phone)
        VALUES (?, ?, ?, ?)
      `;

      db.query(
        sql,
        [fullName, email, hashedPassword, phone],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Error creating user",
            });
          }

          // OPTIONAL: auto-login token after registration
          const token = jwt.sign(
            { id: result.insertId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );

          res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
              id: result.insertId,
              fullName,
              email,
              phone,
            },
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

/* ─────────────────────────────────────────────
   LOGIN USER
───────────────────────────────────────────── */
export const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      // Check password
      const validPassword = await bcrypt.compare(
        password,
        user.password
      );

      if (!validPassword) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          phone: user.phone,
          location: user.location || "",
          profileImage: user.profile_image || "",
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};