import React from "react";
import { FaTimes, FaTrash, FaCheckCircle } from "react-icons/fa";
import { DELIVERY_FEE } from "../../../../utils/constants";
import type { CartItem } from "../../../../types/Cart";
import "../CartDrawer/CartDrawer.css";

interface Props {
  open: boolean;
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartTotal: number;
  orderPlaced: boolean;
  onClose: () => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<Props> = ({
  open, cart, cartCount, cartSubtotal, cartTotal,
  orderPlaced, onClose, onIncrease, onDecrease, onRemove, onCheckout,
}) => {
  if (!open) return null;

  return (
    <div className="hm-cart-backdrop" onClick={onClose}>
      <div className="hm-cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="hm-cart-header">
          <h3>Your cart {cartCount > 0 && <span className="hm-cart-count">{cartCount}</span>}</h3>
          <button className="hm-cart-close" onClick={onClose}><FaTimes /></button>
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
                    <img src={item.image} alt={item.name} />
                    <div className="hm-cart-item-info">
                      <h5>{item.name}</h5>
                      <p>{item.quantity} × {item.price.toLocaleString()} XAF</p>
                      <div className="hm-cart-item-actions">
                        <button onClick={() => onDecrease(item.id)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onIncrease(item.id)}>+</button>
                        <button onClick={() => onRemove(item.id)}><FaTrash size={11} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="hm-cart-summary">
                <div className="hm-summary-row">
                  <span>Subtotal</span><span>{cartSubtotal.toLocaleString()} XAF</span>
                </div>
                <div className="hm-summary-row">
                  <span>Delivery</span><span>{DELIVERY_FEE} XAF</span>
                </div>
                <div className="hm-summary-row hm-summary-total">
                  <span>Total</span><span>{cartTotal.toLocaleString()} XAF</span>
                </div>
                <button className="hm-place-order-btn" onClick={onCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;