import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import type { User } from "../../../../types/User";
import "./InfoStats.css";

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  iconColor: string;
}

interface Props {
  user: User | null;
  stats: StatCard[];
  memberSince: string;
}

const InfoStats: React.FC<Props> = ({ user, stats, memberSince }) => (
  <div className="pr-info-stats-grid">
    <div className="pr-info-box">
      <h3>My information</h3>
      {[
        { icon: <FaUser size={12} />, label: "Full name", val: user?.full_name || "—" },
        { icon: <FaEnvelope size={12} />, label: "Email", val: user?.email || "—" },
        { icon: <FaPhone size={12} />, label: "Phone", val: user?.phone || "—" },
        { icon: <FaMapMarkerAlt size={12} />, label: "Location", val: user?.location || "—" },
        { icon: <FaCalendarAlt size={12} />, label: "Member since", val: memberSince },
      ].map((row) => (
        <div className="pr-info-row" key={row.label}>
          <span className="pr-info-label">{row.icon} {row.label}</span>
          <span className="pr-info-val">{row.val}</span>
        </div>
      ))}
    </div>
    <div className="pr-stats-box">
      <h3>Account stats</h3>
      {stats.map((s) => (
        <div className="pr-stat-row" key={s.label}>
          <span className="pr-stat-left">
            <span className="pr-stat-icon" style={{ background: s.color, color: s.iconColor }}>{s.icon}</span>
            {s.label}
          </span>
          <span className="pr-stat-val">{s.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default InfoStats;