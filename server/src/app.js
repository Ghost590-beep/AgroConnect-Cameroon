import express from "express";
import cors from "cors";
import dotenv from "dotenv";
 
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
 
dotenv.config();
 
console.log("APP STARTING...");
console.log("USER ROUTES IMPORTED:", userRoutes);
 
const app = express();
 
/* ─────────────────────────────
   MIDDLEWARE
───────────────────────────── */
 
// CORS (for Vite frontend)
app.use(
  cors({
    origin: true, // allows localhost:5173 automatically
    credentials: true,
  })
);
 
// Parse JSON body
app.use(express.json());
 
// Serve uploaded files (avatars, product images)
app.use("/uploads", express.static("uploads"));
 
/* ─────────────────────────────
   ROUTES
───────────────────────────── */
 
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
 
/* ─────────────────────────────
   HEALTH CHECK
───────────────────────────── */
 
app.get("/", (req, res) => {
  res.send("AgroFamily API Running 🚀");
});
 
/* ─────────────────────────────
   GLOBAL ERROR HANDLER
───────────────────────────── */
 
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    message: err.message || "Something went wrong on the server",
  });
});
 
/* ─────────────────────────────
   EXPORT APP
───────────────────────────── */
 
export default app;