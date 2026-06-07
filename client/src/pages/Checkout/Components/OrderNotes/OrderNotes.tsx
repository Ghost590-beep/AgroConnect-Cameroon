import React from "react";
import "./OrderNotes.css";

interface OrderNotesProps {
  notes: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const OrderNotes: React.FC<OrderNotesProps> = ({ notes, onChange }) => {
  return (
    <div className="co-card">
      <div className="co-section-title">
        <span className="co-num">3</span>
        Order notes (optional)
      </div>
      <textarea
        name="notes"
        value={notes}
        onChange={onChange}
        rows={4}
        placeholder="Add any special instructions for your order..."
      />
    </div>
  );
};

export default OrderNotes;