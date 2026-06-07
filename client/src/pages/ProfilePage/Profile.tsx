import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../hooks/Userprofile";
import { formatMemberSince } from "../../utils/formatDate";
import { uploadAvatar, updateProfile, changePassword, saveNotifications, deleteAccount } from "../../services/userService";
import type { User } from "../../types/User";
import { FaLeaf, FaBoxOpen, FaStar, FaMoneyBillWave } from "react-icons/fa";

import ProfileCard from "../../pages/ProfilePage/Components/ProfileCard/ProfileCard";
import InfoStats from "../../pages/ProfilePage/Components/InfoStats/InfoStats";
import Tabs from "../../pages/ProfilePage/Components/Tabs/Tabs";
import OverviewTab from "../../pages/ProfilePage/Components/OverviewTab/OverviewTab";
import ProductsTab from "../../pages/ProfilePage/Components/ProductsTab/ProductsTab";
import OrdersTab from "../../pages/ProfilePage/Components/OrdersTab/OrdersTab";
import SettingsTab from "../../pages/ProfilePage/Components/SettingsTab/SettingsTab";
import "../../styles/Profile.css";

const TABS = ["overview", "products", "orders", "settings"] as const;
type Tab = typeof TABS[number];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { token, updateUser, logout } = useAuth();
  const { user, setUser, stats, products, orders, loading, avatar, updateAvatar } = useProfile();

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [form, setForm] = useState({ full_name: "", phone: "", location: "" });
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [pwLoading, setPwLoading] = useState(false);
  const [notifications, setNotifications] = useState({ orders: true, promotions: false, newsletter: true, sms: false });
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    const reader = new FileReader();
    reader.onload = () => updateAvatar(reader.result as string);
    reader.readAsDataURL(file);
    try {
      setAvatarLoading(true);
      const res = await uploadAvatar(token, file);
      const updatedImage: string = res.profile_image;
      setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, profile_image: updatedImage };
        setTimeout(() => updateUser(updated), 0);
        return updated;
      });
      updateAvatar(updatedImage);
    } catch {
      alert("Failed to upload profile picture. Please try again.");
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleEditClick = () => {
    if (!user) return;
    setForm({ full_name: user.full_name, phone: user.phone, location: user.location });
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!token || !user) return;
    if (!form.full_name || !form.phone) { alert("Name and phone are required."); return; }
    try {
      const res = await updateProfile(token, form);
      const updated: User = { ...user, ...res };
      setUser(updated);
      updateUser(updated);
      setEditMode(false);
    } catch { alert("Failed to update profile."); }
  };

  const handleChangePassword = async () => {
    if (!token) return;
    if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) { alert("Please fill all password fields."); return; }
    if (pwForm.newPw !== pwForm.confirm) { alert("New passwords do not match."); return; }
    if (pwForm.newPw.length < 6) { alert("Password must be at least 6 characters."); return; }
    try {
      setPwLoading(true);
      await changePassword(token, { current_password: pwForm.current, new_password: pwForm.newPw });
      alert("Password changed successfully!");
      setPwForm({ current: "", newPw: "", confirm: "" });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to change password.");
    } finally { setPwLoading(false); }
  };

  const handleSaveNotifications = async () => {
    if (!token) return;
    try {
      await saveNotifications(token, notifications);
      alert("Notification preferences saved!");
    } catch { alert("Failed to save preferences."); }
  };

  const handleDeleteAccount = async () => {
    if (!token || !user) return;
    if (deleteConfirm !== user.email) { alert("Please type your email exactly to confirm deletion."); return; }
    if (!window.confirm("This will permanently delete your account and all data. Are you absolutely sure?")) return;
    try {
      await deleteAccount(token);
      logout();
      navigate("/");
    } catch { alert("Failed to delete account."); }
  };

  const STAT_CARDS = [
    { icon: <FaLeaf />, label: "Products listed", value: stats.products_listed, color: "#E8F5E9", iconColor: "#2E7D32" },
    { icon: <FaBoxOpen />, label: "Orders completed", value: stats.orders_completed, color: "#E3F2FD", iconColor: "#1565C0" },
    { icon: <FaStar />, label: "Customer rating", value: stats.rating > 0 ? `${stats.rating} ⭐` : "No ratings yet", color: "#FFF8E1", iconColor: "#F9A825" },
    { icon: <FaMoneyBillWave />, label: "Total earnings", value: `${stats.total_earnings.toLocaleString()} FCFA`, color: "#F3E5F5", iconColor: "#6A1B9A" },
  ];

  const memberSince = formatMemberSince(user?.created_at);

  if (loading) {
    return (
      <div className="pr-loading">
        <div className="pr-spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="pr-page">
      <div className="pr-hero">
        <div className="pr-hero-overlay" />
        <div className="pr-hero-content">
          <h1>My Profile</h1>
          <nav className="pr-breadcrumb">
            <span onClick={() => navigate("/landing")}>Home</span>
            <span>&rsaquo;</span>
            <span className="pr-active">Profile</span>
          </nav>
        </div>
      </div>

      <div className="pr-container">
        <ProfileCard
          user={user}
          avatar={avatar}
          avatarLoading={avatarLoading}
          editMode={editMode}
          form={form}
          avatarInputRef={avatarInputRef}
          onAvatarChange={handleAvatarChange}
          onEditClick={handleEditClick}
          onFormChange={(field, val) => setForm({ ...form, [field]: val })}
          onSave={handleSave}
          onCancelEdit={() => setEditMode(false)}
        />
        <InfoStats user={user} stats={STAT_CARDS} memberSince={memberSince} />
        <Tabs activeTab={activeTab} onChange={(tab) => setActiveTab(tab as Tab)} />
        <div className="pr-tab-content">
          {activeTab === "overview" && <OverviewTab statCards={STAT_CARDS} totalEarnings={stats.total_earnings} />}
          {activeTab === "products" && <ProductsTab products={products} onAddProduct={() => navigate("/upload-product")} />}
          {activeTab === "orders" && <OrdersTab orders={orders} />}
          {activeTab === "settings" && (
            <SettingsTab
              user={user}
              pwForm={pwForm}
              showPw={showPw}
              pwLoading={pwLoading}
              notifications={notifications}
              deleteConfirm={deleteConfirm}
              onPwChange={(field, val) => setPwForm({ ...pwForm, [field]: val })}
              onToggleShowPw={(field) => setShowPw({ ...showPw, [field]: !showPw[field] })}
              onChangePassword={handleChangePassword}
              onNotificationToggle={(key) => setNotifications({ ...notifications, [key]: !notifications[key] })}
              onSaveNotifications={handleSaveNotifications}
              onDeleteConfirmChange={setDeleteConfirm}
              onDeleteAccount={handleDeleteAccount}
              onSignOut={() => { logout(); navigate("/login"); }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;