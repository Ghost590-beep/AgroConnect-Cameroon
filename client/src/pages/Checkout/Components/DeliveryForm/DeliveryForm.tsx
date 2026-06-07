import React from "react";
import { FaCheck } from "react-icons/fa";
import "./DeliveryForm.css";

interface DeliveryFormProps {
  form: {
    fullName: string;
    phone: string;
    email: string;
    location: string;
    address: string;
  };
  saveAddress: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onToggleSave: () => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ form, saveAddress, onChange, onToggleSave }) => {
  return (
    <div className="co-card">
      <div className="co-section-title">
        <span className="co-num">1</span>
        Delivery information
      </div>

      <div className="co-form-row">
        <div className="co-field">
          <label>Full name</label>
          <input name="fullName" value={form.fullName} onChange={onChange} placeholder="Full name" />
        </div>
        <div className="co-field">
          <label>Phone number</label>
          <input name="phone" value={form.phone} onChange={onChange} placeholder="+254 700 000 000" />
        </div>
      </div>

      <div className="co-field co-full">
        <label>Email address</label>
        <input name="email" type="email" value={form.email} onChange={onChange} placeholder="email@example.com" />
      </div>

      <div className="co-field co-full">
        <label>Delivery location</label>
        <select name="location" value={form.location} onChange={onChange}>
          <option>Yaoundé, Cameroon</option>
          <option>Douala, Cameroon</option>
          <option>Bafoussam, Cameroon</option>
          <option>Bamenda, Cameroon</option>
          <option>Garoua, Cameroon</option>
          <option>Maroua, Cameroon</option>
          <option>Nkongsamba, Cameroon</option>
        </select>
      </div>

      <div className="co-field co-full">
        <label>Detailed address</label>
        <textarea name="address" value={form.address} onChange={onChange} rows={3} placeholder="Street, area, city..." />
      </div>

      <label className="co-checkbox">
        <input type="checkbox" checked={saveAddress} onChange={onToggleSave} />
        <span className="co-checkmark">{saveAddress && <FaCheck size={9} />}</span>
        Save this address for future orders
      </label>
    </div>
  );
};

export default DeliveryForm;