//  ----- src/repositories/user.repository.js --
import db from "../config/db.js";
import BaseRepository from "./base.repository.js";

/**
 * UserRepository
 * - SRP: Handles only user-related queries.
 * - OCP: Can be extended with new methods without modifying existing ones.
 * - DIP: Services depend on this abstraction, not directly on db.
 * - Uses BaseRepository as an abstract contract.
 */
class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  async findById(id) {
    const rows = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  async findByEmail(email) {
    const rows = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }

  async create(user) {
    const {
      full_name,
      email,
      password,
      phone = null,
      location = "Cameroon",
      profile_image = null,
      role = "buyer",
    } = user;

    const result = await db.query(
      "INSERT INTO users (full_name, email, password, phone, location, profile_image, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [full_name, email, password, phone, location, profile_image, role],
    );
    return result.insertId;
  }

  async updateProfile(id, updates) {
    // Preserve existing values when fields are not provided to avoid NOT NULL violations
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error("User not found");
    }

    const full_name = updates.full_name ?? existing.full_name;
    const phone = updates.phone ?? existing.phone;
    const location = updates.location ?? existing.location;
    const profile_image = updates.profile_image ?? existing.profile_image;
    const notification_prefs =
      updates.notification_preferences ?? existing.notification_prefs;
    const password = updates.password ?? existing.password;
    const role = updates.role ?? existing.role;

    await db.query(
      "UPDATE users SET full_name=?, phone=?, location=?, profile_image=?, notification_prefs=?, password=?, role=? WHERE id=?",
      [
        full_name,
        phone,
        location,
        profile_image,
        typeof notification_prefs === "object"
          ? JSON.stringify(notification_prefs)
          : notification_prefs,
        password,
        role,
        id,
      ],
    );

    return this.findById(id);
  }

  async delete(id) {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    return true;
  }
}

export default new UserRepository();
