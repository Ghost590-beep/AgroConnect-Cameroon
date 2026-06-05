import React from "react";
import "./ProductInto.css";
import {
  FaMapMarkerAlt, FaTag,
  FaBoxOpen, FaLayerGroup,
} from "react-icons/fa";
import type { Product } from "../../../../types/Product";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <>
      <span className="pd-category-badge">{product.category}</span>
      <h1 className="pd-name">{product.name}</h1>

      <div className="pd-meta-row">
        <span><FaMapMarkerAlt size={12} /> {product.location}</span>
        <span><FaTag size={12} /> {product.subcategory || product.category}</span>
      </div>

      <div className="pd-price-row">
        <span className="pd-price">XAF {product.price.toLocaleString()}</span>
        <span className="pd-unit">/ {product.unit}</span>
      </div>

      <div className="pd-stock-row">
        <FaBoxOpen size={13} color="#2E7D32" />
        <span>
          {product.stock_quantity > 0
            ? `${product.stock_quantity} ${product.unit} available`
            : "Out of stock"}
        </span>
      </div>

      {product.description && (
        <p className="pd-description">{product.description}</p>
      )}

      <div className="pd-farmer-row">
        <FaLayerGroup size={13} color="#888" />
        <span>Sold by <strong>{product.farmer}</strong></span>
      </div>
    </>
  );
};

export default ProductInfo;