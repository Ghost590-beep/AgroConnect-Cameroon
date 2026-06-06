// src/validators/user.validator.js
import { body } from "express-validator";

/**
 * User Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for user inputs.
 *   - OCP: Easily extendable with new rules.
 */
class UserValidator {
  static register = [
    body("full_name").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("location").notEmpty().withMessage("Location is required"),
  ];

  static login = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ];

  static updateProfile = [
    body("full_name")
      .optional()
      .notEmpty()
      .withMessage("Full name cannot be empty"),
    body("phone")
      .optional()
      .notEmpty()
      .withMessage("Phone number cannot be empty"),
    body("location")
      .optional()
      .notEmpty()
      .withMessage("Location cannot be empty"),
  ];

  static assignRole = [
    body("role").notEmpty().withMessage("Role is required"),
    body("permissions").isArray().withMessage("Permissions must be an array"),
  ];
}

export default UserValidator;
