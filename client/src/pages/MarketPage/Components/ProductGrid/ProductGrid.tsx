import React from "react";
import {
  FaFilter,
  FaSortAmountDown,
  FaMapMarkerAlt,
  FaShoppingCart,
} from "react-icons/fa";
import type { Product } from "../../../../types/Product";
import "../ProductGrid/ProductGrid.css";

interface Props {
  filtered: Product[];
  sortBy: string;
  onSortChange: (val: string) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (id: number) => void;
  onCheckout: () => void;
  cartCount: number;
  currentUserId?: number;
}

const ProductGrid: React.FC<Props> = ({
  filtered,
  sortBy,
  onSortChange,
  sidebarOpen,
  onToggleSidebar,
  onAddToCart,
  onViewDetails,
  currentUserId,
}) => (
  <div className="hm-products-area">
    <div className="hm-products-header">
      <h3>
        Showing{" "}
        <span style={{ color: "var(--accent)" }}>{filtered.length}</span>{" "}
        results
      </h3>
      <div className="hm-header-right">
        <button className="hm-filter-btn" onClick={onToggleSidebar}>
          <FaFilter size={12} /> Filters
        </button>
        <div className="hm-sort-wrap">
          <FaSortAmountDown size={12} color="var(--text-muted)" />
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="newest">Sort: Newest</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
          </select>
        </div>
      </div>
    </div>

    {filtered.length === 0 ? (
      <div className="hm-empty">
        <span>🌿</span>
        <p>No products found. Try adjusting your filters.</p>
      </div>
    ) : (
      <div className="hm-grid">
        {filtered.map((product) => {
          const isOwner =
            currentUserId !== undefined && product.user_id === currentUserId;
          return (
            <div className="hm-product-card" key={product.id}>
              {product.image ? (
                <div className="hm-product-img-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="hm-product-img"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect width='320' height='240' fill='%23e0e0e0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23888' font-size='18'%3ENo image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              ) : (
                <div className="hm-img-placeholder">
                  <span className="hm-img-placeholder-text">[img]</span>
                </div>
              )}
              <div className="hm-product-body">
                <h3>{product.name}</h3>
                <p className="hm-location">
                  <FaMapMarkerAlt size={10} /> {product.location}
                </p>
                <div className="hm-price-row-card">
                  <span className="hm-price">
                    XAF {product.price.toLocaleString()}
                  </span>
                  <span className="hm-unit">/ {product.unit}</span>
                </div>
                <div className="hm-badge-row">
                  <span className="hm-sale-badge">For Sale</span>
                  {isOwner && (
                    <span className="hm-owned-badge">Your listing</span>
                  )}
                </div>
                <div className="hm-card-btns">
                  <button
                    className="hm-details-btn"
                    onClick={() => onViewDetails(product.id)}
                  >
                    View details
                  </button>
                  <button
                    className="hm-cart-btn"
                    onClick={() => onAddToCart(product)}
                    disabled={isOwner}
                    title={
                      isOwner
                        ? "You cannot add your own listing to the cart"
                        : "Add to cart"
                    }
                  >
                    <FaShoppingCart size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}

    <div className="hm-pagination">
      {[1, 2, 3].map((p) => (
        <button
          key={p}
          className={`hm-page-btn ${p === 1 ? "hm-page-active" : ""}`}
        >
          {p}
        </button>
      ))}
      <span className="hm-page-next">Next &rsaquo;</span>
    </div>
  </div>
);

export default ProductGrid;
