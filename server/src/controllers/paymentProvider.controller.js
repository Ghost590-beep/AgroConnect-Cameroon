// src/controllers/paymentProvider.controller.js
import PaymentProviderService from "../services/paymentProvider.service.js";
import response from "../utils/response.js";

class PaymentProviderController {
  async addProvider(req, res, next) {
    try {
      const { name, description } = req.body;
      const provider = await PaymentProviderService.addProvider(
        name,
        description,
      );
      return response.success(
        res,
        provider,
        "Payment provider added successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllProviders(req, res, next) {
    try {
      const providers = await PaymentProviderService.getAllProviders();
      return response.success(
        res,
        providers,
        "Providers retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  async getProviderById(req, res, next) {
    try {
      const provider = await PaymentProviderService.getProviderById(
        req.params.id,
      );
      return response.success(res, provider, "Provider retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateProvider(req, res, next) {
    try {
      const updated = await PaymentProviderService.updateProvider(
        req.params.id,
        req.body,
      );
      return response.success(res, updated, "Provider updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteProvider(req, res, next) {
    try {
      await PaymentProviderService.deleteProvider(req.params.id);
      return response.success(res, null, "Provider deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  async countProviders(req, res, next) {
    try {
      const count = await PaymentProviderService.countProviders();
      return response.success(
        res,
        { total: count },
        "Provider count retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new PaymentProviderController();
