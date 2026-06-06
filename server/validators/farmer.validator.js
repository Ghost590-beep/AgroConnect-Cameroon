// src/validators/farmer.validator.js
import { body } from "express-validator";

/**
 * Farmer Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for farmer profiles.
 *   - OCP: Easily extendable with new rules (e.g., farm certifications).
 */
class FarmerValidator {
  static createFarmer = [
    body("farmName").notEmpty().withMessage("Farm name is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters"),
  ];

  static updateFarmer = [
    body("farmName")
      .optional()
      .notEmpty()
      .withMessage("Farm name cannot be empty"),
    body("location")
      .optional()
      .notEmpty()
      .withMessage("Location cannot be empty"),
    body("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters"),
  ];
}

export default FarmerValidator;
