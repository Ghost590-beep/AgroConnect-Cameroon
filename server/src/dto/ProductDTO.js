// src/dto/ProductDTO.js

/**
 * ProductDTO
 * - Centralizes the one non-trivial construction rule for products:
 *   flattening the products⋈users join into the shape the frontend's
 *   Product type expects (`farmer`, `phone` instead of a nested seller
 *   object or raw `seller_name`/`seller_phone` join aliases).
 */
class ProductDTO {
  static fromRow(row) {
    if (!row) return null;
    const { seller_name, seller_phone, ...rest } = row;
    return {
      ...rest,
      farmer: seller_name,
      phone: seller_phone,
    };
  }

  static fromRows(rows) {
    return rows.map(ProductDTO.fromRow);
  }
}

export default ProductDTO;
