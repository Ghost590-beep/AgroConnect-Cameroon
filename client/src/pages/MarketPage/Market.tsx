import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DELIVERY_FEE, CATEGORY_EMOJI, CATEGORIES, FEATURES } from "../../utils/constants";
import type { Product } from "../../types/Product";
import type { CartItem } from "../../types/Cart";
import { useAuth } from "../../context/AuthContext";
import { getAllProducts } from "../../services/productService";
import Topbar from "../../pages/MarketPage/Components/Topbar/Topbar";
import MarketHero from "../../pages/MarketPage/Components/MarketHero/heroMarket";
import Sidebar from "../../pages/MarketPage/Components/Sidebar/Siderbar";
import ProductGrid from "../../pages/MarketPage/Components/ProductGrid/ProductGrid";
import CartDrawer from "../../pages/MarketPage/Components/CartDrawer/CartDrawer";
import MarketFeatures from "../../pages/MarketPage/Components/MarketFeatures/MarketFeatures";
import MarketFooter from "../../pages/MarketPage/Components/MarketFooter/MarketFooter";
import type { Category } from "../../utils/constants";
import { FaShoppingCart } from "react-icons/fa";
import "../../styles/Market.css"

const Market: React.FC = () => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch {}
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("agro_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, {
        id: product.id, name: product.name, price: product.price,
        image: product.image, unit: product.unit,
        emoji: CATEGORY_EMOJI[product.category] || "🌿", quantity: 1,
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

  const placeOrder = () => {
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => { setOrderPlaced(false); setCartOpen(false); }, 3000);
  };

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

  return (
    <div className="hm-page">
      <Topbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        authUser={authUser}
        onLogout={() => { logout(); navigate("/login"); }}
        onProfileClick={() => navigate("/profile")}
      />
      <MarketHero onNavigateHome={() => navigate("/landing")} />
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
      <div className="hm-body">
        <Sidebar
          sidebarOpen={sidebarOpen}
          typeFilters={typeFilters}
          onTypeFilterChange={(key) => setTypeFilters((p) => ({ ...p, [key]: !p[key as keyof typeof typeFilters] }))}
          condFilters={condFilters}
          onCondFilterChange={(key) => setCondFilters((p) => ({ ...p, [key]: !p[key as keyof typeof condFilters] }))}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          activeLocation={activeLocation}
          onLocationChange={setActiveLocation}
          activeSubcategory={activeSubcategory}
          onSubcategoryChange={setActiveSubcategory}
          activeCategoryObj={CATEGORIES.find((c) => c.name === activeCategory)}
        />
        <ProductGrid
          filtered={filtered}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onAddToCart={addToCart}
          onViewDetails={(id) => navigate(`/product/${id}`)}
          onCheckout={() => navigate("/checkout")}
          cartCount={cartCount}
        />
      </div>
      <MarketFeatures features={FEATURES} />
      <MarketFooter
        onNavigate={navigate}
      />
      <button className="hm-fab-cart" onClick={() => navigate("/checkout")}>
        <FaShoppingCart size={18} />
        {cartCount > 0 && <span className="hm-fab-badge">{cartCount}</span>}
      </button>
      <CartDrawer
        open={cartOpen}
        cart={cart}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        cartTotal={cartTotal}
        orderPlaced={orderPlaced}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
        onCheckout={() => navigate("/checkout")}
      />
    </div>
  );
};

export default Market;