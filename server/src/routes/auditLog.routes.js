// src/routes/auditLog.routes.js
import express from "express";
import AuditLogController from "../controllers/auditLog.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import ValidationMiddleware from "../middlewares/validation.middleware.js";
import AuditLogValidator from "../validators/auditLog.validator.js";

const router = express.Router();

/**
 * Audit Log Routes
 * - OOP: Controller methods are encapsulated and exposed here.
 * - SOLID:
 *   - SRP: Routes only map endpoints to audit log controller methods.
 *   - OCP: Easily extendable with new endpoints (e.g., export logs).
 *   - DIP: Routes depend on controller abstraction, not repositories.
 */

// Create a new audit log entry (protected)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  AuditLogValidator.logAction,
  ValidationMiddleware.validate,
  AuditLogController.logAction,
);

// Get all audit logs (admin use)
router.get("/", AuthMiddleware.verifyToken, AuditLogController.getAllLogs);

// Get audit log by ID (admin use)
router.get("/:id", AuthMiddleware.verifyToken, AuditLogController.getLogById);

// Get logs by user (admin use)
router.get(
  "/user/:userId",
  AuthMiddleware.verifyToken,
  AuditLogController.getLogsByUser,
);

// Get logs by action type (admin use)
router.get(
  "/action/:action",
  AuthMiddleware.verifyToken,
  AuditLogController.getLogsByAction,
);

// Get logs by entity type (admin use)
router.get(
  "/entity/:entity",
  AuthMiddleware.verifyToken,
  AuditLogController.getLogsByEntity,
);

// Delete audit log by ID (admin use)
router.delete("/:id", AuthMiddleware.verifyToken, AuditLogController.deleteLog);

// Clear all audit logs (admin use)
router.delete(
  "/clear/all",
  AuthMiddleware.verifyToken,
  AuditLogController.clearAllLogs,
);

// Count total audit logs (admin use)
router.get(
  "/count/all",
  AuthMiddleware.verifyToken,
  AuditLogController.countLogs,
);

export default router;
