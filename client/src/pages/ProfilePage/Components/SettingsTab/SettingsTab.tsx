import React from "react";
import { FaLock, FaBell, FaShieldAlt, FaTrash, FaSignOutAlt, FaEye, FaEyeSlash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import type { User } from "../../../../types/User";
import "./SettingsTab.css";

interface Props {
  user: User | null;
  pwForm: { current: string; newPw: string; confirm: string };
  showPw: { current: boolean; newPw: boolean; confirm: boolean };
  pwLoading: boolean;
  notifications: { orders: boolean; promotions: boolean; newsletter: boolean; sms: boolean };
  deleteConfirm: string;
  onPwChange: (field: string, val: string) => void;
  onToggleShowPw: (field: string) => void;
  onChangePassword: () => void;
  onNotificationToggle: (key: string) => void;
  onSaveNotifications: () => void;
  onDeleteConfirmChange: (val: string) => void;
  onDeleteAccount: () => void;
  onSignOut: () => void;
}

const SettingsTab: React.FC<Props> = ({
  user, pwForm, showPw, pwLoading, notifications, deleteConfirm,
  onPwChange, onToggleShowPw, onChangePassword,
  onNotificationToggle, onSaveNotifications,
  onDeleteConfirmChange, onDeleteAccount, onSignOut,
}) => (
  <div className="pr-settings-layout">

    {/* CHANGE PASSWORD */}
    <div className="pr-settings-card">
      <div className="pr-settings-card-title"><FaLock size={14} color="#2E7D32" /> Change password</div>
      <div className="pr-settings-fields">
        {(["current", "newPw", "confirm"] as const).map((key) => (
          <div className="pr-settings-field" key={key}>
            <label>{key === "current" ? "Current password" : key === "newPw" ? "New password" : "Confirm new password"}</label>
            <div className="pr-pw-wrap">
              <input
                type={showPw[key] ? "text" : "password"}
                value={pwForm[key]}
                onChange={(e) => onPwChange(key, e.target.value)}
                placeholder="••••••••"
              />
              <button className="pr-pw-toggle" type="button" onClick={() => onToggleShowPw(key)}>
                {showPw[key] ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
              </button>
            </div>
          </div>
        ))}
        <button className="pr-settings-save-btn" onClick={onChangePassword} disabled={pwLoading}>
          {pwLoading ? "Saving..." : "Update password"}
        </button>
      </div>
    </div>

    {/* NOTIFICATIONS */}
    <div className="pr-settings-card">
      <div className="pr-settings-card-title"><FaBell size={14} color="#2E7D32" /> Notification preferences</div>
      <div className="pr-notif-list">
        {([
          { key: "orders", label: "Order updates", desc: "Get notified when your order status changes" },
          { key: "promotions", label: "Promotions", desc: "Receive special deals and discount offers" },
          { key: "newsletter", label: "Newsletter", desc: "Weekly farming tips and market news" },
          { key: "sms", label: "SMS alerts", desc: "Receive important alerts via SMS" },
        ] as const).map(({ key, label, desc }) => (
          <div className="pr-notif-row" key={key}>
            <div>
              <span className="pr-notif-label">{label}</span>
              <span className="pr-notif-desc">{desc}</span>
            </div>
            <button
              className={`pr-toggle ${notifications[key] ? "pr-toggle-on" : ""}`}
              onClick={() => onNotificationToggle(key)}
            >
              {notifications[key] ? <FaToggleOn size={26} /> : <FaToggleOff size={26} />}
            </button>
          </div>
        ))}
      </div>
      <button className="pr-settings-save-btn" onClick={onSaveNotifications}>Save preferences</button>
    </div>

    {/* PRIVACY */}
    <div className="pr-settings-card">
      <div className="pr-settings-card-title"><FaShieldAlt size={14} color="#2E7D32" /> Privacy &amp; verification</div>
      <p className="pr-settings-desc">Verify your identity to unlock the full marketplace experience and build buyer trust.</p>
      <button className="pr-verify-btn">Start verification</button>
    </div>

    {/* DANGER ZONE */}
    <div className="pr-settings-card pr-danger-card">
      <div className="pr-settings-card-title"><FaTrash size={14} color="#e53935" /> Delete account</div>
      <p className="pr-settings-desc">
        This action is <strong>permanent</strong> and cannot be undone. All your products, orders, and data will be deleted.
      </p>
      <div className="pr-settings-field">
        <label>Type <strong>{user?.email}</strong> to confirm</label>
        <input
          type="email"
          value={deleteConfirm}
          onChange={(e) => onDeleteConfirmChange(e.target.value)}
          placeholder={user?.email || "your@email.com"}
          className="pr-danger-input"
        />
      </div>
      <button className="pr-delete-btn" onClick={onDeleteAccount} disabled={deleteConfirm !== user?.email}>
        <FaTrash size={12} /> Permanently delete my account
      </button>
    </div>

    {/* SIGN OUT */}
    <div className="pr-settings-card">
      <div className="pr-settings-card-title"><FaSignOutAlt size={14} color="#2E7D32" /> Sign out</div>
      <p className="pr-settings-desc">You'll be returned to the login page. Your data stays safe.</p>
      <button className="pr-settings-save-btn" onClick={onSignOut}>Sign out of AgroConnect</button>
    </div>

  </div>
);

export default SettingsTab;