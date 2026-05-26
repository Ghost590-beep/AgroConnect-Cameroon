import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./heroMarket.css";
import Logo from "../../../../assets/logo (3).png";

import {
  FaSearch,
  FaTimes,
  FaLeaf,
  FaAppleAlt,
  FaSeedling,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaCrow,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";

/* TYPES */
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Product {
  id: number;
  category: string;
  name: string;
  farmer: string;
  location: string;
  price: number;
  image: string;
  description?: string;
}

/* CATEGORIES */
const categories = [
  { name: "All Categories", icon: <FaLeaf /> },
  { name: "Vegetables", icon: <FaLeaf /> },
  { name: "Fruits", icon: <FaAppleAlt /> },
  { name: "Grains", icon: <FaSeedling /> },
  { name: "Livestock", icon: <FaCrow /> },
  { name: "Seeds", icon: <FaSeedling /> },
  { name: "Fertilizers", icon: <FaLeaf /> },
];

/* FEATURES */
const features = [
  {
    title: "Safe & Secure",
    text: "Your transactions are protected",
    icon: <FaShieldAlt />,
  },
  {
    title: "Quality Products",
    text: "From trusted local farmers",
    icon: <FaLeaf />,
  },
  {
    title: "Fast Delivery",
    text: "Quick and reliable delivery",
    icon: <FaTruck />,
  },
  {
    title: "24/7 Support",
    text: "We are here to help",
    icon: <FaHeadset />,
  },
];

/* COMPONENT */
const HeroMarket: React.FC = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  const [activeCategory, setActiveCategory] =
    useState("All Categories");

  const [searchTerm, setSearchTerm] = useState("");

  /* REAL PRODUCTS FROM BACKEND */
  const [products, setProducts] =
    useState<Product[]>([]);

  /* 🛒 CART */
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");

    return saved ? JSON.parse(saved) : [];
  });

  /* CHECKOUT */
  const [checkoutOpen, setCheckoutOpen] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    payment: "Cash",
  });

  /* FETCH PRODUCTS */
  useEffect(() => {

    const fetchProducts = async () => {
      try {

        const res = await axios.get(
          "http://localhost:5000/api/products"
        );

        setProducts(res.data);

      } catch (err) {
        console.log(
          "Failed to fetch products",
          err
        );
      }
    };

    fetchProducts();

  }, []);

  /* SAVE CART */
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  /* ADD TO CART */
  const addToCart = (product: Product) => {

    setCart((prev) => {

      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  /* CART CONTROLS */
  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => setCart([]);

  /* TOTALS */
  const cartCount = cart.reduce(
    (a, b) => a + b.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  /* FILTER PRODUCTS */
  const filteredProducts = products.filter(
    (product) => {

      const matchesCategory =
        activeCategory === "All Categories" ||
        product.category === activeCategory;

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||

        product.farmer
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||

        product.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return (
        matchesCategory &&
        matchesSearch
      );
    }
  );

  /* PLACE ORDER */
  const placeOrder = () => {

    if (
      !form.name ||
      !form.phone ||
      !form.location
    ) {
      alert("Please fill all fields");
      return;
    }

    alert(
      `Order placed successfully!\nTotal: ${cartTotal} FCFA`
    );

    clearCart();

    setCheckoutOpen(false);

    setForm({
      name: "",
      phone: "",
      location: "",
      payment: "Cash",
    });
  };

  return (
    <div className="heros-container">

      {/* HEADER */}
      <div className="header">

        <img
          src={Logo}
          alt="Logo"
          className="Logo"
        />

        <ul className="header-menu">
          <li onClick={() => navigate("/landing")}>Dashboard</li>
          <li onClick={() => navigate("/market")}>Marketplace</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>

        <div className="header-right">

          {/* SEARCH ICON */}
          <div
            className="search-icon"
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
          >
            {searchOpen
              ? <FaTimes />
              : <FaSearch />}
          </div>

          {/* CART ICON */}
          <div
            className="cart-icon"
            onClick={() =>
              setCheckoutOpen(true)
            }
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </div>

          <button className="btn sign-in">
            Sign In
          </button>

          <button className="btn login">
            Login
          </button>

        </div>

        {/* SEARCH BAR */}
        {searchOpen && (
          <div className="search-bar">

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>
        )}

      </div>

      {/* HERO */}
      <div className="market-hero">

        <div className="market-overlay"></div>

        <div className="market-content">

          <h1>
            Find Fresh & Quality
            <br />
            Agricultural Products
          </h1>

          <p>
            Buy directly from trusted farmers near you.
          </p>

          <div className="market-search">

            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            <button className="search-btn">
              <FaSearch />
            </button>

            <button className="sell-btn">
              Sell Your Products
            </button>

          </div>

        </div>
      </div>

      {/* CATEGORIES */}
      <div className="categories-section">

        {categories.map((category, index) => (

          <div
            key={index}
            className={`category-card ${
              activeCategory === category.name
                ? "active-category"
                : ""
            }`}
            onClick={() =>
              setActiveCategory(category.name)
            }
          >

            <span className="category-icon">
              {category.icon}
            </span>

            <p>{category.name}</p>

          </div>
        ))}

      </div>

      {/* PRODUCTS */}
      <div className="featured-section">

        <div className="featured-header">
          <h2>Featured Products</h2>
        </div>

        <div className="products-grid">

          {filteredProducts.length === 0 ? (

            <p>No products found</p>

          ) : (

            filteredProducts.map((product) => (

              <div
                className="product-card"
                key={product.id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="product-info">

                  <h3>{product.name}</h3>

                  <p>
                    👨🏾‍🌾 {product.farmer}
                  </p>

                  <p>
                    📍 {product.location}
                  </p>

                  <h4>
                    {product.price} FCFA
                  </h4>

                  <button
                    className="cart-btn"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    Add to Cart
                  </button>

                </div>
              </div>
            ))
          )}

        </div>

      </div>

      {/* CHECKOUT */}
      {checkoutOpen && (

        <div className="cart-dropdown">

          <div className="cart-header">

            <h3>Checkout</h3>

            <button
              onClick={() =>
                setCheckoutOpen(false)
              }
            >
              <FaTimes />
            </button>

          </div>

          {/* CART ITEMS */}
          {cart.length === 0 ? (

            <p>Your cart is empty</p>

          ) : (

            cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <img src={item.image} />

                <div>
                  <p>{item.name}</p>

                  <p>
                    {item.price * item.quantity}
                    {" "}FCFA
                  </p>
                </div>

                <div>

                  <button
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQty(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                <FaTrash
                  onClick={() =>
                    removeItem(item.id)
                  }
                />

              </div>
            ))
          )}

          {/* TOTAL */}
          <div className="cart-summary">
            <h3>
              Total: {cartTotal} FCFA
            </h3>
          </div>

          {/* FORM */}
          <div className="checkout-form">

            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
            />

            <select
              value={form.payment}
              onChange={(e) =>
                setForm({
                  ...form,
                  payment: e.target.value,
                })
              }
            >
              <option>Cash</option>
              <option>
                MTN Mobile Money
              </option>
              <option>
                Orange Money
              </option>
            </select>

            <button onClick={placeOrder}>
              Place Order
            </button>

          </div>

        </div>
      )}

      {/* FEATURES */}
      <div className="features-section">

        {features.map((feature, index) => (

          <div
            className="feature-card"
            key={index}
          >

            <span className="feature-icon">
              {feature.icon}
            </span>

            <div>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default HeroMarket;