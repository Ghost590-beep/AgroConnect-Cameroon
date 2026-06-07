import { body } from "express-validator";

/**
 * Product Validator
 * - OOP: Encapsulated in a class with static rules.
 * - SOLID:
 *   - SRP: Handles only validation rules for product inputs.
 *   - OCP: Easily extendable with new rules (e.g., discount codes).
 */
class ProductValidator {
  static addProduct = [
    body("name").custom((value, { req }) => {
      if (req.body.status === "draft") return true;
      if (!value) throw new Error("Product name is required");
      return true;
    }),
    body("price").custom((value, { req }) => {
      if (req.body.status === "draft") return true;
      if (!value || Number.isNaN(Number(value)) || Number(value) <= 0) {
        throw new Error("Price must be greater than 0");
      }
      return true;
    }),
    body("category").custom((value, { req }) => {
      if (req.body.status === "draft") return true;
      if (!value && !req.body.categoryId) {
        throw new Error("Category or categoryId is required");
      }
      return true;
    }),
    body("categoryId")
      .optional()
      .isInt()
      .withMessage("Category ID must be an integer"),
    body("description").custom((value, { req }) => {
      if (req.body.status === "draft") return true;
      if (!value || value.length < 5) {
        throw new Error("Description must be at least 5 characters");
      }
      return true;
    }),
    body("stock_quantity")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock quantity must be a non-negative integer"),
    body("status")
      .optional()
      .isIn(["active", "draft", "sold_out"])
      .withMessage("Status must be active, draft, or sold_out"),
  ];

  static updateProduct = [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Product name cannot be empty"),
    body("price")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
    body("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters"),
  ];

  static addProductImage = [
    body("imageUrl").isURL().withMessage("Valid image URL is required"),
  ];
}

export default ProductValidator;
