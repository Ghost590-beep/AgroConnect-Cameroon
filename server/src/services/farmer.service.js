// src/services/farmer.service.js
import FarmerRepository from "../repositories/farmer.repository.js";
import ProductRepository from "../repositories/product.repository.js";

class FarmerService {
  // =========================
  // Create a new farmer profile
  // =========================
  async createFarmer(userId, farmName, location, description) {
    // Prevent duplicate farmer profile for same user
    const existing = await FarmerRepository.findByUserId(userId);
    if (existing) {
      throw new Error("Farmer profile already exists for this user");
    }
    const farmerId = await FarmerRepository.create(
      userId,
      farmName,
      location,
      description,
    );
    return await FarmerRepository.findById(farmerId);
  }

  // =========================
  // Get farmer profile by ID
  // =========================
  async getFarmerById(farmerId) {
    const farmer = await FarmerRepository.findById(farmerId);
    if (!farmer) {
      const error = new Error("Farmer not found");
      error.status = 404;
      throw error;
    }
    return farmer;
  }

  // =========================
  // Get farmer profile by user ID
  // =========================
  async getFarmerByUserId(userId) {
    return await FarmerRepository.findByUserId(userId);
  }

  // =========================
  // Get all farmers
  // =========================
  async getAllFarmers() {
    return await FarmerRepository.findAll();
  }

  // =========================
  // Update farmer profile
  // =========================
  async updateFarmer(farmerId, updates) {
    return await FarmerRepository.update(farmerId, updates);
  }

  // =========================
  // Delete farmer profile
  // =========================
  async deleteFarmer(farmerId) {
    // Optional cleanup: delete linked products
    const products = await FarmerRepository.findProducts(farmerId);
    for (const product of products) {
      await ProductRepository.delete(product.id);
    }
    return await FarmerRepository.delete(farmerId);
  }

  // =========================
  // Get all products linked to a farmer
  // =========================
  async getFarmerProducts(farmerId) {
    return await FarmerRepository.findProducts(farmerId);
  }

  // =========================
  // Get farmers by location
  // =========================
  async getFarmersByLocation(location) {
    return await FarmerRepository.findByLocation(location);
  }

  // =========================
  // Count total farmers
  // =========================
  async countFarmers() {
    return await FarmerRepository.count();
  }

  // =========================
  // Business rule: assign farmer role to user if profile created
  // =========================
  async assignFarmerRole(
    userId,
    farmName,
    location,
    description,
    UserActionsRepository,
  ) {
    const farmer = await this.createFarmer(
      userId,
      farmName,
      location,
      description,
    );
    await UserActionsRepository.create(userId, "farmer");
    return farmer;
  }
}

export default new FarmerService();
