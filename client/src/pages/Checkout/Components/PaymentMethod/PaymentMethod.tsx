import React from "react";
import "./PaymentMethod.css";

interface PayOption {
  id: string;
  label: string;
  desc: string;
}

interface PaymentMethodProps {
  payMethod: string;
  onSelect: (id: string) => void;
}

const payOptions: PayOption[] = [
  { id: "cash",   label: "Cash on delivery",  desc: "Pay when you receive your order" },
  { id: "mobile", label: "Mobile money",       desc: "Pay using M-Pesa or other mobile money services" },
  { id: "bank",   label: "Bank transfer",      desc: "Make a payment directly to our bank account" },
];

const PaymentMethod: React.FC<PaymentMethodProps> = ({ payMethod, onSelect }) => {
  return (
    <div className="co-card">
      <div className="co-section-title">
        <span className="co-num">2</span>
        Payment method
      </div>

      {payOptions.map((opt) => (
        <div
          key={opt.id}
          className={`co-pay-option ${payMethod === opt.id ? "co-pay-selected" : ""}`}
          onClick={() => onSelect(opt.id)}
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
  );
};

export default PaymentMethod;