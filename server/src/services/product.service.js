// src/services/product.service.js
import ProductRepository from "../repositories/product.repository.js";
import ProductImageRepository from "../repositories/productImage.repository.js";
import ReviewRepository from "../repositories/review.repository.js";
import CategoryService from "./category.service.js";

class ProductService {
  // =========================
  // Add new product
  // =========================
  async addProduct(productData) {
    const normalized = await this.normalizeProductData(productData);
    const productId = await ProductRepository.create(normalized);
    return await ProductRepository.findById(productId);
  }

  async normalizeProductData(raw) {
    const categoryId = await this.resolveCategoryId(raw);
    const subcategoryId = await this.resolveSubcategoryId(categoryId, raw);

    return {
      name: raw.name,
      description: raw.description || "",
      price: parseFloat(raw.price),
      stock_quantity: raw.stock_quantity ? parseInt(raw.stock_quantity, 10) : 0,
      category_id: categoryId,
      subcategory_id: subcategoryId,
      user_id: raw.user_id || raw.userId,
      location: raw.location || "",
      image: raw.image || null,
      status: raw.status || "active",
    };
  }

  async resolveCategoryId(raw) {
    if (raw.categoryId) return parseInt(raw.categoryId, 10);
    if (raw.category) {
      try {
        const category = await CategoryService.getCategoryByName(raw.category);
        return category.id;
      } catch (error) {
        // If category name provided but doesn't exist, create it automatically
        const created = await CategoryService.createCategory(raw.category, "");
        return created.id;
      }
    }
    throw new Error("Category is required");
  }

  async resolveSubcategoryId(categoryId, raw) {
    if (raw.subcategoryId) return parseInt(raw.subcategoryId, 10);
    if (raw.subcategory) {
      try {
        const subcategory =
          await CategoryService.getSubcategoryByCategoryAndName(
            categoryId,
            raw.subcategory,
          );
        return subcategory.id;
      } catch (error) {
        // If a valid subcategory name is provided but it doesn't exist yet,
        // create it automatically so uploads don't fail for new or seed-missing values.
        const created = await CategoryService.createSubcategory(
          categoryId,
          raw.subcategory,
          "",
        );
        return created.id;
      }
    }

    const subcategories =
      await CategoryService.getSubcategoriesByCategory(categoryId);
    if (subcategories.length > 0) {
      return subcategories[0].id;
    }

    throw new Error("Subcategory is required");
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
  // Supports filtering by category, subcategory, location, keyword, and price range.
  // =========================
  async getAllProducts(filters = {}) {
    return await ProductRepository.findAll(filters);
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
  async deleteProduct(productId, userId) {
    const product = await ProductRepository.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.user_id !== userId) {
      const error = new Error("Unauthorized to delete this product");
      error.status = 403;
      throw error;
    }

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
