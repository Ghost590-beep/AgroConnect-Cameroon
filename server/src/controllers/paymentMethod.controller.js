// src/controllers/paymentMethod.controller.js
import PaymentMethodService from "../services/paymentMethod.service.js";
import response from "../utils/response.js";

class PaymentMethodController {
  async addMethod(req, res, next) {
    try {
      const { name, description } = req.body;
      const method = await PaymentMethodService.addMethod(name, description);
      return response.success(
        res,
        method,
        "Payment method added successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllMethods(req, res, next) {
    try {
      const methods = await PaymentMethodService.getAllMethods();
      return response.success(res, methods, "Methods retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async getMethodById(req, res, next) {
    try {
      const method = await PaymentMethodService.getMethodById(req.params.id);
      return response.success(res, method, "Method retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateMethod(req, res, next) {
    try {
      const updated = await PaymentMethodService.updateMethod(
        req.params.id,
        req.body,
      );
      return response.success(res, updated, "Method updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteMethod(req, res, next) {
    try {
      await PaymentMethodService.deleteMethod(req.params.id);
      return response.success(res, null, "Method deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  async countMethods(req, res, next) {
    try {
      const count = await PaymentMethodService.countMethods();
      return response.success(
        res,
        { total: count },
        "Method count retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new PaymentMethodController();
