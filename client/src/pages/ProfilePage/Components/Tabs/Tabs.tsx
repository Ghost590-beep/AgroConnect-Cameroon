import React from "react";
import { FaInfoCircle, FaLeaf, FaShoppingBag, FaCog } from "react-icons/fa";
import "./Tabs.css";

const TABS = ["overview", "products", "orders", "settings"] as const;

interface Props {
  activeTab: string;
  onChange: (tab: string) => void;
}

const Tabs: React.FC<Props> = ({ activeTab, onChange }) => (
  <div className="pr-tabs">
    {TABS.map((tab) => (
      <button
        key={tab}
        className={`pr-tab-btn ${activeTab === tab ? "pr-tab-active" : ""}`}
        onClick={() => onChange(tab)}
      >
        {tab === "overview" && <FaInfoCircle size={13} />}
        {tab === "products" && <FaLeaf size={13} />}
        {tab === "orders" && <FaShoppingBag size={13} />}
        {tab === "settings" && <FaCog size={13} />}
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
);

export default Tabs;