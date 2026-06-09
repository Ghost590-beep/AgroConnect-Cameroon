import React from "react";
import { FaLeaf, FaLock } from "react-icons/fa";
import "./OrderSummary.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  emoji: string;
  image: string;
}

interface OrderSummaryProps {
  cart: CartItem[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  payMethod: string;
  onPlaceOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cart,
  total,
  subtotal,
  deliveryFee,
  payMethod,
  onPlaceOrder,
}) => {
  return (
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
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          <span>FCFA {deliveryFee}</span>
        </div>
        <div className="co-total-row">
          <span>Payment method</span>
          <span>
            {payMethod === "momo" && "M-Pesa / Mobile Money"}
            {payMethod === "orange-money" && "Orange Money"}
            {payMethod === "bank" && "Bank transfer"}
            {payMethod === "cash" && "Cash on delivery"}
          </span>
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

      <button className="co-place-btn" onClick={onPlaceOrder}>
        <FaLock size={14} /> Place order
      </button>
      <p className="co-pay-note">
        {payMethod === "momo" &&
          "Please complete payment through your mobile money app once your order is confirmed."}
        {payMethod === "orange-money" &&
          "Orange Money instructions will be provided on confirmation."}
        {payMethod === "bank" &&
          "Transfer the total amount to the bank account details provided after placing the order."}
        {payMethod === "cash" &&
          "You will pay FCFA " + total + " on delivery."}
      </p>
    </div>
  );
};

export default OrderSummary;