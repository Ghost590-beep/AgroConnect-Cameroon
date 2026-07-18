// src/repositories/product.repository.js
import BaseRepository from "./base.repository.js";

const PRODUCT_WITH_SELLER_SELECT = `
  SELECT products.*, users.full_name AS seller_name, users.phone AS seller_phone
  FROM products
  JOIN users ON users.id = products.user_id
`;

/**
 * ProductRepository
 * - SRP: product table access only.
 * - findAllActive/findById join to users so callers get the seller's
 *   name/phone without a second round trip (the frontend's Product
 *   contract requires `farmer`/`phone` on every product).
 */
class ProductRepository extends BaseRepository {
  constructor() {
    super("products");
  }

  async create({
    name,
    category,
    subcategory = null,
    description = null,
    price,
    stock_quantity = 0,
    unit = null,
    min_order = 1,
    location = null,
    image = null,
    status = "draft",
    user_id,
  }) {
    const result = await this.db.query(
      `INSERT INTO products
       (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, image, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        name,
        category,
        subcategory,
        description,
        price,
        stock_quantity,
        unit,
        min_order,
        location,
        image,
        status,
      ],
    );
    return this.findById(result.insertId);
  }

  async findById(id) {
    const rows = await this.db.query(
      `${PRODUCT_WITH_SELLER_SELECT} WHERE products.id = ?`,
      [id],
    );
    return rows[0] ?? null;
  }

  async findAllActive() {
    return this.db.query(
      `${PRODUCT_WITH_SELLER_SELECT} WHERE products.status = 'active' ORDER BY products.created_at DESC`,
    );
  }

  async findByUser(userId) {
    return this.db.query(
      `${PRODUCT_WITH_SELLER_SELECT} WHERE products.user_id = ? ORDER BY products.created_at DESC`,
      [userId],
    );
  }

  async countByUser(userId) {
    const rows = await this.db.query(
      "SELECT COUNT(*) AS total FROM products WHERE user_id = ?",
      [userId],
    );
    return rows[0].total;
  }
}

export default new ProductRepository();
