// src/utils/asyncHandler.js

/**
 * Async handler for Express routes.
 * - SRP: wraps an async callback and forwards errors to error middleware.
 */
const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

export default asyncHandler;
