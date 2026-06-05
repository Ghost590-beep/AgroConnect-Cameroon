import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";
import { API_BASE } from "../../utils/constants";
import type { Product } from "../../types/Product";
import {
  FaMapMarkerAlt, FaShoppingCart, FaChevronRight,
  FaLeaf, FaWhatsapp, FaPhone, FaArrowLeft,
  FaBoxOpen, FaTag, FaLayerGroup,
} from "react-icons/fa";
import "./ProductDetail.css";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  /* ── Fetch product ── */
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch {
        // product not found
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  /* ── Add to cart ── */
  const addToCart = () => {
    if (!product) return;
    const saved = localStorage.getItem("agro_cart");
    const cart = saved ? JSON.parse(saved) : [];
    const existing = cart.find((i: any) => i.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        emoji: "🌿",
        quantity,
      });
    }
    localStorage.setItem("agro_cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="pd-loading">
        <div className="pd-spinner" />
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-not-found">
        <FaLeaf size={40} color="#ccc" />
        <h2>Product not found</h2>
        <button onClick={() => navigate("/market")}>Back to market</button>
      </div>
    );
  }

  return (
    <div className="pd-page">

      {/* ── TOPBAR ── */}
      <div className="pd-topbar">
        <span className="pd-brand">AgroConnect</span>
        <nav className="pd-breadcrumb">
          <span onClick={() => navigate("/landing")}>Home</span>
          <FaChevronRight size={10} />
          <span onClick={() => navigate("/market")}>Marketplace</span>
          <FaChevronRight size={10} />
          <span className="pd-active">{product.name}</span>
        </nav>
      </div>

      <div className="pd-container">

        {/* ── BACK ── */}
        <button className="pd-back-btn" onClick={() => navigate("/market")}>
          <FaArrowLeft size={12} /> Back to marketplace
        </button>

        {/* ── MAIN ── */}
        <div className="pd-main">

          {/* IMAGE */}
          <div className="pd-image-col">
            {product.image ? (
              <img
                src={`${API_BASE}${product.image}`}
                alt={product.name}
                className="pd-image"
              />
            ) : (
              <div className="pd-image-placeholder">
                <FaLeaf size={48} color="#ccc" />
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="pd-info-col">
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

            {/* QUANTITY + ADD TO CART */}
            <div className="pd-actions">
              <div className="pd-qty-wrap">
                <button
                  className="pd-qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >−</button>
                <span className="pd-qty">{quantity}</span>
                <button
                  className="pd-qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >+</button>
              </div>

              <button
                className={`pd-cart-btn ${added ? "pd-cart-added" : ""}`}
                onClick={addToCart}
                disabled={product.stock_quantity === 0}
              >
                <FaShoppingCart size={14} />
                {added ? "Added to cart!" : "Add to cart"}
              </button>

              <button
                className="pd-checkout-btn"
                onClick={() => { addToCart(); navigate("/checkout"); }}
                disabled={product.stock_quantity === 0}
              >
                Buy now
              </button>
            </div>

            {/* CONTACT SELLER */}
            <div className="pd-contact-row">
              <a href={`tel:${product.phone || ""}`} className="pd-contact-btn">
                <FaPhone size={12} /> Call seller
              </a>
              <a
                href={`https://wa.me/${product.phone || ""}`}
                target="_blank"
                rel="noreferrer"
                className="pd-whatsapp-btn"
              >
                <FaWhatsapp size={12} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;