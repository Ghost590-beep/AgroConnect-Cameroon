import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DELIVERY_FEE,
  CATEGORY_EMOJI,
  CATEGORIES,
  FEATURES,
} from "../../utils/constants";
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
import { FaShoppingCart } from "react-icons/fa";
import { filterProducts } from "../../utils/filterProducts";
import "../../styles/Market.css";

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
  const [typeFilters, setTypeFilters] = useState({
    forSale: true,
    forRent: true,
    services: false,
  });
  const [condFilters, setCondFilters] = useState({
    newCond: true,
    usedCond: true,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    category: "All Categories",
    subcategory: "",
    location: "All Locations",
    minPrice: "",
    maxPrice: "",
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("agro_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const loadProducts = async (queryFilters: Record<string, string>) => {
    setLoadingProducts(true);
    try {
      const params: Record<string, string> = {};
      if (queryFilters.keyword) params.keyword = queryFilters.keyword;
      if (queryFilters.category && queryFilters.category !== "All Categories") {
        params.category = queryFilters.category;
      }
      if (queryFilters.subcategory) params.subcategory = queryFilters.subcategory;
      if (queryFilters.location && queryFilters.location !== "All Locations") {
        params.location = queryFilters.location;
      }
      if (queryFilters.minPrice) params.minPrice = queryFilters.minPrice;
      if (queryFilters.maxPrice) params.maxPrice = queryFilters.maxPrice;

      const data = await getAllProducts(params);
      setProducts(data);
    } catch (error: any) {
      console.error(
        "Failed to load products",
        error.response?.status,
        error.response?.data || error.message,
      );
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadProducts(filters);
  }, [filters]);

  useEffect(() => {
    localStorage.setItem("agro_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    if (!authUser) {
      alert("Please log in to add items to cart");
      navigate("/login");
      return;
    }

    if (product.user_id === authUser.id) {
      alert(
        `You cannot add your own product (${product.name}) to the cart. Sellers cannot purchase their own listings.`,
      );
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          unit: product.unit,
          emoji: CATEGORY_EMOJI[product.category] || "🌿",
          quantity: 1,
        },
      ];
    });
  };

  const increaseQty = (id: number) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );

  const decreaseQty = (id: number) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );

  const removeItem = (id: number) =>
    setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);
  const cartSubtotal = cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const cartTotal = cartSubtotal + (cart.length > 0 ? DELIVERY_FEE : 0);

  const placeOrder = () => {
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      setOrderPlaced(false);
      setCartOpen(false);
    }, 3000);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setFilters((prev) => ({ ...prev, keyword: value }));
  };

  const applyFilters = () => {
    setFilters({
      keyword: searchTerm,
      category: activeCategory,
      subcategory: activeSubcategory,
      location: activeLocation,
      minPrice,
      maxPrice,
    });
  };

  const filteredProducts = filterProducts(products, {
    keyword: filters.keyword,
    category: filters.category,
    subcategory: filters.subcategory,
    location: filters.location,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  }).sort((a, b) => {
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
        onLogout={() => {
          logout();
          navigate("/login");
        }}
        onProfileClick={() => navigate("/profile")}
      />
      <MarketHero onNavigateHome={() => navigate("/landing")} />
      <div className="hm-cat-strip">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            className={`hm-cat-pill ${activeCategory === cat.name ? "hm-cat-active" : ""}`}
            onClick={() => {
              setActiveCategory(cat.name);
              setActiveSubcategory("");
            }}
          >
            <span className="hm-cat-icon">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>
      <div className="hm-body">
        <Sidebar
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          typeFilters={typeFilters}
          onTypeFilterChange={(key) =>
            setTypeFilters((p) => ({
              ...p,
              [key]: !p[key as keyof typeof typeFilters],
            }))
          }
          condFilters={condFilters}
          onCondFilterChange={(key) =>
            setCondFilters((p) => ({
              ...p,
              [key]: !p[key as keyof typeof condFilters],
            }))
          }
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          activeLocation={activeLocation}
          onLocationChange={setActiveLocation}
          activeSubcategory={activeSubcategory}
          onSubcategoryChange={setActiveSubcategory}
          activeCategoryObj={CATEGORIES.find((c) => c.name === activeCategory)}
          onApplyFilters={applyFilters}
        />
        <ProductGrid
          filtered={filteredProducts}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onAddToCart={addToCart}
          onViewDetails={(id) => navigate(`/product/${id}`)}
          onCheckout={() => navigate("/checkout")}
          cartCount={cartCount}
          currentUserId={authUser?.id}
        />
      </div>
      <MarketFeatures features={FEATURES} />
      <MarketFooter onNavigate={navigate} />
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
