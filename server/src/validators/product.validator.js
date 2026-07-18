import { body } from "express-validator";

// Draft listings are allowed to be incomplete (a farmer saving
// progress before publishing), so most fields are only required
// when the product isn't a draft.
function requiredUnlessDraft(value, { req }) {
  return req.body.status === "draft" || Boolean(value);
}

class ProductValidator {
  static addProduct = [
    body("name")
      .custom(requiredUnlessDraft)
      .withMessage("Product name is required"),
    body("category")
      .custom(requiredUnlessDraft)
      .withMessage("Category is required"),
    body("description")
      .custom((value, meta) => requiredUnlessDraft(value, meta) && (meta.req.body.status === "draft" || value.length >= 5))
      .withMessage("Description must be at least 5 characters"),
    body("price").custom((value, { req }) => {
      if (req.body.status === "draft") return true;
      if (!value || Number.isNaN(Number(value)) || Number(value) <= 0) {
        throw new Error("Price must be greater than 0");
      }
      return true;
    }),
    body("stock_quantity")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock quantity must be a non-negative integer"),
    body("min_order")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Minimum order must be a positive integer"),
  ];
}

export default ProductValidator;
