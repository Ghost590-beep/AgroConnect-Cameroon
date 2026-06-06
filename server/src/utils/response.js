// server/src/utils/response.js

/**
 * Response Utility
 * - OOP: Encapsulated in a class with static methods.
 * - SOLID:
 *   - SRP: Handles only standardized API responses.
 *   - OCP: Can be extended with more formats (e.g., pagination).
 */
class Response {
  static success(res, data, message = "Success", status = 200) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  static error(res, errors, message = "Error", status = 500) {
    return res.status(status).json({
      success: false,
      message,
      errors,
    });
  }
}

export default Response;
