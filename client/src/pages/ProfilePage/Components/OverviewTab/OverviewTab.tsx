import React from "react";
import "./OverviewTab.css"

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  iconColor: string;
}

interface Props {
  statCards: StatCard[];
  totalEarnings: number;
}

const OverviewTab: React.FC<Props> = ({ statCards, totalEarnings }) => (
  <div className="pr-overview-grid">
    <div className="pr-content-box">
      <h3>About me</h3>
      <p>Passionate farmer with experience in crop production. We grow fresh and organic products for local markets, prioritising sustainability and community support.</p>
      <div className="pr-overview-stats">
        {statCards.map((s) => (
          <div className="pr-ov-stat" key={s.label}>
            <span className="pr-ov-icon" style={{ background: s.color, color: s.iconColor }}>{s.icon}</span>
            <span className="pr-ov-val">{s.value}</span>
            <span className="pr-ov-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="pr-content-box">
      <h3>Earnings overview</h3>
      <div className="pr-earnings-bars">
        {[
          { month: "Jan", pct: 40 }, { month: "Feb", pct: 65 },
          { month: "Mar", pct: 50 }, { month: "Apr", pct: 80 },
          { month: "May", pct: 60 }, { month: "Jun", pct: 90 },
        ].map((b) => (
          <div className="pr-bar-wrap" key={b.month}>
            <div className="pr-bar" style={{ height: `${b.pct}%` }} />
            <span>{b.month}</span>
          </div>
        ))}
      </div>
      <p className="pr-earnings-total">
        Total: <strong>{totalEarnings.toLocaleString()} FCFA</strong>
      </p>
    </div>
  </div>
);

export default OverviewTab;