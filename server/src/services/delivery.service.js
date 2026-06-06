// src/services/delivery.service.js
import DeliveryRepository from "../repositories/delivery.repository.js";

class DeliveryService {
  // =========================
  // Create new delivery
  // =========================
  async createDelivery(orderId, address, carrier, status = "pending") {
    const deliveryId = await DeliveryRepository.create(
      orderId,
      address,
      carrier,
      status,
    );
    return await DeliveryRepository.findById(deliveryId);
  }

  // =========================
  // Get delivery by ID
  // =========================
  async getDeliveryById(deliveryId) {
    return await DeliveryRepository.findById(deliveryId);
  }

  // =========================
  // Get delivery by order ID
  // =========================
  async getDeliveryByOrder(orderId) {
    return await DeliveryRepository.findByOrderId(orderId);
  }

  // =========================
  // Get all deliveries
  // =========================
  async getAllDeliveries() {
    return await DeliveryRepository.findAll();
  }

  // =========================
  // Update delivery details
  // =========================
  async updateDelivery(deliveryId, updates) {
    return await DeliveryRepository.update(deliveryId, updates);
  }

  // =========================
  // Update delivery status
  // =========================
  async updateDeliveryStatus(deliveryId, status) {
    return await DeliveryRepository.updateStatus(deliveryId, status);
  }

  // =========================
  // Delete delivery record
  // =========================
  async deleteDelivery(deliveryId) {
    return await DeliveryRepository.delete(deliveryId);
  }

  // =========================
  // Get deliveries by status
  // =========================
  async getDeliveriesByStatus(status) {
    return await DeliveryRepository.findByStatus(status);
  }

  // =========================
  // Get deliveries by carrier
  // =========================
  async getDeliveriesByCarrier(carrier) {
    return await DeliveryRepository.findByCarrier(carrier);
  }

  // =========================
  // Count deliveries by status
  // =========================
  async countDeliveriesByStatus(status) {
    return await DeliveryRepository.countByStatus(status);
  }

  // =========================
  // Business rule: mark delivery as completed
  // =========================
  async completeDelivery(deliveryId) {
    return await DeliveryRepository.updateStatus(deliveryId, "delivered");
  }

  // =========================
  // Business rule: cancel delivery
  // =========================
  async cancelDelivery(deliveryId) {
    return await DeliveryRepository.updateStatus(deliveryId, "cancelled");
  }
}

export default new DeliveryService();
