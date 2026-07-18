// src/repositories/order.repository.js
import BaseRepository from "./base.repository.js";

/**
 * OrderRepository
 * - Read-only surface today: there is no order-creation flow in the
 *   frontend (checkout is client-side/localStorage only), so only
 *   the read path this app actually needs (a user's own orders) is
 *   implemented. See seed.sql for why the table stays empty.
 */
class OrderRepository extends BaseRepository {
  constructor() {
    super("orders");
  }

  async findByUserId(userId) {
    return this.db.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );
  }
}

export default new OrderRepository();
