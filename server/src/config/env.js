// ---- src/config/env.js ---------
import dotenv from "dotenv";

// Load .env
dotenv.config();

/**
 * EnvConfig class
 *  -(SRP) class: Handles only environment variables.
 *  -(OCP): Can be extended with validation rules without modifying core logic.
 */
class EnvConfig {
  static get(key) {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }

  static getDbHost() {
    return this.get("DB_HOST");
  }

  static getDbPort() {
    return parseInt(this.get("DB_PORT"), 10);
  }

  static getDbName() {
    return this.get("DB_NAME");
  }

  static getDbUser() {
    return this.get("DB_USER");
  }

  static getDbPassword() {
    return this.get("DB_PASSWORD");
  }

  static getServerPort() {
    return parseInt(this.get("SERVER_PORT"), 10);
  }

  static getJwtSecret() {
    return this.get("JWT_SECRET");
  }

  // Optional: Google sign-in is a feature, not a hard startup requirement,
  // so this intentionally does not throw when unset.
  static getGoogleClientId() {
    return process.env.GOOGLE_CLIENT_ID || null;
  }

  static getPort() {
    return parseInt(process.env.PORT || process.env.SERVER_PORT || "5000", 10);
  }
}

export default EnvConfig;
