// src/services/user.service.js
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import UserRepository from "../repositories/user.repository.js";
import OrderRepository from "../repositories/order.repository.js";
import ProductService from "./product.service.js";
import UserDTO from "../dto/UserDTO.js";
import AppError from "../utils/AppError.js";

const SALT_ROUNDS = 10;

/**
 * UserService (Facade)
 * - Self-service profile operations only (no admin/:id variants).
 */
class UserService {
  async getProfile(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    return UserDTO.toPublic(user);
  }

  async updateProfile(userId, { full_name, phone, location }) {
    const updated = await UserRepository.updateProfile(userId, {
      full_name,
      phone,
      location,
    });
    return UserDTO.toPublic(updated);
  }

  async uploadAvatar(userId, file) {
    if (!file) {
      throw new AppError("No file provided", 400);
    }

    const uploadPath = path.join(process.cwd(), "uploads", "avatars", file.filename);
    const buffer = await fs.readFile(uploadPath);
    const base64 = `data:${file.mimetype};base64,${buffer.toString("base64")}`;

    const updated = await UserRepository.updateProfile(userId, {
      profile_image: base64,
    });

    // Persisted into the DB above; the on-disk copy is no longer needed.
    await fs.unlink(uploadPath).catch(() => {});

    return UserDTO.toPublic(updated);
  }

  async changePassword(userId, { current_password, new_password }) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    const validPassword = await bcrypt.compare(current_password, user.password);
    if (!validPassword) {
      throw new AppError("Current password is incorrect", 401);
    }

    const hashedPassword = await bcrypt.hash(new_password, SALT_ROUNDS);
    await UserRepository.updateProfile(userId, { password: hashedPassword });
  }

  async getStats(userId) {
    const [productsListed, orders] = await Promise.all([
      ProductService.countByUser(userId),
      OrderRepository.findByUserId(userId),
    ]);

    const completedOrders = orders.filter((order) => order.status === "completed");

    return {
      products_listed: productsListed,
      // No order-creation flow exists yet (checkout is client-side only),
      // so these are honestly zero rather than faked — see seed.sql.
      orders_completed: completedOrders.length,
      total_earnings: completedOrders.reduce(
        (sum, order) => sum + Number(order.total_amount),
        0,
      ),
      rating: 0,
    };
  }

  async getProducts(userId) {
    return ProductService.getByUser(userId);
  }

  async getOrders(userId) {
    return OrderRepository.findByUserId(userId);
  }

  async saveNotifications(userId, preferences) {
    const updated = await UserRepository.updateProfile(userId, {
      notification_prefs: preferences,
    });
    return UserDTO.toPublic(updated);
  }

  async deleteAccount(userId) {
    return UserRepository.delete(userId);
  }
}

export default new UserService();
