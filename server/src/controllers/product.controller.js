// src/controllers/product.controller.js
import ProductService from "../services/product.service.js";
import response from "../utils/response.js";

/**
 * ProductController
 * - SRP: handles product HTTP requests only.
 * - Uses ProductService for business logic.
 */
class ProductController {
  async addProduct(req, res, next) {
    try {
      const productPayload = {
        ...req.body,
        user_id: req.user.id,
        image: req.file
          ? `/uploads/products/${req.file.filename}`
          : req.body.image,
      };
      const product = await ProductService.addProduct(productPayload);
      return response.success(
        res,
        product,
        "Product created successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const product = await ProductService.getById(req.params.id);
      return response.success(res, product, "Product retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await ProductService.getAllActive();
      return response.success(res, products, "Products retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      await ProductService.deleteProduct(req.params.id, req.user.id);
      return response.success(res, null, "Product deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
