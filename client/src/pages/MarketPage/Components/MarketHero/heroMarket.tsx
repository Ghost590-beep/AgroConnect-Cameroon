import React from "react";
import { FaChevronRight } from "react-icons/fa";
import "../MarketHero/heroMarket.css";

interface Props {
  onNavigateHome: () => void;
}

const MarketHero: React.FC<Props> = ({ onNavigateHome }) => (
  <div className="hm-hero">
    <div className="hm-hero-content">
      <h1>Marketplace</h1>
      <p>Buy and sell fresh agricultural products</p>
      <nav className="hm-hero-breadcrumb">
        <span onClick={onNavigateHome}>Home</span>
        <FaChevronRight size={10} />
        <span className="hm-active">Marketplace</span>
      </nav>
    </div>
  </div>
);

export default MarketHero;