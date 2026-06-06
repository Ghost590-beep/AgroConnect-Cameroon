// src/services/escrow.service.js
import EscrowRepository from "../repositories/escrow.repository.js";

class EscrowService {
  // =========================
  // Create escrow record for an order
  // =========================
  async createEscrow(orderId, amount) {
    const escrowId = await EscrowRepository.create(orderId, amount);
    return await EscrowRepository.findByOrderId(orderId);
  }

  // =========================
  // Release funds when buyer confirms delivery
  // =========================
  async releaseFunds(orderId) {
    return await EscrowRepository.release(orderId);
  }

  // =========================
  // Refund funds if order is cancelled
  // =========================
  async refundFunds(orderId) {
    return await EscrowRepository.refund(orderId);
  }

  // =========================
  // Get escrow record by order ID
  // =========================
  async getEscrowByOrder(orderId) {
    return await EscrowRepository.findByOrderId(orderId);
  }

  // =========================
  // Get all escrow records (admin use)
  // =========================
  async getAllEscrows() {
    return await EscrowRepository.findAll();
  }

  // =========================
  // Get escrow records by status
  // =========================
  async getEscrowsByStatus(status) {
    return await EscrowRepository.findByStatus(status);
  }

  // =========================
  // Update escrow amount (partial refund or adjustment)
  // =========================
  async updateEscrowAmount(orderId, newAmount) {
    return await EscrowRepository.updateAmount(orderId, newAmount);
  }

  // =========================
  // Delete escrow record (cleanup after order deletion)
  // =========================
  async deleteEscrow(orderId) {
    return await EscrowRepository.delete(orderId);
  }

  // =========================
  // Business rule: finalize escrow based on order status
  // =========================
  async finalizeEscrow(orderId, orderStatus) {
    if (orderStatus === "delivered") {
      return await this.releaseFunds(orderId);
    }
    if (orderStatus === "cancelled") {
      return await this.refundFunds(orderId);
    }
    return await this.getEscrowByOrder(orderId);
  }
}

export default new EscrowService();
