// src/services/order.service.js
import OrderRepository from "../repositories/order.repository.js";
import OrderItemRepository from "../repositories/orderItem.repository.js";
import EscrowRepository from "../repositories/escrow.repository.js";
import DeliveryRepository from "../repositories/delivery.repository.js";
import ProductRepository from "../repositories/product.repository.js";

class OrderService {
  // =========================
  // Place a new order with items
  // =========================
  async placeOrder(orderData, items) {
    const buyerId = orderData.user_id;
    if (!buyerId) {
      throw new Error("Order must include a valid buyer");
    }

    // Prevent buyers from ordering their own products
    for (const item of items) {
      const product = await ProductRepository.findById(item.product_id);
      if (!product) {
        throw new Error(`Product with ID ${item.product_id} not found`);
      }
      if (product.user_id === buyerId) {
        const error = new Error("Cannot purchase your own product");
        error.status = 403;
        throw error;
      }
    }

    // Create order
    const orderId = await OrderRepository.create(orderData);

    // Add items
    for (const item of items) {
      await OrderRepository.addOrderItem(orderId, item);
    }

    // Calculate total
    const total = await OrderItemRepository.calculateTotal(orderId);

    // Update order total
    const order = await OrderRepository.findById(orderId);
    order.total_price = total;

    // Create escrow account for payment
    await EscrowRepository.create(orderId, total);

    // Create delivery record
    await DeliveryRepository.create(
      orderId,
      orderData.delivery_location,
      "Local Courier",
      "pending",
    );

    return await OrderRepository.findById(orderId);
  }

  // =========================
  // Get order by ID (with items & escrow)
  // =========================
  async getOrderById(orderId) {
    const order = await OrderRepository.findById(orderId);
    if (!order) throw new Error("Order not found");

    const items = await OrderRepository.findItemsByOrderId(orderId);
    const escrow = await EscrowRepository.findByOrderId(orderId);
    const delivery = await DeliveryRepository.findByOrderId(orderId);

    return { ...order, items, escrow, delivery };
  }

  // =========================
  // Get all orders for a user
  // =========================
  async getOrdersByUser(userId) {
    return await OrderRepository.findByUserId(userId);
  }

  // =========================
  // Update order status
  // =========================
  async updateOrderStatus(orderId, status) {
    return await OrderRepository.updateStatus(orderId, status);
  }

  // =========================
  // Update payment status
  // =========================
  async updatePaymentStatus(orderId, paymentStatus) {
    const order = await OrderRepository.updatePaymentStatus(
      orderId,
      paymentStatus,
    );

    // Release escrow if payment confirmed
    if (paymentStatus === "paid") {
      await EscrowRepository.release(orderId);
    }

    return order;
  }

  // =========================
  // Cancel order
  // =========================
  async cancelOrder(orderId) {
    await EscrowRepository.refund(orderId);
    await DeliveryRepository.updateStatus(orderId, "cancelled");
    return await OrderRepository.updateStatus(orderId, "cancelled");
  }

  // =========================
  // Delete order (admin use)
  // =========================
  async deleteOrder(orderId) {
    await OrderItemRepository.deleteByOrderId(orderId);
    await EscrowRepository.deleteByOrderId(orderId);
    await DeliveryRepository.delete(orderId);
    return await OrderRepository.delete(orderId);
  }

  // =========================
  // Get all orders (admin use)
  // =========================
  async getAllOrders() {
    return await OrderRepository.findAll();
  }

  // =========================
  // Get orders by status
  // =========================
  async getOrdersByStatus(status) {
    return await OrderRepository.findByStatus(status);
  }

  // =========================
  // Get order with escrow info
  // =========================
  async getOrderWithEscrow(orderId) {
    return await OrderRepository.findWithEscrow(orderId);
  }
}

export default new OrderService();
