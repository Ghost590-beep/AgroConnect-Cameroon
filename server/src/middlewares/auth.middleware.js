// src/middlewares/auth.middleware.js
import TokenService from "../services/token.service.js";
import response from "../utils/response.js";

/**
 * Auth Middleware
 * - SRP: Verifies the bearer token and attaches req.user; nothing else.
 * - DIP: Delegates verification to TokenService rather than calling
 *   jwt.verify directly, so the signing/verification contract lives
 *   in exactly one place (see token.service.js).
 */
class AuthMiddleware {
  static verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return response.error(res, null, "No token provided", 401);
    }

    try {
      req.user = TokenService.verify(token);
      next();
    } catch (error) {
      return response.error(res, null, "Invalid or expired token", 401);
    }
  }
}

export default AuthMiddleware;
