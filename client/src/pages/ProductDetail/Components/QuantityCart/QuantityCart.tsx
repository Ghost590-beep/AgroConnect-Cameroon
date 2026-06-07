import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./QuantityCart.css";

interface QuantityCartProps {
  quantity: number;
  added: boolean;
  outOfStock: boolean;
  disabled?: boolean;
  disabledReason?: string;
  onDecrease: () => void;
  onIncrease: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const QuantityCart: React.FC<QuantityCartProps> = ({
  quantity,
  added,
  outOfStock,
  disabled,
  disabledReason,
  onDecrease,
  onIncrease,
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <div className="pd-actions">
      <div className="pd-qty-wrap">
        <button className="pd-qty-btn" onClick={onDecrease}>
          −
        </button>
        <span className="pd-qty">{quantity}</span>
        <button className="pd-qty-btn" onClick={onIncrease}>
          +
        </button>
      </div>

      <button
        className={`pd-cart-btn ${added ? "pd-cart-added" : ""}`}
        onClick={onAddToCart}
        disabled={outOfStock || disabled}
        title={disabled ? disabledReason : undefined}
      >
        <FaShoppingCart size={14} />
        {added ? "Added to cart!" : "Add to cart"}
      </button>

      <button
        className="pd-checkout-btn"
        onClick={onBuyNow}
        disabled={outOfStock || disabled}
        title={disabled ? disabledReason : undefined}
      >
        Buy now
      </button>
    </div>
  );
};

export default QuantityCart;
