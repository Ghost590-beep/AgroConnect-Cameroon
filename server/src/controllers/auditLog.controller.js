// src/controllers/auditLog.controller.js
import AuditLogService from "../services/auditLog.service.js";
import response from "../utils/response.js";

/**
 * AuditLogController
 * - OOP: Encapsulated in a class, exposing only public methods.
 * - SOLID:
 *   - SRP: Handles only audit log request/response logic.
 *   - OCP: Can be extended with new endpoints (e.g., export logs) without modifying existing ones.
 *   - DIP: Depends on AuditLogService abstraction, not repository directly.
 * - OOP Concepts:
 *   - Encapsulation: Internal log logic hidden in service, controller only exposes endpoints.
 *   - Polymorphism: Different methods (getLogsByUser, getLogsByEntity, logAction) provide varied behaviors but share consistent interface style.
 *   - Inheritance (future): Could extend a BaseController for shared methods like error handling.
 */
class AuditLogController {
  // Create a new audit log entry
  async logAction(req, res, next) {
    try {
      const { action, entity, entityId, details } = req.body;
      const userId = req.user.id; // from JWT middleware
      const log = await AuditLogService.logAction(
        userId,
        action,
        entity,
        entityId,
        details,
      );
      return response.success(res, log, "Action logged successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  // Get all audit logs
  async getAllLogs(req, res, next) {
    try {
      const logs = await AuditLogService.getAllLogs();
      return response.success(
        res,
        logs,
        "All audit logs retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Get audit log by ID
  async getLogById(req, res, next) {
    try {
      const log = await AuditLogService.getLogById(req.params.id);
      return response.success(res, log, "Audit log retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Get logs by user
  async getLogsByUser(req, res, next) {
    try {
      const logs = await AuditLogService.getLogsByUser(req.params.userId);
      return response.success(
        res,
        logs,
        "User audit logs retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Get logs by action type
  async getLogsByAction(req, res, next) {
    try {
      const logs = await AuditLogService.getLogsByAction(req.params.action);
      return response.success(res, logs, "Audit logs retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Get logs by entity type
  async getLogsByEntity(req, res, next) {
    try {
      const logs = await AuditLogService.getLogsByEntity(req.params.entity);
      return response.success(res, logs, "Audit logs retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Delete audit log by ID
  async deleteLog(req, res, next) {
    try {
      await AuditLogService.deleteLog(req.params.id);
      return response.success(res, null, "Audit log deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // Clear all audit logs (admin use)
  async clearAllLogs(req, res, next) {
    try {
      await AuditLogService.clearAllLogs();
      return response.success(res, null, "All audit logs cleared successfully");
    } catch (error) {
      next(error);
    }
  }

  // Count total audit logs
  async countLogs(req, res, next) {
    try {
      const count = await AuditLogService.countLogs();
      return response.success(
        res,
        { total: count },
        "Audit log count retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new AuditLogController();
