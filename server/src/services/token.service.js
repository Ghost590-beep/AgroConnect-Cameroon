// src/services/token.service.js
import jwt from "jsonwebtoken";
import EnvConfig from "../config/env.js";

const EXPIRES_IN = "1h";

/**
 * TokenService
 * - Single place that owns the JWT payload shape and signing/verification
 *   config. Previously this was duplicated across three call sites in
 *   the controller (register/login/google), each signing independently.
 */
class TokenService {
  issue(user) {
    return jwt.sign({ id: user.id }, EnvConfig.getJwtSecret(), {
      expiresIn: EXPIRES_IN,
    });
  }

  verify(token) {
    return jwt.verify(token, EnvConfig.getJwtSecret());
  }
}

export default new TokenService();
