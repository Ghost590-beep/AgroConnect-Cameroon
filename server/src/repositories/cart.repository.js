import db from "../config/db.js";

class CartRepository {
  async addItem(userId, productId, quantity = 1) {
    await db.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?",
      [userId, productId, quantity, quantity],
    );
  }

  async getCartByUser(userId) {
    return await db.query(
      `SELECT c.*, p.name, p.price 
       FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id=?`,
      [userId],
    );
  }

  async updateQuantity(userId, productId, quantity) {
    await db.query(
      "UPDATE cart SET quantity=? WHERE user_id=? AND product_id=?",
      [quantity, userId, productId],
    );
  }

  async removeItem(userId, productId) {
    await db.query("DELETE FROM cart WHERE user_id=? AND product_id=?", [
      userId,
      productId,
    ]);
  }

  async clearCart(userId) {
    await db.query("DELETE FROM cart WHERE user_id=?", [userId]);
  }
}

export default new CartRepository();
