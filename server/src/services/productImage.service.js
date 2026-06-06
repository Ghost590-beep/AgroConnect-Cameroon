// src/services/productImage.service.js
import ProductImageRepository from "../repositories/productImage.repository.js";

class ProductImageService {
  // =========================
  // Add a new image for a product
  // =========================
  async addImage(productId, imageUrl) {
    const imageId = await ProductImageRepository.create(productId, imageUrl);
    return await ProductImageRepository.findById(imageId);
  }

  // =========================
  // Get all images for a product
  // =========================
  async getProductImages(productId) {
    return await ProductImageRepository.findByProductId(productId);
  }

  // =========================
  // Get a single image by ID
  // =========================
  async getImageById(imageId) {
    return await ProductImageRepository.findById(imageId);
  }

  // =========================
  // Update image URL
  // =========================
  async updateImage(imageId, newUrl) {
    return await ProductImageRepository.update(imageId, newUrl);
  }

  // =========================
  // Delete a specific image
  // =========================
  async deleteImage(imageId) {
    return await ProductImageRepository.delete(imageId);
  }

  // =========================
  // Delete all images for a product
  // =========================
  async deleteAllImagesForProduct(productId) {
    return await ProductImageRepository.deleteByProductId(productId);
  }

  // =========================
  // Count images for a product
  // =========================
  async countImages(productId) {
    return await ProductImageRepository.countByProductId(productId);
  }

  // =========================
  // Get products with at least one image
  // =========================
  async getProductsWithImages() {
    return await ProductImageRepository.findProductsWithImages();
  }

  // =========================
  // Business rule: enforce max images per product
  // =========================
  async addImageWithLimit(productId, imageUrl, maxImages = 5) {
    const count = await ProductImageRepository.countByProductId(productId);
    if (count >= maxImages) {
      throw new Error(`Product already has ${maxImages} images`);
    }
    return this.addImage(productId, imageUrl);
  }
}

export default new ProductImageService();
