import React from "react";
import { FaClipboardList } from "react-icons/fa";
import "./ProductInfoForm.css";

const CATEGORIES = ["Crops & Seeds", "Animals", "Machines & Tools", "Services", "Medications", "Training"];

const SUBCATEGORIES: Record<string, string[]> = {
  "Crops & Seeds": ["Vegetables", "Fruits", "Grains", "Seeds", "Dairy Products"],
  Animals: ["Livestock"],
  "Machines & Tools": ["Tractors", "Hand Tools", "Irrigation Equipment", "Harvesting Equipment"],
  Services: ["Farm Labour", "Transportation", "Consultancy", "Equipment Rental"],
  Medications: ["Animal Medicine", "Crop Protection", "Supplements"],
  Training: ["Farming Techniques", "Sustainable Agriculture", "Market Access"],
};

const UNITS = ["kg", "g", "bunch", "piece", "litre", "bag", "crate"];

interface Form {
  name: string;
  category: string;
  subcategory: string;
  unit: string;
  description: string;
  price: string;
  minOrder: string;
  stock: string;
}

interface ProductInfoFormProps {
  form: Form;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ProductInfoForm: React.FC<ProductInfoFormProps> = ({ form, onChange }) => {
  const subcats = form.category ? SUBCATEGORIES[form.category] || [] : [];

  return (
    <div className="up-card">
      <div className="up-card-title">
        <FaClipboardList className="up-card-icon" />
        Product information
      </div>

      <div className="up-form-row">
        <div className="up-field">
          <label>Product name <span className="up-req">*</span></label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="e.g. Fresh Tomatoes"
          />
        </div>
        <div className="up-field">
          <label>Category <span className="up-req">*</span></label>
          <select name="category" value={form.category} onChange={onChange}>
            <option value="">Select category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="up-form-row">
        <div className="up-field">
          <label>Subcategory</label>
          <select
            name="subcategory"
            value={form.subcategory}
            onChange={onChange}
            disabled={!subcats.length}
          >
            <option value="">Select subcategory</option>
            {subcats.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="up-field">
          <label>Unit of measure <span className="up-req">*</span></label>
          <select name="unit" value={form.unit} onChange={onChange}>
            <option value="">Select unit</option>
            {UNITS.map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
      </div>

      <div className="up-field up-full">
        <label>Description <span className="up-req">*</span></label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={4}
          maxLength={500}
          placeholder="Describe your product, quality, and any other important details..."
        />
        <span className="up-char-count">{form.description.length}/500</span>
      </div>

      <div className="up-form-row up-three">
        <div className="up-field">
          <label>Price <span className="up-req">*</span></label>
          <div className="up-price-wrap">
            <span className="up-prefix">FCFA</span>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={onChange}
              placeholder="e.g. 120"
            />
          </div>
        </div>
        <div className="up-field">
          <label>Min. order quantity</label>
          <div className="up-unit-wrap">
            <input
              name="minOrder"
              type="number"
              value={form.minOrder}
              onChange={onChange}
              placeholder="e.g. 10"
            />
            <span className="up-suffix">{form.unit}</span>
          </div>
        </div>
        <div className="up-field">
          <label>Stock available <span className="up-req">*</span></label>
          <div className="up-unit-wrap">
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={onChange}
              placeholder="e.g. 100"
            />
            <span className="up-suffix">{form.unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoForm;