// src/services/product.service.js
import ProductRepository from "../repositories/product.repository.js";
import ProductDTO from "../dto/ProductDTO.js";
import AppError from "../utils/AppError.js";

// Different pages of the frontend normalize the "publicly visible"
// radio option to different literal strings ("active" on Dashboard,
// "public" on the standalone UploadProduct page) — the backend
// normalizes both rather than requiring the frontend to agree.
const PUBLIC_STATUS_ALIASES = new Set(["active", "public", "published"]);

function normalizeStatus(raw) {
  if (!raw) return "draft";
  return PUBLIC_STATUS_ALIASES.has(String(raw).toLowerCase()) ? "active" : "draft";
}

// Draft listings may arrive with blank numeric fields (the frontend always
// sends the keys, just possibly empty, when saving a draft) — treat blank/
// missing/invalid as "not provided" rather than passing NaN to the database.
function toNumber(value, fallback) {
  if (value === undefined || value === null || value === "") return fallback;
  const num = Number(value);
  return Number.isNaN(num) ? fallback : num;
}

/**
 * ProductService (Facade)
 */
class ProductService {
  async addProduct(raw) {
    let product;
    try {
      product = await ProductRepository.create({
        name: raw.name || "Untitled product",
        category: raw.category || "Uncategorized",
        subcategory: raw.subcategory || null,
        description: raw.description || null,
        price: toNumber(raw.price, 0),
        stock_quantity: toNumber(raw.stock_quantity, 0),
        unit: raw.unit || null,
        min_order: toNumber(raw.min_order, 1),
        location: raw.location || null,
        image: raw.image || null,
        status: normalizeStatus(raw.status),
        user_id: raw.user_id,
      });
    } catch (error) {
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        // The bearer token was valid but the account behind it no longer
        // exists (deleted account, or a DB reset) — surface this as an
        // auth problem, not a raw 500 SQL error.
        throw new AppError("Your session is no longer valid. Please log in again.", 401);
      }
      throw error;
    }
    return ProductDTO.fromRow(product);
  }

  async getAllActive() {
    const rows = await ProductRepository.findAllActive();
    return ProductDTO.fromRows(rows);
  }

  async getById(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return ProductDTO.fromRow(product);
  }

  async getByUser(userId) {
    const rows = await ProductRepository.findByUser(userId);
    return ProductDTO.fromRows(rows);
  }

  async countByUser(userId) {
    return ProductRepository.countByUser(userId);
  }

  async deleteProduct(id, userId) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    if (product.user_id !== userId) {
      throw new AppError("You do not have permission to delete this product", 403);
    }
    return ProductRepository.delete(id);
  }
}

export default new ProductService();
