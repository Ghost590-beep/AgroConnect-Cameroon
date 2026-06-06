import { body } from "express-validator";

/**
 * Favorite Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for favorites.
 *   - OCP: Easily extendable with new rules (e.g., bulk favorites).
 */
class FavoriteValidator {
  static addFavorite = [
    body("productId").isInt().withMessage("Product ID must be an integer"),
  ];
}

export default FavoriteValidator;
