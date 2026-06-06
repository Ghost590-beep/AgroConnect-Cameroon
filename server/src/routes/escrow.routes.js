// src/routes/escrow.routes.js
import express from "express";
import EscrowController from "../controllers/escrow.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import EscrowValidator from "../validators/escrow.validator.js";

const router = express.Router();

/**
 * Escrow Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to escrow controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., escrow analytics).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Create escrow record (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  EscrowValidator.createEscrow,
  ValidationMiddleware.validate,
  EscrowController.createEscrow,
);

// Release funds when buyer confirms delivery (protected)
router.put(
  "/:orderId/release",
  AuthMiddleware.verifyToken,
  EscrowController.releaseFunds,
);

// Refund funds if order is cancelled (protected)
router.put(
  "/:orderId/refund",
  AuthMiddleware.verifyToken,
  EscrowController.refundFunds,
);

// Get escrow record by order ID (protected)
router.get(
  "/:orderId",
  AuthMiddleware.verifyToken,
  EscrowController.getEscrowByOrder,
);

// Get all escrow records (admin use)
router.get("/", AuthMiddleware.verifyToken, EscrowController.getAllEscrows);

// Get escrow records by status (admin use)
router.get(
  "/status/:status",
  AuthMiddleware.verifyToken,
  EscrowController.getEscrowsByStatus,
);

// Update escrow amount (protected)
router.put(
  "/:orderId/amount",
  AuthMiddleware.verifyToken,
  EscrowValidator.updateEscrowAmount,
  ValidationMiddleware.validate,
  EscrowController.updateEscrowAmount,
);

// Delete escrow record (admin use)
router.delete(
  "/:orderId",
  AuthMiddleware.verifyToken,
  EscrowController.deleteEscrow,
);

// Finalize escrow based on order status (protected)
router.put(
  "/:orderId/finalize",
  AuthMiddleware.verifyToken,
  EscrowValidator.finalizeEscrow,
  ValidationMiddleware.validate,
  EscrowController.finalizeEscrow,
);

export default router;
