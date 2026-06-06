// src/controllers/farmer.controller.js
import FarmerService from "../services/farmer.service.js";
import response from "../utils/response.js";

/**
 * FarmerController
 * - OOP: Encapsulated in a class, exposing only public methods.
 * - SOLID:
 *   - SRP: Handles only farmer-related request/response.
 *   - OCP: Can be extended with new endpoints (e.g., farmer analytics) without modifying existing ones.
 *   - DIP: Depends on FarmerService abstraction, not repository directly.
 * - OOP Concepts:
 *   - Encapsulation: Internal logic hidden in service, controller only exposes endpoints.
 *   - Polymorphism: Different methods (createFarmer, updateFarmer, deleteFarmer) provide varied behaviors but share consistent interface style.
 *   - Inheritance (future): Could extend a BaseController for shared methods like error handling.
 */
class FarmerController {
  // Create farmer profile
  async createFarmer(req, res, next) {
    try {
      const { farmName, location, description } = req.body;
      const userId = req.user.id;
      const farmer = await FarmerService.createFarmer(
        userId,
        farmName,
        location,
        description,
      );
      return response.success(
        res,
        farmer,
        "Farmer profile created successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  // Get farmer by ID
  async getFarmerById(req, res, next) {
    try {
      const farmer = await FarmerService.getFarmerById(req.params.id);
      return response.success(res, farmer, "Farmer retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Get farmer by user ID
  async getFarmerByUserId(req, res, next) {
    try {
      const farmer = await FarmerService.getFarmerByUserId(req.params.userId);
      return response.success(res, farmer, "Farmer retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Update farmer profile
  async updateFarmer(req, res, next) {
    try {
      const updated = await FarmerService.updateFarmer(req.params.id, req.body);
      return response.success(
        res,
        updated,
        "Farmer profile updated successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Delete farmer profile
  async deleteFarmer(req, res, next) {
    try {
      await FarmerService.deleteFarmer(req.params.id);
      return response.success(res, null, "Farmer profile deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // Get farmer products
  async getFarmerProducts(req, res, next) {
    try {
      const products = await FarmerService.getFarmerProducts(req.params.id);
      return response.success(
        res,
        products,
        "Farmer products retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // Get farmers by location
  async getFarmersByLocation(req, res, next) {
    try {
      const farmers = await FarmerService.getFarmersByLocation(
        req.params.location,
      );
      return response.success(res, farmers, "Farmers retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Count farmers
  async countFarmers(req, res, next) {
    try {
      const count = await FarmerService.countFarmers();
      return response.success(
        res,
        { total: count },
        "Farmer count retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new FarmerController();
