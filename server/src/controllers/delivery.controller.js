// src/controllers/delivery.controller.js
import DeliveryService from "../services/delivery.service.js";
import response from "../utils/response.js";

/**
 * DeliveryController
 * - OOP: Encapsulated in a class, exposing only public methods.
 * - SOLID:
 *   - SRP: Handles only delivery-related request/response logic.
 *   - OCP: Can be extended with new endpoints (e.g., delivery tracking) without modifying existing ones.
 *   - DIP: Depends on DeliveryService abstraction, not repository directly.
 * - OOP Concepts:
 *   - Encapsulation: Internal delivery logic hidden in service, controller only exposes endpoints.
 *   - Polymorphism: Different methods (createDelivery, updateDeliveryStatus, cancelDelivery) provide varied behaviors but share consistent interface style.
 */
class DeliveryController {
  // Create new delivery
  async createDelivery(req, res, next) {
    try {
      const { orderId, address, carrier } = req.body;
      const delivery = await DeliveryService.createDelivery(
        orderId,
        address,
        carrier,
      );
      return response.success(
        res,
        delivery,
        "Delivery created successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  // Get delivery by ID
  async getDeliveryById(req, res, next) {
    try {
      const delivery = await DeliveryService.getDeliveryById(req.params.id);
      return response.success(res, delivery, "Delivery retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Get delivery by order ID
  async getDeliveryByOrder(req, res, next) {
    try {
      const delivery = await DeliveryService.getDeliveryByOrder(
        req.params.orderId,
      );
      return response.success(res, delivery, "Delivery retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Update delivery details
  async updateDelivery(req, res, next) {
    try {
      const updated = await DeliveryService.updateDelivery(
        req.params.id,
        req.body,
      );
      return response.success(res, updated, "Delivery updated successfully");
    } catch (error) {
      next(error);
    }
  }

  // Update delivery status
  async updateDeliveryStatus(req, res, next) {
    try {
      const updated = await DeliveryService.updateDeliveryStatus(
        req.params.id,
        req.body.status,
      );
      return response.success(
        res,
        updated,
        "Delivery status updated successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Business rule: complete delivery
  async completeDelivery(req, res, next) {
    try {
      const result = await DeliveryService.completeDelivery(req.params.id);
      return response.success(res, result, "Delivery marked as completed");
    } catch (error) {
      next(error);
    }
  }

  // Business rule: cancel delivery
  async cancelDelivery(req, res, next) {
    try {
      const result = await DeliveryService.cancelDelivery(req.params.id);
      return response.success(res, result, "Delivery cancelled successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new DeliveryController();
