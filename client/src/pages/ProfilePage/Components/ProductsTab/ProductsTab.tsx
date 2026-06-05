import React from "react";
import { FaLeaf } from "react-icons/fa";
import type { Product } from "../../../../types/Product";
import "./ProductsTab.css"

interface Props {
  products: Product[];
  onAddProduct: () => void;
}

const ProductsTab: React.FC<Props> = ({ products, onAddProduct }) => (
  <div>
    <div className="pr-section-header">
      <h3>My listings <span className="pr-section-count">({products.length})</span></h3>
      <button className="pr-add-btn" onClick={onAddProduct}>+ Add product</button>
    </div>
    {products.length === 0 ? (
      <div className="pr-empty-state">
        <FaLeaf size={32} color="#ccc" />
        <p>You haven't listed any products yet.</p>
        <button className="pr-add-btn" onClick={onAddProduct}>Upload your first product</button>
      </div>
    ) : (
      <div className="pr-listings-grid">
        {products.map((item) => (
          <div className="pr-listing-card" key={item.id}>
            {item.image ? (
              <img src={item.image} alt={item.name} className="pr-listing-img" />
            ) : (
              <div className="pr-listing-emoji" style={{ background: "#f0faf0" }}>🌿</div>
            )}
            <div className="pr-listing-info">
              <span className="pr-listing-name">{item.name}</span>
              <span className="pr-listing-cat">{item.subcategory || item.category}</span>
              <span className="pr-listing-price">FCFA {item.price.toLocaleString()} / {item.unit}</span>
              <span className="pr-listing-stock">Stock: {item.stock_quantity} {item.unit}</span>
              <span className={`pr-status-badge ${
                item.status === "active" || item.status === "public" ? "pr-active-badge" : "pr-draft-badge"
              }`}>
                {item.status === "active" || item.status === "public" ? "Active" : "Draft"}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ProductsTab;