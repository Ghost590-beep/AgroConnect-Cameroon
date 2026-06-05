import React from "react";
import "../MarketFeatures/MarketFeatures.css";

interface Feature {
  icon: React.ReactNode;
  title: string;
  text: string;
}

interface Props {
  features: Feature[];
}

const MarketFeatures: React.FC<Props> = ({ features }) => (
  <div className="hm-features">
    {features.map((f) => (
      <div className="hm-feature-card" key={f.title}>
        <span className="hm-feat-icon">{f.icon}</span>
        <div>
          <h4>{f.title}</h4>
          <p>{f.text}</p>
        </div>
      </div>
    ))}
  </div>
);

export default MarketFeatures;