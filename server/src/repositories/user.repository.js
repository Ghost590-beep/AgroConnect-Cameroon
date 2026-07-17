// src/repositories/user.repository.js
import BaseRepository from "./base.repository.js";

/**
 * UserRepository
 * - SRP: user table access only.
 * - Extends BaseRepository for real (findById/delete come for free).
 */
class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  async findByEmail(email) {
    const rows = await this.db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0] ?? null;
  }

  async create({ full_name, email, password, phone = null, location = "Cameroon", profile_image = null }) {
    const result = await this.db.query(
      "INSERT INTO users (full_name, email, password, phone, location, profile_image) VALUES (?, ?, ?, ?, ?, ?)",
      [full_name, email, password, phone, location, profile_image],
    );
    return this.findById(result.insertId);
  }

  async updateProfile(id, updates) {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error("User not found");
    }

    const full_name = updates.full_name ?? existing.full_name;
    const phone = updates.phone ?? existing.phone;
    const location = updates.location ?? existing.location;
    const profile_image = updates.profile_image ?? existing.profile_image;
    const password = updates.password ?? existing.password;
    // mysql2 auto-parses JSON columns back into JS objects on read, so
    // the "keep existing value" fallback must be re-serialized too —
    // only a raw string (or null) may be sent back to a JSON column as-is.
    const rawPrefs =
      updates.notification_prefs !== undefined
        ? updates.notification_prefs
        : existing.notification_prefs;
    const notification_prefs =
      rawPrefs === null || rawPrefs === undefined
        ? null
        : typeof rawPrefs === "string"
          ? rawPrefs
          : JSON.stringify(rawPrefs);

    await this.db.query(
      "UPDATE users SET full_name=?, phone=?, location=?, profile_image=?, password=?, notification_prefs=? WHERE id=?",
      [full_name, phone, location, profile_image, password, notification_prefs, id],
    );

    return this.findById(id);
  }
}

export default new UserRepository();
