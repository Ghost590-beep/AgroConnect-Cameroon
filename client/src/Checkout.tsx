import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheck,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import "../src/styles/Checkout.css";

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
  return saved ? JSON.parse(saved) : [];});
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const payOptions = [
    { id: "cash", label: "Cash on delivery", desc: "Pay when you receive your order" },
    { id: "mobile", label: "Mobile money", desc: "Pay using M-Pesa or other mobile money services" },
    { id: "bank", label: "Bank transfer", desc: "Make a payment directly to our bank account" },
  ];

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

            {/* DELIVERY */}
            <div className="co-card">
              <div className="co-section-title">
                <span className="co-num">1</span>
                Delivery information
              </div>
              <div className="co-form-row">
                <div className="co-field">
                  <label>Full name</label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full name" />
                </div>
                <div className="co-field">
                  <label>Phone number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+254 700 000 000" />
                </div>
              </div>
              <div className="co-field co-full">
                <label>Email address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
              </div>
              <div className="co-field co-full">
                <label>Delivery location</label>
                <select name="location" value={form.location} onChange={handleChange}>
                  <option>Nairobi, Kenya</option>
                  <option>Mombasa, Kenya</option>
                  <option>Kisumu, Kenya</option>
                  <option>Nakuru, Kenya</option>
                </select>
              </div>
              <div className="co-field co-full">
                <label>Detailed address</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows={3} placeholder="Street, area, city..." />
              </div>
              <label className="co-checkbox">
                <input type="checkbox" checked={saveAddress} onChange={() => setSaveAddress(!saveAddress)} />
                <span className="co-checkmark">{saveAddress && <FaCheck size={9} />}</span>
                Save this address for future orders
              </label>
            </div>

            {/* PAYMENT */}
            <div className="co-card">
              <div className="co-section-title">
                <span className="co-num">2</span>
                Payment method
              </div>
              {payOptions.map((opt) => (
                <div
                  key={opt.id}
                  className={`co-pay-option ${payMethod === opt.id ? "co-pay-selected" : ""}`}
                  onClick={() => setPayMethod(opt.id)}
                >
                  <div className={`co-radio ${payMethod === opt.id ? "co-radio-on" : ""}`}>
                    {payMethod === opt.id && <span className="co-radio-dot" />}
                  </div>
                  <div className="co-pay-info">
                    <h4>{opt.label}</h4>
                    <p>{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* NOTES */}
            <div className="co-card">
              <div className="co-section-title">
                <span className="co-num">3</span>
                Order notes (optional)
              </div>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Add any special instructions for your order..."
              />
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="co-right">
            <div className="co-card">
              <div className="co-section-title" style={{ marginBottom: "1rem" }}>
                Order summary
              </div>

              <div className="co-items">
                {cart.map((item) => (
                  <div className="co-item" key={item.id}>
                    <div className="co-item-img">
                     {item.image ? (
                      <img
                      src={item.image}
                      alt={item.name}
                      style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                        }}
                       />
                      ) : (
                       item.emoji
                        )}
                    </div>
                    <div className="co-item-info">
                      <span className="co-item-name">{item.name}</span>
                      <span className="co-item-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="co-item-price">FCFA {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="co-totals">
                <div className="co-total-row">
                  <span>Subtotal</span>
                  <span>FCFA {subtotal}</span>
                </div>
                <div className="co-total-row">
                  <span>Delivery fee</span>
                  <span>FCFA {DELIVERY_FEE}</span>
                </div>
                <div className="co-total-row co-grand">
                  <span>Total</span>
                  <span className="co-grand-val">FCFA {total}</span>
                </div>
              </div>

              <div className="co-support-banner">
                <div className="co-support-icon">
                  <FaLeaf color="#fff" size={14} />
                </div>
                <div>
                  <h4>Support local farmers</h4>
                  <p>Thank you for supporting local farmers and sustainable agriculture!</p>
                </div>
              </div>

              <button className="co-place-btn" onClick={handlePlaceOrder}>
                <FaLock size={14} /> Place order
              </button>
              <p className="co-pay-note">You will pay FCFA {total} on delivery</p>
            </div>
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
            <ul><li>Vegetables</li><li>Fruits</li><li>Livestock</li><li>Grains</li></ul>
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
