//  ----- src/repositories/user.repository.js --
import db from "../config/db.js";

/**
 
 * - SRP: Handles only user-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 */
class UserRepository {
  async findById(id) {
    const rows = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  async findByEmail(email) {
    const rows = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }

  async create(user) {
    const { full_name, email, password, phone, location } = user;
    const result = await db.query(
      "INSERT INTO users (full_name, email, password, phone, location) VALUES (?, ?, ?, ?, ?)",
      [full_name, email, password, phone, location],
    );
    return result.insertId;
  }

  async updateProfile(id, updates) {
    const { full_name, phone, location, profile_image } = updates;
    await db.query(
      "UPDATE users SET full_name=?, phone=?, location=?, profile_image=? WHERE id=?",
      [full_name, phone, location, profile_image, id],
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    return true;
  }
}

export default new UserRepository();
