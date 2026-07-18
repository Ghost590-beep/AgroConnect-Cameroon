import { body } from "express-validator";

class UserValidator {
  static updateProfile = [
    body("full_name").optional().notEmpty().withMessage("Full name cannot be empty"),
    body("phone").optional().notEmpty().withMessage("Phone number cannot be empty"),
    body("location").optional().notEmpty().withMessage("Location cannot be empty"),
  ];

  static changePassword = [
    body("current_password").notEmpty().withMessage("Current password is required"),
    body("new_password")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
  ];

  static notifications = [
    body("orders").isBoolean().withMessage("orders must be a boolean"),
    body("promotions").isBoolean().withMessage("promotions must be a boolean"),
    body("newsletter").isBoolean().withMessage("newsletter must be a boolean"),
    body("sms").isBoolean().withMessage("sms must be a boolean"),
  ];
}

export default UserValidator;
