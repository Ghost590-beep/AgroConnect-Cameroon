import React from "react";
import { FaSearch, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { getInitials } from "../../../../utils/validtors";
import type { User } from "../../../../types/User";
import "../Topbar/Topbar .css";

interface Props {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  cartCount: number;
  onCartOpen: () => void;
  authUser: User | null;
  onLogout: () => void;
  onProfileClick: () => void;
}

const Topbar: React.FC<Props> = ({
  searchTerm, onSearchChange, cartCount,
  onCartOpen, authUser, onLogout, onProfileClick,
}) => {
  const initials = getInitials(authUser?.full_name);
  const avatarSrc = authUser?.profile_image || null;

  return (
    <div className="hm-topbar">
      <span className="hm-topbar-brand">AgroConnect</span>
      <div className="hm-topbar-search">
        <FaSearch size={13} />
        <input
          type="text"
          placeholder="Search crops, animals, machines..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="hm-topbar-right">
        <button className="hm-cart-pill" onClick={onCartOpen}>
          <FaShoppingCart size={13} />
          Cart {cartCount > 0 && `(${cartCount})`}
        </button>
        <div className="hm-avatar-menu">
          <div className="hm-avatar-chip" onClick={onProfileClick} title="Go to profile">
            {avatarSrc ? (
              <img src={avatarSrc} alt="Profile" className="hm-avatar-chip-img" />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <button className="hm-logout-btn" onClick={onLogout} title="Logout">
            <FaSignOutAlt size={13} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;