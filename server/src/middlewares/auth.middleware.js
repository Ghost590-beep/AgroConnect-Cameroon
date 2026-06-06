// src/middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import response from "../utils/response.js";

/**
 * Auth Middleware
 * - OOP: Encapsulated in a class with static methods.
 * - SOLID:
 *   - SRP: Handles only authentication and authorization.
 *   - OCP: Extendable with role-based checks.
 *   - DIP: Depends on JWT abstraction, not hardcoded user logic.
 */
class AuthMiddleware {
  static verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return response.error(res, null, "No token provided", 401);
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // attach user info to request
      next();
    } catch (error) {
      return response.error(res, null, "Invalid or expired token", 401);
    }
  }

  static authorizeRole(requiredRole) {
    return (req, res, next) => {
      if (!req.user || req.user.role !== requiredRole) {
        return response.error(
          res,
          null,
          "Forbidden: insufficient privileges",
          403,
        );
      }
      next();
    };
  }
}

export default AuthMiddleware;
