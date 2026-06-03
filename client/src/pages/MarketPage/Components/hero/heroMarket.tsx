import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaSearch, FaTimes, FaLeaf, FaAppleAlt, FaSeedling,
  FaTruck, FaShieldAlt, FaHeadset, FaShoppingCart,
  FaTrash, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaFacebook, FaTwitter, FaInstagram, FaWhatsapp,
  FaFilter, FaSortAmountDown, FaChevronRight,
  FaCheckCircle, FaCrow, FaTractor, FaHandshake,
  FaCapsules, FaTools, FaTint, FaUserTie,
  FaBug, FaFlask, FaCheese, FaChalkboardTeacher, FaStore,
} from "react-icons/fa";
import Logo from "../../../../assets/logo (3).png";
import "../hero/heroMarket.css";

/* ─── TYPES ─── */
interface Product {
  id: number;
  category: string;
  subcategory: string;
  unit: string;
  stock_quantity: number;
  name: string;
  farmer: string;
  location: string;
  price: number;
  image: string;
  description?: string;
  status?: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  emoji: string;
  quantity: number;
}

interface SubCategories {
  name: string;
  icon: React.ReactNode;
}

interface Categories {
  name: string;
  icon: React.ReactNode;
  subcategories: SubCategories[];
}

/* ─── CONSTANTS ─── */
const CATEGORIES: Categories[] = [
  {
    name: "All Categories",
    icon: <FaLeaf />,
    subcategories: [],
  },
  {
    name: "Crops & Seeds",
    icon: <FaLeaf />,
    subcategories: [
      { name: "Vegetables", icon: <FaLeaf /> },
      { name: "Fruits", icon: <FaAppleAlt /> },
      { name: "Grains", icon: <FaSeedling /> },
      { name: "Seeds", icon: <FaSeedling /> },
      { name: "Dairy Products", icon: <FaCheese /> },
    ],
  },
  {
    name: "Animals",
    icon: <FaCrow />,
    subcategories: [
      { name: "Livestock", icon: <FaCrow /> },
    ],
  },
  {
    name: "Machines & Tools",
    icon: <FaTractor />,
    subcategories: [
      { name: "Tractors", icon: <FaTractor /> },
      { name: "Hand Tools", icon: <FaTools /> },
      { name: "Irrigation Equipment", icon: <FaTint /> },
      { name: "Harvesting Equipment", icon: <FaTools /> },
    ],
  },
  {
    name: "Services",
    icon: <FaHandshake />,
    subcategories: [
      { name: "Farm Labour", icon: <FaUserTie /> },
      { name: "Transportation", icon: <FaTruck /> },
      { name: "Consultancy", icon: <FaHandshake /> },
      { name: "Equipment Rental", icon: <FaTractor /> },
    ],
  },
  {
    name: "Medications",
    icon: <FaCapsules />,
    subcategories: [
      { name: "Animal Medicine", icon: <FaCapsules /> },
      { name: "Crop Protection", icon: <FaBug /> },
      { name: "Supplements", icon: <FaFlask /> },
    ],
  },
  {
    name: "Training",
    icon: <FaChalkboardTeacher />,
    subcategories: [
      { name: "Farming Techniques", icon: <FaChalkboardTeacher /> },
      { name: "Sustainable Agriculture", icon: <FaLeaf /> },
      { name: "Market Access", icon: <FaStore /> },
    ],
  },
];

const LOCATIONS = ["All Locations", "Yaounde", "Bamenda", "Bafoussam", "Douala", "Nigeria", "Other"];

const FEATURES = [
  { title: "Safe & Secure", text: "Your transactions are protected", icon: <FaShieldAlt /> },
  { title: "Quality Products", text: "From trusted local farmers", icon: <FaLeaf /> },
  { title: "Fast Delivery", text: "Quick and reliable delivery", icon: <FaTruck /> },
  { title: "24/7 Support", text: "We are here to help", icon: <FaHeadset /> },
];

const CATEGORY_EMOJI: Record<string, string> = {
  "Crops & Seeds": "🌿",
  Animals: "🐄",
  "Machines & Tools": "🚜",
  Services: "🤝",
  Medications: "💊",
  Training: "📚",
};

const BG_MAP: Record<string, string> = {
  Vegetables: "#f0faf0", Fruits: "#fffde7", Grains: "#fff8e1",
  Livestock: "#fbe9e7", Seeds: "#f1f8e9", Fertilizers: "#e8f5e9", "Dairy Products": "#e3f2fd",
};

const DELIVERY_FEE = 50;

/* ─── COMPONENT ─── */
const HeroMarket: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [activeLocation, setActiveLocation] = useState("All Locations");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("agro_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "", phone: "", location: "", payment: "Cash on delivery",
  });

  /* FETCH */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch {
        /* use empty state if backend offline */
      }
    };
    fetchProducts();
  }, []);

  /* PERSIST CART */
  useEffect(() => {
    localStorage.setItem("agro_cart", JSON.stringify(cart));
  }, [cart]);

  /* CART ACTIONS */
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, {
        id: product.id, name: product.name, price: product.price,
        image: product.image, emoji: CATEGORY_EMOJI[product.category] || "🌿", quantity: 1,
      }];
    });
  };

  const increaseQty = (id: number) =>
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));

  const decreaseQty = (id: number) =>
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i).filter((i) => i.quantity > 0));

  const removeItem = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);
  const cartSubtotal = cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const cartTotal = cartSubtotal + (cart.length > 0 ? DELIVERY_FEE : 0);

  /* PLACE ORDER */
  const placeOrder = () => {
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.location) {
      alert("Please fill all required fields.");
      return;
    }
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => { setOrderPlaced(false); setCartOpen(false); }, 3000);
    setCheckoutForm({ name: "", phone: "", location: "", payment: "Cash on delivery" });
  };

  /* FILTER + SORT */
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

  /* Active category object (for subcategory list) */
  const activeCategoryObj = CATEGORIES.find((c) => c.name === activeCategory);

  return (
    <div className="hm-page">

      {/* ── HERO ── */}
      <div className="hm-hero">
        <div className="hm-hero-overlay" />
        <div className="hm-hero-content">
          <h1>Marketplace</h1>
          <p>Buy and sell fresh agricultural products</p>
          <nav className="hm-hero-breadcrumb">
            <span onClick={() => navigate("/landing")}>Home</span>
            <FaChevronRight size={10} />
            <span className="hm-active">Marketplace</span>
          </nav>
          <div className="hm-hero-search">
            <FaSearch className="hm-search-ico" />
            <input
              type="text"
              placeholder="Search for products, farmers or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={activeCategory} onChange={(e) => { setActiveCategory(e.target.value); setActiveSubcategory(""); }}>
              {CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}
            </select>
            <select value={activeLocation} onChange={(e) => setActiveLocation(e.target.value)}>
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
            <button className="hm-search-btn"><FaSearch /></button>
          </div>
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
            <h4>Categories</h4>
            <ul className="hm-sidebar-list">
              {CATEGORIES.map((c) => (
                <li
                  key={c.name}
                  className={`hm-sidebar-item ${activeCategory === c.name ? "hm-sidebar-active" : ""}`}
                  onClick={() => { setActiveCategory(c.name); setActiveSubcategory(""); }}
                >
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                  <span className="hm-count">
                    ({c.name === "All Categories"
                      ? products.length
                      : products.filter((p) => p.category === c.name).length})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── SUBCATEGORIES (shown when a category with subs is active) ── */}
          {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
            <div className="hm-sidebar-section">
              <h4>Subcategories</h4>
              <ul className="hm-sidebar-list">
                <li
                  className={`hm-sidebar-item ${activeSubcategory === "" ? "hm-sidebar-active" : ""}`}
                  onClick={() => setActiveSubcategory("")}
                >
                  <span>All</span>
                </li>
                {activeCategoryObj.subcategories.map((sub) => (
                  <li
                    key={sub.name}
                    className={`hm-sidebar-item ${activeSubcategory === sub.name ? "hm-sidebar-active" : ""}`}
                    onClick={() => setActiveSubcategory(sub.name)}
                  >
                    {sub.icon}
                    <span>{sub.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="hm-sidebar-section">
            <h4>Price range</h4>
            <div className="hm-price-row">
              <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              <span>to</span>
              <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <button className="hm-apply-btn" onClick={() => {}}>Apply filter</button>
          </div>

          <div className="hm-sidebar-section">
            <h4>Location</h4>
            <ul className="hm-loc-list">
              {LOCATIONS.map((l) => (
                <li
                  key={l}
                  className={`hm-loc-item ${activeLocation === l ? "hm-loc-active" : ""}`}
                  onClick={() => setActiveLocation(l)}
                >{l}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── PRODUCTS AREA ── */}
        <div className="hm-products-area">
          <div className="hm-products-header">
            <h3>
              {activeCategory === "All Categories" ? "All products" : activeCategory}
              {activeSubcategory && <> &rsaquo; {activeSubcategory}</>}
              <span className="hm-count"> ({filtered.length})</span>
            </h3>
            <div className="hm-header-right">
              <button className="hm-filter-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <FaFilter size={12} /> Filters
              </button>
              <div className="hm-sort-wrap">
                <FaSortAmountDown size={12} />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="newest">Newest first</option>
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
                    <img src={product.image} alt={product.name} className="hm-product-img" />
                  ) : (
                    <div className="hm-product-emoji" style={{ background: BG_MAP[product.subcategory] || "#f5f5f0" }}>
                      {CATEGORY_EMOJI[product.category] || "🌿"}
                    </div>
                  )}
                  <div className="hm-product-body">
                    <h3>{product.name}</h3>
                    <p className="hm-farmer"><FaLeaf size={10} color="#2E7D32" /> {product.farmer}</p>
                    <p className="hm-location"><FaMapMarkerAlt size={10} color="#999" /> {product.location}</p>
                    <div className="hm-category-tag">
                      {CATEGORY_EMOJI[product.category]}
                      <span>{product.category}</span>
                    </div>
                    <div className="hm-subcategory-tag">
                      {product.subcategory}
                    </div>
                    <div className="hm-price-row-card">
                      <span className="hm-price">FCFA {product.price}</span>
                      <span className="hm-unit">/ {product.unit}</span>
                    </div>
                    <div className="hm-stock">
                      Available: {product.stock_quantity} {product.unit}
                    </div>
                    <div className="hm-card-btns">
                      <button className="hm-details-btn" onClick={() => navigate(`/product/${product.id}`)}>
                        View details
                      </button>
                      <button className="hm-cart-btn" onClick={() => addToCart(product)}>
                        <FaShoppingCart size={12} /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className="hm-pagination">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`hm-page-btn ${p === 1 ? "hm-page-active" : ""}`}>{p}</button>
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
            <div className="hm-contact-row"><FaMapMarkerAlt size={11} /> Nairobi, Kenya</div>
            <div className="hm-contact-row"><FaPhone size={11} /> +254 700 000 000</div>
            <div className="hm-contact-row"><FaEnvelope size={11} /> info@agrofamily.com</div>
          </div>
        </div>
        <div className="hm-footer-bottom">
          <span>© 2025 AgroFamily. All rights reserved.</span>
          <FaLeaf color="#4CAF50" size={16} />
        </div>
      </footer>

      {/* ── FLOATING CART BUTTON ── */}
       <button
       className="hm-fab-cart"
       onClick={() => navigate("/checkout")}
       >
       <FaShoppingCart size={18} />
       {cartCount > 0 && (
       <span className="hm-fab-badge">{cartCount}</span>
       )}
</button>

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div className="hm-cart-backdrop" onClick={() => setCartOpen(false)}>
          <div className="hm-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="hm-cart-header">
              <h3>Your cart {cartCount > 0 && <span className="hm-cart-count">{cartCount}</span>}</h3>
              <button className="hm-cart-close" onClick={() => setCartOpen(false)}><FaTimes /></button>
            </div>

            {orderPlaced ? (
              <div className="hm-order-success">
                <FaCheckCircle size={40} color="#2E7D32" />
                <h4>Order placed!</h4>
                <p>Your order has been received and is being processed.</p>
              </div>
            ) : (
              <>
                <div className="hm-cart-items">
                  {cart.map((item) => (
                    <div className="hm-cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="hm-cart-item-info">
                        <h5>{item.name}</h5>
                        <p>{item.emoji} {item.quantity} x ${item.price.toFixed(2)}</p>
                        <div className="hm-cart-item-actions">
                          <button onClick={() => decreaseQty(item.id)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => increaseQty(item.id)}>+</button>
                          <button onClick={() => removeItem(item.id)}><FaTrash /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hm-cart-summary">
                  <div className="hm-summary-row">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="hm-summary-row">
                    <span>Delivery</span>
                    <span>${cart.length > 0 ? DELIVERY_FEE.toFixed(2) : "0.00"}</span>
                  </div>
                  <div className="hm-summary-row hm-summary-total">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    className="hm-place-order-btn"
                    onClick={() => navigate("/checkout")}
                    >
                    Proceed to Checkout
                     </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroMarket;
