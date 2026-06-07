import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";
import type { Product } from "../../types/Product";
import { FaChevronRight, FaLeaf, FaArrowLeft } from "react-icons/fa";
import ProductImage from "../ProductDetail/Components/ProductImage/ProductImage";
import ProductInfo from "../ProductDetail/Components/ProductInfo/ProductInto";
import QuantityCart from "../ProductDetail/Components/QuantityCart/QuantityCart";
import ContactSeller from "../ProductDetail/Components/ContactSeller/ContactSeller";
import "../../styles/ProductDetail.css";

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
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch {
        // product not found
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
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

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="pd-loading">
        <div className="pd-spinner" />
        <p>Loading product...</p>
      </div>
    );
  }

  /* ── Not found ── */
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

          <ProductImage image={product.image} name={product.name} />

          <div className="pd-info-col">
            <ProductInfo product={product} />
            <QuantityCart
              quantity={quantity}
              added={added}
              outOfStock={product.stock_quantity === 0}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              onIncrease={() => setQuantity((q) => q + 1)}
              onAddToCart={addToCart}
              onBuyNow={() => { addToCart(); navigate("/checkout"); }}
            />
            <ContactSeller phone={product.phone} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;