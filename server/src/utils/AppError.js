// src/utils/AppError.js

/**
 * AppError
 * - Carries an HTTP status alongside a message so ErrorMiddleware
 *   can respond correctly without inspecting ad hoc error shapes.
 */
class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "AppError";
    this.status = status;
  }
}

export default AppError;
