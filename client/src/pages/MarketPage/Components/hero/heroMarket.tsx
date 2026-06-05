import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  API_BASE, DELIVERY_FEE, CATEGORY_EMOJI,
  CATEGORIES, FEATURES,
} from "../../../../utils/constants";
import type { Product } from "../../../../types/Product";
import type { CartItem } from "../../../../types/Cart";
import { getInitials } from "../../../../utils/validtors";
import { useAuth } from "../../../../context/AuthContext";
import { getAllProducts } from "../../../../services/productService";
import {
  FaSearch, FaTimes, FaLeaf,
  FaTruck, FaShieldAlt, FaHeadset, FaShoppingCart,
  FaTrash, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaFacebook, FaTwitter, FaInstagram, FaWhatsapp,
  FaFilter, FaSortAmountDown, FaChevronRight,
  FaCheckCircle,FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../../../../assets/logo (3).png";
import "../hero/heroMarket.css";

/* ─── COMPONENT ─── */
const HeroMarket: React.FC = () => {
  const navigate = useNavigate();

  /* ── Auth context — replaces all localStorage user reads ── */
  const { user: authUser , logout} = useAuth();
  const initials = getInitials(authUser?.full_name);
  const avatarSrc = authUser?.profile_image
    ? `${API_BASE}${authUser.profile_image}`
    : null;

  /* ── State ── */
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [activeLocation, setActiveLocation] = useState("All Locations");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [typeFilters, setTypeFilters] = useState({ forSale: true, forRent: true, services: false });
  const [condFilters, setCondFilters] = useState({ newCond: true, usedCond: true });

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("agro_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  /* ── Fetch products ── */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);                    // getAllProducts returns res.data directly
      } catch {
        /* use empty state if backend offline */
      }
    };
    fetchProducts();
  }, []);

  /* ── Persist cart ── */
  useEffect(() => {
    localStorage.setItem("agro_cart", JSON.stringify(cart));
  }, [cart]);

  /* ── Cart actions ── */
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        emoji: CATEGORY_EMOJI[product.category] || "🌿",
        quantity: 1,
      }];
    });
  };

  const increaseQty = (id: number) =>
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));

  const decreaseQty = (id: number) =>
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter((i) => i.quantity > 0)
    );

  const removeItem = (id: number) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);
  const cartSubtotal = cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const cartTotal = cartSubtotal + (cart.length > 0 ? DELIVERY_FEE : 0);

  /* ── Place order ── */
  const placeOrder = () => {
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => { setOrderPlaced(false); setCartOpen(false); }, 3000);
  };

  /* ── Filter + sort ── */
  const filtered = products
    .filter((p) => {
      const matchCat = activeCategory === "All Categories" || p.category === activeCategory;
      const matchSub = activeSubcategory === "" || p.subcategory === activeSubcategory;
      const matchLoc = activeLocation === "All Locations" || p.location === activeLocation;
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchMin = minPrice === "" || p.price >= Number(minPrice);
      const matchMax = maxPrice === "" || p.price <= Number(maxPrice);
      return matchCat && matchSub && matchLoc && matchSearch && matchMin && matchMax;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return b.id - a.id;
    });

  const activeCategoryObj = CATEGORIES.find((c) => c.name === activeCategory);

  return (
    <div className="hm-page">

      {/* ── TOPBAR ── */}
      <div className="hm-topbar">
        <span className="hm-topbar-brand">AgroConnect</span>

        <div className="hm-topbar-search">
          <FaSearch size={13} />
          <input
            type="text"
            placeholder="Search crops, animals, machines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

       <div className="hm-topbar-right">
        <button className="hm-cart-pill" onClick={() => setCartOpen(true)}>
         <FaShoppingCart size={13} />
         Cart {cartCount > 0 && `(${cartCount})`}
         </button>

  {/* Avatar dropdown */}
       <div className="hm-avatar-menu">
        <div
        className="hm-avatar-chip"
        onClick={() => navigate("/profile")}
        title="Go to profile"
       >
       {avatarSrc ? (
        <img src={avatarSrc} alt="Profile" className="hm-avatar-chip-img" />
       ) : (
        <span>{initials}</span>
       )}
       </div>
    <button
      className="hm-logout-btn"
      onClick={() => { logout(); navigate("/login"); }}
      title="Logout"
    >
      <FaSignOutAlt size={13} /> Logout
    </button>
  </div>
 </div>
      </div>

      {/* ── HERO ── */}
      <div className="hm-hero">
        <div className="hm-hero-content">
          <h1>Marketplace</h1>
          <p>Buy and sell fresh agricultural products</p>
          <nav className="hm-hero-breadcrumb">
            <span onClick={() => navigate("/landing")}>Home</span>
            <FaChevronRight size={10} />
            <span className="hm-active">Marketplace</span>
          </nav>
        </div>
      </div>

      {/* ── CATEGORY PILLS ── */}
      <div className="hm-cat-strip">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            className={`hm-cat-pill ${activeCategory === cat.name ? "hm-cat-active" : ""}`}
            onClick={() => { setActiveCategory(cat.name); setActiveSubcategory(""); }}
          >
            <span className="hm-cat-icon">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* ── BODY ── */}
      <div className="hm-body">

        {/* ── SIDEBAR ── */}
        <aside className={`hm-sidebar ${sidebarOpen ? "hm-sidebar-open" : ""}`}>

          <div className="hm-sidebar-section">
            <h4>Type</h4>
            <ul className="hm-filter-check-list">
              {[
                { key: "forSale", label: "For Sale" },
                { key: "forRent", label: "For Rent" },
                { key: "services", label: "Services" },
              ].map(({ key, label }) => (
                <li key={key}>
                  <label className="hm-filter-check">
                    <input
                      type="checkbox"
                      checked={typeFilters[key as keyof typeof typeFilters]}
                      onChange={() =>
                        setTypeFilters((p) => ({ ...p, [key]: !p[key as keyof typeof typeFilters] }))
                      }
                    />
                    {label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="hm-sidebar-section">
            <h4>Price range (XAF)</h4>
            <div className="hm-price-row">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span>–</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="hm-sidebar-section">
            <h4>Location</h4>
            <input
              className="hm-loc-input"
              type="text"
              placeholder="e.g. Yaoundé"
              value={activeLocation === "All Locations" ? "" : activeLocation}
              onChange={(e) => setActiveLocation(e.target.value || "All Locations")}
            />
          </div>

          <div className="hm-sidebar-section">
            <h4>Condition</h4>
            <ul className="hm-filter-check-list">
              {[
                { key: "newCond", label: "New" },
                { key: "usedCond", label: "Used" },
              ].map(({ key, label }) => (
                <li key={key}>
                  <label className="hm-filter-check">
                    <input
                      type="checkbox"
                      checked={condFilters[key as keyof typeof condFilters]}
                      onChange={() =>
                        setCondFilters((p) => ({ ...p, [key]: !p[key as keyof typeof condFilters] }))
                      }
                    />
                    {label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
            <div className="hm-sidebar-section">
              <h4>Subcategory</h4>
              <ul className="hm-sidebar-list">
                <li
                  className={`hm-sidebar-item ${activeSubcategory === "" ? "hm-sidebar-active" : ""}`}
                  onClick={() => setActiveSubcategory("")}
                >
                  All
                </li>
                {activeCategoryObj.subcategories.map((sub) => (
                  <li
                    key={sub.name}
                    className={`hm-sidebar-item ${activeSubcategory === sub.name ? "hm-sidebar-active" : ""}`}
                    onClick={() => setActiveSubcategory(sub.name)}
                  >
                    {sub.icon} <span>{sub.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="hm-apply-btn">Apply Filters</button>
        </aside>

        {/* ── PRODUCTS AREA ── */}
        <div className="hm-products-area">
          <div className="hm-products-header">
            <h3>
              Showing{" "}
              <span style={{ color: "var(--accent)" }}>{filtered.length}</span>{" "}
              results
            </h3>
            <div className="hm-header-right">
              <button
                className="hm-filter-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <FaFilter size={12} /> Filters
              </button>
              <div className="hm-sort-wrap">
                <FaSortAmountDown size={12} color="var(--text-muted)" />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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
              {filtered.map((product) => (
                <div className="hm-product-card" key={product.id}>
                  {product.image ? (
                    <div className="hm-product-img-wrap">
                      <img
                        src={`${API_BASE}${product.image}`}
                        alt={product.name}
                        className="hm-product-img"
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
                    </div>
                    <div className="hm-card-btns">
                      <button
                        className="hm-details-btn"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        View details
                      </button>
                      <button
                        className="hm-cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        <FaShoppingCart size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
      </div>

      {/* ── FEATURES ── */}
      <div className="hm-features">
        {FEATURES.map((f) => (
          <div className="hm-feature-card" key={f.title}>
            <span className="hm-feat-icon">{f.icon}</span>
            <div>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer className="hm-footer">
        <div className="hm-footer-inner">
          <div className="hm-footer-brand">
            <div className="hm-brand-row">
              <img src={Logo} alt="Logo" className="hm-logo" />
            </div>
            <p>Connecting farmers with the community for a stronger agricultural future.</p>
            <div className="hm-socials">
              <FaFacebook /><FaTwitter /><FaInstagram /><FaWhatsapp />
            </div>
          </div>
          <div className="hm-footer-col">
            <h4>Quick links</h4>
            <ul>
              <li onClick={() => navigate("/landing")}>Home</li>
              <li onClick={() => navigate("/market")}>Marketplace</li>
              <li>About Us</li>
              <li onClick={() => navigate("/contact")}>Contact</li>
            </ul>
          </div>
          <div className="hm-footer-col">
            <h4>Categories</h4>
            <ul>
              <li>Crops & Seeds</li>
              <li>Animals</li>
              <li>Machines & Tools</li>
              <li>Services</li>
              <li>Medications</li>
            </ul>
          </div>
          <div className="hm-footer-col">
            <h4>Contact info</h4>
            <div className="hm-contact-row">
              <FaMapMarkerAlt size={11} /> Yaoundé, Cameroon
            </div>
            <div className="hm-contact-row">
              <FaPhone size={11} /> +237 600 000 000
            </div>
            <div className="hm-contact-row">
              <FaEnvelope size={11} /> info@agroconnect.cm
            </div>
          </div>
        </div>
        <div className="hm-footer-bottom">
          <span>© 2025 AgroConnect. All rights reserved.</span>
          <FaLeaf color="var(--accent-dark)" size={15} />
        </div>
      </footer>

      {/* ── FLOATING CART ── */}
      <button className="hm-fab-cart" onClick={() => navigate("/checkout")}>
        <FaShoppingCart size={18} />
        {cartCount > 0 && <span className="hm-fab-badge">{cartCount}</span>}
      </button>

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div className="hm-cart-backdrop" onClick={() => setCartOpen(false)}>
          <div className="hm-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="hm-cart-header">
              <h3>
                Your cart{" "}
                {cartCount > 0 && (
                  <span className="hm-cart-count">{cartCount}</span>
                )}
              </h3>
              <button
                className="hm-cart-close"
                onClick={() => setCartOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            {orderPlaced ? (
              <div className="hm-order-success">
                <FaCheckCircle size={40} color="var(--accent)" />
                <h4>Order placed!</h4>
                <p>Your order has been received and is being processed.</p>
              </div>
            ) : (
              <>
                <div className="hm-cart-items">
                  {cart.length === 0 ? (
                    <div className="hm-empty-cart">
                      <span>🛒</span>
                      <p>Your cart is empty.</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div className="hm-cart-item" key={item.id}>
                        <img src={`${API_BASE}${item.image}`} alt={item.name} />
                        <div className="hm-cart-item-info">
                          <h5>{item.name}</h5>
                          <p>{item.quantity} × {item.price.toLocaleString()} XAF</p>
                          <div className="hm-cart-item-actions">
                            <button onClick={() => decreaseQty(item.id)}>−</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increaseQty(item.id)}>+</button>
                            <button onClick={() => removeItem(item.id)}>
                              <FaTrash size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="hm-cart-summary">
                    <div className="hm-summary-row">
                      <span>Subtotal</span>
                      <span>{cartSubtotal.toLocaleString()} XAF</span>
                    </div>
                    <div className="hm-summary-row">
                      <span>Delivery</span>
                      <span>{DELIVERY_FEE} XAF</span>
                    </div>
                    <div className="hm-summary-row hm-summary-total">
                      <span>Total</span>
                      <span>{cartTotal.toLocaleString()} XAF</span>
                    </div>
                    <button
                      className="hm-place-order-btn"
                      onClick={() => navigate("/checkout")}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroMarket;
