// src/validators/auth.validator.js
import { body } from "express-validator";

class AuthValidator {
  static register = [
    body("full_name").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("location").optional(),
  ];

  static login = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ];

  static googleAuth = [
    body("id_token").notEmpty().withMessage("Google ID token is required"),
  ];
}

export default AuthValidator;
