// src/controllers/order.controller.js
import OrderService from "../services/order.service.js";
import OrderItemService from "../services/orderItem.service.js";
import response from "../utils/response.js";
import { validationResult } from "express-validator";

/**
 * OrderController
 * - OOP: Encapsulated in a class, exposing only public methods.
 * - SOLID:
 *   - SRP: Handles only request/response for orders.
 *   - OCP: Can be extended with new endpoints without modifying existing ones.
 *   - DIP: Depends on services, not repositories directly.
 */
class OrderController {
  // =========================
  // Place a new order
  // =========================
  async placeOrder(req, res, next) {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.error(res, errors.array(), "Validation failed", 400);
      }

      const { orderData, items } = req.body;
      const order = await OrderService.placeOrder(
        { ...orderData, user_id: req.user?.id },
        items,
      );
      return response.success(res, order, "Order placed successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get order by ID
  // =========================
  async getOrderById(req, res, next) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      return response.success(res, order, "Order retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get all orders for a user
  // =========================
  async getOrdersByUser(req, res, next) {
    try {
      const orders = await OrderService.getOrdersByUser(req.params.userId);
      return response.success(
        res,
        orders,
        "User orders retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Update order status
  // =========================
  async updateOrderStatus(req, res, next) {
    try {
      const updated = await OrderService.updateOrderStatus(
        req.params.id,
        req.body.status,
      );
      return response.success(
        res,
        updated,
        "Order status updated successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Update payment status
  // =========================
  async updatePaymentStatus(req, res, next) {
    try {
      const updated = await OrderService.updatePaymentStatus(
        req.params.id,
        req.body.paymentStatus,
      );
      return response.success(
        res,
        updated,
        "Payment status updated successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Cancel order
  // =========================
  async cancelOrder(req, res, next) {
    try {
      const cancelled = await OrderService.cancelOrder(req.params.id);
      return response.success(res, cancelled, "Order cancelled successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Delete order (admin use)
  // =========================
  async deleteOrder(req, res, next) {
    try {
      await OrderService.deleteOrder(req.params.id);
      return response.success(res, null, "Order deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get all orders (admin use)
  // =========================
  async getAllOrders(req, res, next) {
    try {
      const orders = await OrderService.getAllOrders();
      return response.success(res, orders, "All orders retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get orders by status
  // =========================
  async getOrdersByStatus(req, res, next) {
    try {
      const orders = await OrderService.getOrdersByStatus(req.params.status);
      return response.success(res, orders, "Orders retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get order with escrow info
  // =========================
  async getOrderWithEscrow(req, res, next) {
    try {
      const order = await OrderService.getOrderWithEscrow(req.params.id);
      return response.success(
        res,
        order,
        "Order with escrow retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Add item to an order
  // =========================
  async addOrderItem(req, res, next) {
    try {
      const { productId, quantity, price } = req.body;
      const item = await OrderItemService.addItem(
        req.params.id,
        productId,
        quantity,
        price,
      );
      return response.success(res, item, "Item added successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get items for an order
  // =========================
  async getOrderItems(req, res, next) {
    try {
      const items = await OrderItemService.getItemsByOrder(req.params.id);
      return response.success(res, items, "Order items retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Update an order item
  // =========================
  async updateOrderItem(req, res, next) {
    try {
      const updated = await OrderItemService.updateItem(
        req.params.itemId,
        req.body,
      );
      return response.success(res, updated, "Order item updated successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Delete an order item
  // =========================
  async deleteOrderItem(req, res, next) {
    try {
      await OrderItemService.deleteItem(req.params.itemId);
      return response.success(res, null, "Order item deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
