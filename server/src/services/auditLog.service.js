// src/services/auditLog.service.js
import AuditLogRepository from "../repositories/auditLog.repository.js";

class AuditLogService {
  // =========================
  // Create a new audit log entry
  // =========================
  async logAction(userId, action, entity, entityId, details) {
    const logId = await AuditLogRepository.create(
      userId,
      action,
      entity,
      entityId,
      details,
    );
    return await AuditLogRepository.findById(logId);
  }

  // =========================
  // Get all audit logs
  // =========================
  async getAllLogs() {
    return await AuditLogRepository.findAll();
  }

  // =========================
  // Get audit log by ID
  // =========================
  async getLogById(logId) {
    return await AuditLogRepository.findById(logId);
  }

  // =========================
  // Get audit logs by user
  // =========================
  async getLogsByUser(userId) {
    return await AuditLogRepository.findByUserId(userId);
  }

  // =========================
  // Get audit logs by action type
  // =========================
  async getLogsByAction(action) {
    return await AuditLogRepository.findByAction(action);
  }

  // =========================
  // Get audit logs by entity type
  // =========================
  async getLogsByEntity(entity) {
    return await AuditLogRepository.findByEntity(entity);
  }

  // =========================
  // Get audit logs for a specific entity record
  // =========================
  async getLogsByEntityId(entity, entityId) {
    return await AuditLogRepository.findByEntityId(entity, entityId);
  }

  // =========================
  // Delete audit log by ID
  // =========================
  async deleteLog(logId) {
    return await AuditLogRepository.delete(logId);
  }

  // =========================
  // Clear all audit logs (admin use)
  // =========================
  async clearAllLogs() {
    return await AuditLogRepository.clearAll();
  }

  // =========================
  // Count total audit logs
  // =========================
  async countLogs() {
    return await AuditLogRepository.count();
  }

  // =========================
  // Business rule: log and return confirmation
  // =========================
  async logAndConfirm(userId, action, entity, entityId, details) {
    const log = await this.logAction(userId, action, entity, entityId, details);
    return { success: true, message: "Action logged successfully", log };
  }
}

export default new AuditLogService();
