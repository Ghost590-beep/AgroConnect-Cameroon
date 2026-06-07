import React from "react";
import { FaUser, FaCamera, FaMapMarkerAlt, FaPhone, FaEnvelope, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import type { User } from "../../../../types/User";
import "./ProfileCard.css";

interface Props {
  user: User | null;
  avatar: string;
  avatarLoading: boolean;
  editMode: boolean;
  form: { full_name: string; phone: string; location: string };
  avatarInputRef: React.RefObject<HTMLInputElement>;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onFormChange: (field: string, val: string) => void;
  onSave: () => void;
  onCancelEdit: () => void;
}

const ProfileCard: React.FC<Props> = ({
  user, avatar, avatarLoading, editMode, form,
  avatarInputRef, onAvatarChange, onEditClick,
  onFormChange, onSave, onCancelEdit,
}) => (
  <div className="pr-main-card">
    <div className="pr-profile-top">
      <div className="pr-avatar-wrap" onClick={() => avatarInputRef.current?.click()} title="Click to change photo">
        {avatar ? (
          <img src={avatar} alt="Profile" className="pr-avatar" />
        ) : (
          <div className="pr-avatar-placeholder"><FaUser size={32} color="#aaa" /></div>
        )}
        <div className={`pr-avatar-overlay ${avatarLoading ? "pr-avatar-loading" : ""}`}>
          {avatarLoading
            ? <div className="pr-avatar-spinner" />
            : <><FaCamera size={14} /><span>Change photo</span></>}
        </div>
        <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onAvatarChange} />
      </div>

      <div className="pr-identity">
        {!editMode ? (
          <>
            <div className="pr-name-row">
              <h2>{user?.full_name || "—"}</h2>
              <span className="pr-verified-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#2E7D32">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified Farmer
              </span>
            </div>
            <div className="pr-meta">
              <span><FaMapMarkerAlt size={11} /> {user?.location || "—"}</span>
              <span><FaPhone size={11} /> {user?.phone || "—"}</span>
              <span><FaEnvelope size={11} /> {user?.email || "—"}</span>
            </div>
            <p className="pr-bio">Passionate farmer dedicated to sustainable agriculture and providing fresh quality produce.</p>
          </>
        ) : (
          <div className="pr-edit-form">
            {[
              { field: "full_name", label: "Full name *", placeholder: "Full name" },
              { field: "location", label: "Location", placeholder: "City, Country" },
              { field: "phone", label: "Phone *", placeholder: "+237 600 000 000" },
            ].map(({ field, label, placeholder }) => (
              <div className="pr-edit-field" key={field}>
                <label>{label}</label>
                <input
                  value={form[field as keyof typeof form]}
                  onChange={(e) => onFormChange(field, e.target.value)}
                  placeholder={placeholder}
                />
              </div>
            ))}
            <div className="pr-edit-btns">
              <button className="pr-save-btn" onClick={onSave}><FaSave size={12} /> Save changes</button>
              <button className="pr-discard-btn" onClick={onCancelEdit}><FaTimes size={12} /> Cancel</button>
            </div>
          </div>
        )}
      </div>

      {!editMode && (
        <button className="pr-edit-btn" onClick={onEditClick}><FaEdit size={12} /> Edit profile</button>
      )}
    </div>
  </div>
);

export default ProfileCard;