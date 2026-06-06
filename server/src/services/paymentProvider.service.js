// src/services/paymentProvider.service.js
import PaymentProviderRepository from "../repositories/paymentProvider.repository.js";

class PaymentProviderService {
  // =========================
  // Add a new payment provider
  // =========================
  async addProvider(name, description) {
    const exists = await PaymentProviderRepository.exists(name);
    if (exists) {
      throw new Error(`Payment provider "${name}" already exists`);
    }
    const providerId = await PaymentProviderRepository.create(
      name,
      description,
    );
    return await PaymentProviderRepository.findById(providerId);
  }

  // =========================
  // Get all payment providers
  // =========================
  async getAllProviders() {
    return await PaymentProviderRepository.findAll();
  }

  // =========================
  // Get provider by ID
  // =========================
  async getProviderById(providerId) {
    const provider = await PaymentProviderRepository.findById(providerId);
    if (!provider) throw new Error("Payment provider not found");
    return provider;
  }

  // =========================
  // Get provider by name
  // =========================
  async getProviderByName(name) {
    return await PaymentProviderRepository.findByName(name);
  }

  // =========================
  // Update provider details
  // =========================
  async updateProvider(providerId, updates) {
    return await PaymentProviderRepository.update(providerId, updates);
  }

  // =========================
  // Delete provider
  // =========================
  async deleteProvider(providerId) {
    return await PaymentProviderRepository.delete(providerId);
  }

  // =========================
  // Count total providers
  // =========================
  async countProviders() {
    return await PaymentProviderRepository.count();
  }
}

export default new PaymentProviderService();
