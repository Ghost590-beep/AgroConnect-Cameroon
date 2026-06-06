// src/middlewares/validation.middleware.js
import { validationResult } from "express-validator";
import response from "../utils/response.js";

/**
 * Validation Middleware
 * - OOP: Encapsulated in a class with a static method.
 * - SOLID:
 *   - SRP: Handles only validation result checking.
 *   - OCP: Extendable with custom error formatting.
 */
class ValidationMiddleware {
  static validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response.error(res, errors.array(), "Validation failed", 400);
    }
    next();
  }
}

export default ValidationMiddleware;
