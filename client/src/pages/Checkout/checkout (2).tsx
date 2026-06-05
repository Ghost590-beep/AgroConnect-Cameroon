import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf, FaMapMarkerAlt, FaPhone,
  FaEnvelope, FaFacebook, FaTwitter,
  FaInstagram, FaWhatsapp,
} from "react-icons/fa";
import DeliveryForm from "../Checkout/Components/DeliveryForm/DeliveryForm";
import PaymentMethod from "../Checkout/Components/PaymentMethod/PaymentMethod";
import OrderNotes from "../Checkout/Components/OrderNotes/OrderNotes";
import OrderSummary from "../Checkout/Components/OrderSummary/OrderSummary";
import "../../styles/Checkout.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  unit: string;
  emoji: string;
  quantity: number;
  image: string;
}

const DELIVERY_FEE = 50;

const Checkout: React.FC = () => {
  const navigate = useNavigate();

  const [cart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("agro_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [payMethod, setPayMethod] = useState("cash");
  const [saveAddress, setSaveAddress] = useState(true);
  const [form, setForm] = useState({
    fullName: "John Doe",
    phone: "+254 712 345 678",
    email: "john.doe@gmail.com",
    location: "Nairobi, Kenya",
    address: "123 Green Street, Nairobi, Kenya",
    notes: "",
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + DELIVERY_FEE;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    if (!form.fullName || !form.phone || !form.location) {
      alert("Please fill all required fields.");
      return;
    }
    alert("Order placed successfully!");
    localStorage.removeItem("agro_cart");
    navigate("/market");
  };

  return (
    <div className="co-page">
      <div className="co-container">

        <div className="co-header">
          <h1 className="co-title">Checkout</h1>
          <nav className="co-breadcrumb">
            <span onClick={() => navigate("/market")}>Home</span>
            <span className="co-sep">&rsaquo;</span>
            <span onClick={() => navigate("/market")}>Cart</span>
            <span className="co-sep">&rsaquo;</span>
            <span className="co-active">Checkout</span>
          </nav>
        </div>

        <div className="co-layout">

          {/* ── LEFT ── */}
          <div className="co-left">
            <DeliveryForm
              form={form}
              saveAddress={saveAddress}
              onChange={handleChange}
              onToggleSave={() => setSaveAddress((v) => !v)}
            />
            <PaymentMethod
              payMethod={payMethod}
              onSelect={setPayMethod}
            />
            <OrderNotes
              notes={form.notes}
              onChange={handleChange}
            />
          </div>

          {/* ── RIGHT ── */}
          <div className="co-right">
            <OrderSummary
              cart={cart}
              subtotal={subtotal}
              deliveryFee={DELIVERY_FEE}
              total={total}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="co-footer">
        <div className="co-footer-inner">
          <div className="co-footer-brand">
            <div className="co-brand-row">
              <FaLeaf color="#4CAF50" size={16} />
              <span>AgroFamily</span>
            </div>
            <p>Connecting farmers with the community for a stronger agricultural future.</p>
            <div className="co-socials">
              <FaFacebook /><FaTwitter /><FaInstagram /><FaWhatsapp />
            </div>
          </div>
          <div className="co-footer-col">
            <h4>Quick links</h4>
            <ul>
              <li onClick={() => navigate("/landing")}>Home</li>
              <li onClick={() => navigate("/market")}>Marketplace</li>
              <li>About Us</li>
              <li onClick={() => navigate("/contact")}>Contact</li>
            </ul>
          </div>
          <div className="co-footer-col">
            <h4>Categories</h4>
            <ul>
              <li>Vegetables</li>
              <li>Fruits</li>
              <li>Livestock</li>
              <li>Grains</li>
            </ul>
          </div>
          <div className="co-footer-col">
            <h4>Contact info</h4>
            <div className="co-contact-row"><FaMapMarkerAlt size={11} /> Nairobi, Kenya</div>
            <div className="co-contact-row"><FaPhone size={11} /> +254 700 000 000</div>
            <div className="co-contact-row"><FaEnvelope size={11} /> info@agrofamily.com</div>
          </div>
        </div>
        <div className="co-footer-bottom">
          <span>© 2025 AgroFamily. All rights reserved.</span>
          <FaLeaf color="#4CAF50" size={16} />
        </div>
      </footer>
    </div>
  );
};

export default Checkout;