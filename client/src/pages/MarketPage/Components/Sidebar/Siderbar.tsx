import React from "react";
import "../Sidebar/Siderbar.css";
import type { Category } from "../../../../utils/constants"; 

interface CategoryObj {
  name: string;
  subcategories: { name: string; icon: string }[];
}

interface Props {
  sidebarOpen: boolean;
  onClose: () => void;
  typeFilters: { forSale: boolean; forRent: boolean; services: boolean };
  onTypeFilterChange: (key: string) => void;
  condFilters: { newCond: boolean; usedCond: boolean };
  onCondFilterChange: (key: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  activeLocation: string;
  onLocationChange: (val: string) => void;
  activeSubcategory: string;
  onSubcategoryChange: (val: string) => void;
  activeCategoryObj?: Category;
  onApplyFilters?: () => void;
}

const Sidebar: React.FC<Props> = ({
  sidebarOpen, onClose, typeFilters, onTypeFilterChange,
  condFilters, onCondFilterChange, minPrice, maxPrice,
  onMinPriceChange, onMaxPriceChange, activeLocation,
  onLocationChange, activeSubcategory, onSubcategoryChange,
  activeCategoryObj, onApplyFilters,
}) => (
  <aside className={`hm-sidebar ${sidebarOpen ? "hm-sidebar-open" : ""}`}>
    <div className="hm-sidebar-close-wrap">
      <button className="hm-sidebar-close-btn" onClick={onClose}>
        Close
      </button>
    </div>
    <div className="hm-sidebar-section">
      <h4>Type</h4>
      <ul className="hm-filter-check-list">
        {[
          { key: "forSale", label: "For Sale" },
          { key: "forRent", label: "For Rent" },
          { key: "services", label: "Services" },
        ].map(({ key, label }) => (
          <li key={key}>
            <label className="hm-filter-check">
              <input
                type="checkbox"
                checked={typeFilters[key as keyof typeof typeFilters]}
                onChange={() => onTypeFilterChange(key)}
              />
              {label}
            </label>
          </li>
        ))}
      </ul>
    </div>

    <div className="hm-sidebar-section">
      <h4>Price range (XAF)</h4>
      <div className="hm-price-row">
        <input type="number" placeholder="Min" value={minPrice} onChange={(e) => onMinPriceChange(e.target.value)} />
        <span>–</span>
        <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => onMaxPriceChange(e.target.value)} />
      </div>
    </div>

    <div className="hm-sidebar-section">
      <h4>Location</h4>
      <input
        className="hm-loc-input"
        type="text"
        placeholder="e.g. Yaoundé"
        value={activeLocation === "All Locations" ? "" : activeLocation}
        onChange={(e) => onLocationChange(e.target.value || "All Locations")}
      />
    </div>

    <div className="hm-sidebar-section">
      <h4>Condition</h4>
      <ul className="hm-filter-check-list">
        {[
          { key: "newCond", label: "New" },
          { key: "usedCond", label: "Used" },
        ].map(({ key, label }) => (
          <li key={key}>
            <label className="hm-filter-check">
              <input
                type="checkbox"
                checked={condFilters[key as keyof typeof condFilters]}
                onChange={() => onCondFilterChange(key)}
              />
              {label}
            </label>
          </li>
        ))}
      </ul>
    </div>

    {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
      <div className="hm-sidebar-section">
        <h4>Subcategory</h4>
        <ul className="hm-sidebar-list">
          <li
            className={`hm-sidebar-item ${activeSubcategory === "" ? "hm-sidebar-active" : ""}`}
            onClick={() => onSubcategoryChange("")}
          >
            All
          </li>
          {activeCategoryObj.subcategories.map((sub) => (
            <li
              key={sub.name}
              className={`hm-sidebar-item ${activeSubcategory === sub.name ? "hm-sidebar-active" : ""}`}
              onClick={() => onSubcategoryChange(sub.name)}
            >
              {sub.icon} <span>{sub.name}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
    <button className="hm-apply-btn" onClick={() => {
      onApplyFilters?.();
      onClose();
    }}>
      Apply Filters
    </button>
  </aside>
);

export default Sidebar;