// src/services/paymentMethod.service.js
import PaymentMethodRepository from "../repositories/paymentMethod.repository.js";

class PaymentMethodService {
  // =========================
  // Add a new payment method
  // =========================
  async addMethod(name, description) {
    const exists = await PaymentMethodRepository.exists(name);
    if (exists) {
      throw new Error(`Payment method "${name}" already exists`);
    }
    const methodId = await PaymentMethodRepository.create(name, description);
    return await PaymentMethodRepository.findById(methodId);
  }

  // =========================
  // Get all payment methods
  // =========================
  async getAllMethods() {
    return await PaymentMethodRepository.findAll();
  }

  // =========================
  // Get payment method by ID
  // =========================
  async getMethodById(methodId) {
    const method = await PaymentMethodRepository.findById(methodId);
    if (!method) throw new Error("Payment method not found");
    return method;
  }

  // =========================
  // Get payment method by name
  // =========================
  async getMethodByName(name) {
    return await PaymentMethodRepository.findByName(name);
  }

  // =========================
  // Update payment method details
  // =========================
  async updateMethod(methodId, updates) {
    return await PaymentMethodRepository.update(methodId, updates);
  }

  // =========================
  // Delete payment method
  // =========================
  async deleteMethod(methodId) {
    return await PaymentMethodRepository.delete(methodId);
  }

  // =========================
  // Count total payment methods
  // =========================
  async countMethods() {
    return await PaymentMethodRepository.count();
  }
}

export default new PaymentMethodService();
