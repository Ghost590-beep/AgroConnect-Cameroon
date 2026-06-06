// src/services/product.service.js
import ProductRepository from "../repositories/product.repository.js";
import ProductImageRepository from "../repositories/productImage.repository.js";
import ReviewRepository from "../repositories/review.repository.js";

class ProductService {
  // =========================
  // Add new product
  // =========================
  async addProduct(productData) {
    const productId = await ProductRepository.create(productData);
    return await ProductRepository.findById(productId);
  }

  // =========================
  // Get product by ID (with images & reviews)
  // =========================
  async getProductById(productId) {
    const product = await ProductRepository.findById(productId);
    if (!product) throw new Error("Product not found");

    const images = await ProductImageRepository.findByProductId(productId);
    const reviews = await ReviewRepository.findByProductId(productId);
    const avgRating = await ReviewRepository.getAverageRating(productId);

    return { ...product, images, reviews, avgRating };
  }

  // =========================
  // Get all products
  // =========================
  async getAllProducts() {
    return await ProductRepository.findAll();
  }

  // =========================
  // Get products by category
  // =========================
  async getProductsByCategory(categoryId) {
    return await ProductRepository.findByCategory(categoryId);
  }

  // =========================
  // Get products by subcategory
  // =========================
  async getProductsBySubcategory(subcategoryId) {
    return await ProductRepository.findBySubcategory(subcategoryId);
  }

  // =========================
  // Get products by user (farmer)
  // =========================
  async getProductsByUser(userId) {
    return await ProductRepository.findByUser(userId);
  }

  // =========================
  // Update product
  // =========================
  async updateProduct(productId, updates) {
    return await ProductRepository.update(productId, updates);
  }

  // =========================
  // Delete product (with cleanup)
  // =========================
  async deleteProduct(productId) {
    await ProductImageRepository.deleteByProductId(productId);
    await ReviewRepository.delete(productId); // optional cleanup if cascade not enabled
    return await ProductRepository.delete(productId);
  }

  // =========================
  // Search products
  // =========================
  async searchProducts(keyword) {
    return await ProductRepository.search(keyword);
  }

  // =========================
  // Count products by category
  // =========================
  async countProductsByCategory(categoryId) {
    return await ProductRepository.countByCategory(categoryId);
  }
}

export default new ProductService();
