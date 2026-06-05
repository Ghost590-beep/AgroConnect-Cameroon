import React from "react";
import { FaRocket } from "react-icons/fa";
import "./ActionBar.css";

interface ActionBarProps {
  loading: boolean;
  onCancel: () => void;
  onDraft: () => void;
  onPublish: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ loading, onCancel, onDraft, onPublish }) => {
  return (
    <div className="up-action-bar">
      <button className="up-cancel-btn" onClick={onCancel}>
        Cancel
      </button>
      <div className="up-btn-group">
        <button
          className="up-draft-btn"
          onClick={onDraft}
          disabled={loading}
        >
          Save as draft
        </button>
        <button
          className="up-publish-btn"
          onClick={onPublish}
          disabled={loading}
        >
          <FaRocket size={13} />
          {loading ? "Publishing..." : "Publish product"}
        </button>
      </div>
    </div>
  );
};

export default ActionBar;