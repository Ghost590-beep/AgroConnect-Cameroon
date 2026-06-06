// src/middlewares/error.middleware.js
import response from "../utils/response.js";

/**
 * Error Middleware
 * - OOP: Encapsulated in a class with a static method.
 * - SOLID:
 *   - SRP: Handles only error formatting.
 *   - OCP: Can be extended with logging or monitoring without modifying core logic.
 */
class ErrorMiddleware {
  static handleError(err, req, res, next) {
    console.error(`[ERROR] ${err.stack}`);
    return response.error(
      res,
      null,
      err.message || "Internal Server Error",
      err.status || 500,
    );
  }
}

export default ErrorMiddleware;
