import React from "react";
import { FaRocket, FaShieldAlt } from "react-icons/fa";
import "./PublishOptions.css";

interface PublishOptionsProps {
  visibility: "public" | "private";
  onSelect: (v: "public" | "private") => void;
}

const PublishOptions: React.FC<PublishOptionsProps> = ({ visibility, onSelect }) => {
  return (
    <>
      <div className="up-quality-card">
        <div className="up-q-icon">
          <FaShieldAlt size={15} color="#fff" />
        </div>
        <div>
          <h4>Quality assurance</h4>
          <p>All products are reviewed to ensure quality and transparency.</p>
        </div>
      </div>

      <div className="up-card">
        <div className="up-card-title">
          <FaRocket className="up-card-icon" />
          Publishing options
        </div>
        <p className="up-vis-label">Visibility <span className="up-req">*</span></p>
        {(["public", "private"] as const).map((v) => (
          <div key={v} className="up-vis-option" onClick={() => onSelect(v)}>
            <div className={`up-radio ${visibility === v ? "up-radio-on" : ""}`}>
              {visibility === v && <span className="up-radio-dot" />}
            </div>
            <div>
              <h4>{v.charAt(0).toUpperCase() + v.slice(1)}</h4>
              <p>
                {v === "public"
                  ? "Visible to all buyers"
                  : "Only visible to specific buyers"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PublishOptions;