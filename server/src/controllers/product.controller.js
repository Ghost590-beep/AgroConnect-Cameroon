// src/controllers/product.controller.js
import ProductService from "../services/product.service.js";
import ProductImageService from "../services/productImage.service.js";
import response from "../utils/response.js";
import { validationResult } from "express-validator";

class ProductController {
  // =========================
  // Add new product
  // =========================
  async addProduct(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.error(res, errors.array(), "Validation failed", 400);
      }

      const productPayload = {
        ...req.body,
        user_id: req.user?.id,
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

  // =========================
  // Get product by ID (with images & reviews)
  // =========================
  async getProductById(req, res, next) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      return response.success(res, product, "Product retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get all products
  // Supports filtering via query parameters.
  // =========================
  async getAllProducts(req, res, next) {
    try {
      const filters = {
        keyword: req.query.keyword,
        category: req.query.category,
        subcategory: req.query.subcategory,
        location: req.query.location,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
      };
      const products = await ProductService.getAllProducts(filters);
      return response.success(res, products, "Products retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Update product
  // =========================
  async updateProduct(req, res, next) {
    try {
      const updated = await ProductService.updateProduct(
        req.params.id,
        req.body,
      );
      return response.success(res, updated, "Product updated successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Delete product
  // =========================
  async deleteProduct(req, res, next) {
    try {
      await ProductService.deleteProduct(req.params.id, req.user?.id);
      return response.success(res, null, "Product deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Search products
  // =========================
  async searchProducts(req, res, next) {
    try {
      const products = await ProductService.searchProducts(req.query.keyword);
      return response.success(
        res,
        products,
        "Search results retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Add image to product
  // =========================
  async addProductImage(req, res, next) {
    try {
      const { imageUrl } = req.body;
      const image = await ProductImageService.addImageWithLimit(
        req.params.id,
        imageUrl,
      );
      return response.success(res, image, "Image added successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Delete product image
  // =========================
  async deleteProductImage(req, res, next) {
    try {
      await ProductImageService.deleteImage(req.params.imageId);
      return response.success(res, null, "Image deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get product images
  // =========================
  async getProductImages(req, res, next) {
    try {
      const images = await ProductImageService.getProductImages(req.params.id);
      return response.success(
        res,
        images,
        "Product images retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
