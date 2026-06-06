import { body } from "express-validator";

/**
 * Review Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for reviews.
 *   - OCP: Easily extendable with new rules (e.g., media attachments).
 */
class ReviewValidator {
  static addReview = [
    body("productId").isInt().withMessage("Product ID must be an integer"),
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("comment")
      .isLength({ min: 3 })
      .withMessage("Comment must be at least 3 characters"),
  ];

  static updateReview = [
    body("rating")
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("comment")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Comment must be at least 3 characters"),
  ];
}

export default ReviewValidator;
