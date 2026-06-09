// server/src/routes/index.js
/**
 * Central route registry for AgroConnect API
 * 
 * ACTIVE ROUTES (used by frontend):
 * - /auth      (login, register, google sign-in)
 * - /user      (profile, stats, products, orders, settings)
 * - /products  (CRUD operations for products)
 */

import express from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import farmerRoutes from "./farmer.routes.js";
import productRoutes from "./product.routes.js";
import orderRoutes from "./order.routes.js";
import cartRoutes from "./cart.routes.js";
import categoryRoutes from "./category.routes.js";
import deliveryRoutes from "./delivery.routes.js";
import escrowRoutes from "./escrow.routes.js";
import favoriteRoutes from "./favorite.routes.js";
import messageRoutes from "./message.routes.js";
import notificationRoutes from "./notification.routes.js";
import paymentProviderRoutes from "./paymentProvider.routes.js";
import paymentMethodRoutes from "./paymentMethod.routes.js";
import reviewRoutes from "./review.routes.js";
import auditLogRoutes from "./auditLog.routes.js";

const router = express.Router();

// Authentication routes
router.use("/auth", authRoutes);

// User profile & account routes
router.use("/user", userRoutes);

// Product management routes
router.use("/products", productRoutes);
router.use("/farmers", farmerRoutes);
router.use("/orders", orderRoutes);
router.use("/cart", cartRoutes);
router.use("/categories", categoryRoutes);
router.use("/deliveries", deliveryRoutes);
router.use("/escrows", escrowRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/messages", messageRoutes);
router.use("/notifications", notificationRoutes);
router.use("/payment-providers", paymentProviderRoutes);
router.use("/payment-methods", paymentMethodRoutes);
router.use("/reviews", reviewRoutes);
router.use("/audit-logs", auditLogRoutes);

export default router;
