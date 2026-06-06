// src/controllers/escrow.controller.js
import EscrowService from "../services/escrow.service.js";
import response from "../utils/response.js";

/**
 * EscrowController
 * - OOP: Encapsulated in a class, exposing only public methods.
 * - SOLID:
 *   - SRP: Handles only escrow-related request/response logic.
 *   - OCP: Can be extended with new endpoints (e.g., escrow analytics) without modifying existing ones.
 *   - DIP: Depends on EscrowService abstraction, not repository directly.
 * - OOP Concepts:
 *   - Encapsulation: Internal escrow logic hidden in service, controller only exposes endpoints.
 *   - Polymorphism: Different methods (releaseFunds, refundFunds, finalizeEscrow) provide varied behaviors but share consistent interface style.
 *   - Inheritance (future): Could extend a BaseController for shared methods like error handling.
 */
class EscrowController {
  // =========================
  // Create escrow record for an order
  // =========================
  async createEscrow(req, res, next) {
    try {
      const { orderId, amount } = req.body;
      const escrow = await EscrowService.createEscrow(orderId, amount);
      return response.success(res, escrow, "Escrow created successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Release funds when buyer confirms delivery
  // =========================
  async releaseFunds(req, res, next) {
    try {
      const escrow = await EscrowService.releaseFunds(req.params.orderId);
      return response.success(res, escrow, "Funds released to seller");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Refund funds if order is cancelled
  // =========================
  async refundFunds(req, res, next) {
    try {
      const escrow = await EscrowService.refundFunds(req.params.orderId);
      return response.success(res, escrow, "Funds refunded to buyer");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get escrow record by order ID
  // =========================
  async getEscrowByOrder(req, res, next) {
    try {
      const escrow = await EscrowService.getEscrowByOrder(req.params.orderId);
      return response.success(
        res,
        escrow,
        "Escrow record retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get all escrow records (admin use)
  // =========================
  async getAllEscrows(req, res, next) {
    try {
      const escrows = await EscrowService.getAllEscrows();
      return response.success(
        res,
        escrows,
        "All escrow records retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get escrow records by status
  // =========================
  async getEscrowsByStatus(req, res, next) {
    try {
      const escrows = await EscrowService.getEscrowsByStatus(req.params.status);
      return response.success(
        res,
        escrows,
        "Escrow records retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Update escrow amount (partial refund or adjustment)
  // =========================
  async updateEscrowAmount(req, res, next) {
    try {
      const updated = await EscrowService.updateEscrowAmount(
        req.params.orderId,
        req.body.newAmount,
      );
      return response.success(
        res,
        updated,
        "Escrow amount updated successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Delete escrow record (cleanup after order deletion)
  // =========================
  async deleteEscrow(req, res, next) {
    try {
      await EscrowService.deleteEscrow(req.params.orderId);
      return response.success(res, null, "Escrow record deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Business rule: finalize escrow based on order status
  // =========================
  async finalizeEscrow(req, res, next) {
    try {
      const { orderStatus } = req.body;
      const result = await EscrowService.finalizeEscrow(
        req.params.orderId,
        orderStatus,
      );
      return response.success(res, result, "Escrow finalized successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new EscrowController();
