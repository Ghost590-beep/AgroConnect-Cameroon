import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/validtors";
import { API_BASE } from "../../utils/constants";
import { getAllProducts, uploadProduct, deleteProduct } from "../../services/productService";
import { getUserProducts } from "../../services/userService";
import type { Product } from "../../types/Product";
import {
  FaLeaf, FaTractor, FaPlus, FaTrash, FaChevronRight,
  FaSignOutAlt, FaUser, FaChevronDown, FaBoxOpen,
  FaSeedling, FaHandshake, FaTimes, FaUpload,
} from "react-icons/fa";
import "./Dashboard.css";

/* ── static recommended products (placeholder) ── */
import tomatoes  from "../../assets/tomatoes.webp";
import poultry   from "../../assets/poultry.jpg";
import corn      from "../../assets/corn.webp";
import rice      from "../../assets/rice.webp";

const RECOMMENDED = [
  { name: "Fresh Tomatoes", price: "XAF 2,000", img: tomatoes },
  { name: "Poultry Feed",   price: "XAF 3,500", img: poultry  },
  { name: "Corn",           price: "XAF 1,200", img: corn     },
  { name: "Rice",           price: "XAF 5,000", img: rice     },
];

const CATEGORIES = ["Crops & Seeds","Animals","Machines & Tools","Services","Medications","Training"];
const SUBCATEGORIES: Record<string,string[]> = {
  "Crops & Seeds": ["Vegetables","Fruits","Grains","Seeds","Dairy Products"],
  "Animals": ["Livestock"],
  "Machines & Tools": ["Tractors","Hand Tools","Irrigation Equipment","Harvesting Equipment"],
  "Services": ["Farm Labour","Transportation","Consultancy","Equipment Rental"],
  "Medications": ["Animal Medicine","Crop Protection","Supplements"],
  "Training": ["Farming Techniques","Sustainable Agriculture","Market Access"],
};
const UNITS = ["kg","g","bunch","piece","litre","bag","crate"];

/* ══════════════════════════════════════
   DASHBOARD COMPONENT
══════════════════════════════════════ */
const Dashboard: React.FC = () => {
  const navigate   = useNavigate();
  const fileRef    = useRef<HTMLInputElement>(null);
  const { user: authUser, token, logout } = useAuth();

  const initials  = getInitials(authUser?.full_name);
  const avatarSrc = authUser?.profile_image ? `${API_BASE}${authUser.profile_image}` : null;
  const firstName = authUser?.full_name?.split(" ")[0] || "Farmer";

  /* ── state ── */
  const [myProducts,   setMyProducts]   = useState<Product[]>([]);
  const [recommended,  setRecommended]  = useState(RECOMMENDED);
  const [profileOpen,  setProfileOpen]  = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSvcModal, setShowSvcModal] = useState(false);
  const [deleting,     setDeleting]     = useState<number | null>(null);
  const [uploading,    setUploading]    = useState(false);
  const [imageFiles,   setImageFiles]   = useState<File[]>([]);
  const [dragOver,     setDragOver]     = useState(false);

  const [form, setForm] = useState({
    name:"", category:"", subcategory:"",
    unit:"", description:"", price:"",
    minOrder:"", stock:"", status:"public" as "public"|"draft",
  });

  const [svcForm, setSvcForm] = useState({
    name:"", category:"Services", subcategory:"",
    unit:"piece", description:"", price:"",
    stock:"1", status:"public" as "public"|"draft",
  });

  /* ── fetch user products ── */
  useEffect(() => {
    if (!token) return;
    getUserProducts(token)
      .then(setMyProducts)
      .catch(() => {});
  }, [token]);

  /* ── helpers ── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<any>>
  ) => setter((p: any) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageFiles(Array.from(e.target.files).slice(0, 1));
  };

  /* ── submit product ── */
  const normalizeStatus = (status: string, draft = false) => {
    if (draft) return "draft";
    return status === "public" ? "active" : status || "draft";
  };

  const handleSubmit = async (formData_: typeof form, draft = false) => {
    if (!formData_.name || !formData_.category || !formData_.price) {
      alert("Please fill all required fields.");
      return;
    }
    if (!token) return;
    try {
      setUploading(true);
      const fd = new FormData();
      fd.append("name", formData_.name);
      fd.append("category", formData_.category);
      fd.append("subcategory", formData_.subcategory || "");
      fd.append("description", formData_.description);
      fd.append("price", formData_.price);
      fd.append("unit", formData_.unit);
      fd.append("min_order", formData_.minOrder);
      fd.append("stock_quantity", formData_.stock);
      fd.append("location", authUser?.location || "");
      fd.append("status", normalizeStatus(formData_.status, draft));
      if (imageFiles[0]) fd.append("image", imageFiles[0]);
      await uploadProduct(token, fd);
      alert("Product posted successfully!");
      const updated = await getUserProducts(token);
      setMyProducts(updated);
      setShowAddModal(false);
      setShowSvcModal(false);
      setImageFiles([]);
      setForm({ name:"",category:"",subcategory:"",unit:"",description:"",price:"",minOrder:"",stock:"",status:"public" });
      setSvcForm({ name:"",category:"Services",subcategory:"",unit:"piece",description:"",price:"",stock:"1",status:"public" });
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to post product.");
    } finally {
      setUploading(false);
    }
  };

  /* ── delete product ── */
  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!window.confirm("Remove this listing?")) return;
    try {
      setDeleting(id);
      await deleteProduct(token, id);
      setMyProducts(p => p.filter(x => x.id !== id));
    } catch {
      alert("Failed to delete product.");
    } finally {
      setDeleting(null);
    }
  };

  const subcats = SUBCATEGORIES[form.category] || [];
  const svcSubcats = SUBCATEGORIES["Services"];

  /* ══ RENDER ══ */
  return (
    <div className="db-page">

      {/* ── TOPBAR ── */}
      <nav className="db-topbar">
        <div className="db-brand" onClick={() => navigate("/landing")}>
          <FaLeaf size={20} color="#2E7D32" />
          <span>AgroConnect</span>
        </div>

        <ul className="db-nav-links">
          <li className="db-nav-active" onClick={() => navigate("/landing")}>Dashboard</li>
          <li onClick={() => navigate("/market")}>Marketplace</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
        </ul>

        <div className="db-topbar-right">
          <div className="db-profile-chip" onClick={() => setProfileOpen(!profileOpen)}>
            {avatarSrc
              ? <img src={avatarSrc} alt="avatar" className="db-avatar-img" />
              : <div className="db-avatar-initials">{initials}</div>}
            <span>{firstName}</span>
            <FaChevronDown size={11} />
          </div>

          {profileOpen && (
            <div className="db-profile-dropdown">
              <div className="db-dd-item" onClick={() => navigate("/profile")}>
                <FaUser size={13} /> My Profile
              </div>
              <div className="db-dd-item" onClick={() => navigate("/upload-product")}>
                <FaBoxOpen size={13} /> Upload Product
              </div>
              <div className="db-dd-divider" />
              <div className="db-dd-item db-dd-logout" onClick={() => { logout(); navigate("/login"); }}>
                <FaSignOutAlt size={13} /> Logout
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── HERO WELCOME ── */}
      <div className="db-hero">
        <div className="db-hero-overlay" />
        <div className="db-hero-content">
          <h1>Welcome back, {firstName} 👋</h1>
          <p>Here's what's happening with your account today.</p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="db-container">

        {/* ── ACTION CARDS ── */}
        <div className="db-action-cards">

          {/* Add Product */}
          <div className="db-action-card db-action-green">
            <div className="db-action-text">
              <h2>Add a New Product</h2>
              <p>Sell crops, livestock, equipment, and more.</p>
              <button className="db-action-btn db-btn-green" onClick={() => navigate("/upload-product") }>
                <FaPlus size={13} /> Add Product
              </button>
            </div>
            <div className="db-action-img">
              <FaSeedling size={80} color="rgba(46,125,50,0.15)" />
            </div>
          </div>

          {/* Offer Service */}
          <div className="db-action-card db-action-blue">
            <div className="db-action-text">
              <h2>Offer a Service</h2>
              <p>Provide training, rental services, and other offerings.</p>
              <button className="db-action-btn db-btn-blue" onClick={() => navigate("/upload-product", { state: { category: "Services" } }) }>
                <FaPlus size={13} /> Offer Service
              </button>
            </div>
            <div className="db-action-img">
              <FaHandshake size={80} color="rgba(21,101,192,0.15)" />
            </div>
          </div>
        </div>

        {/* ── LISTINGS + SERVICES ROW ── */}
        <div className="db-mid-row">

          {/* Your Listings */}
          <div className="db-panel">
            <div className="db-panel-header">
              <h3>Your Listings <span className="db-count">({myProducts.length})</span></h3>
              <button className="db-manage-btn" onClick={() => navigate("/profile")}>
                Manage Listings <FaChevronRight size={11} />
              </button>
            </div>

            {myProducts.length === 0 ? (
              <div className="db-empty">
                <FaLeaf size={28} color="#ccc" />
                <p>No listings yet. Add your first product!</p>
              </div>
            ) : (
              <ul className="db-listing-list">
                {myProducts.map((p) => (
                  <li key={p.id} className="db-listing-item">
                    <span className="db-listing-icon">
                      {p.category === "Machines & Tools" ? <FaTractor size={16} color="#2E7D32" /> : <FaLeaf size={16} color="#2E7D32" />}
                    </span>
                    <span className="db-listing-name">{p.name}</span>
                    <span className="db-listing-price">XAF {p.price.toLocaleString()}</span>
                    <button
                      className="db-delete-btn"
                      onClick={() => handleDelete(p.id)}
                      disabled={deleting === p.id}
                      title="Remove listing"
                    >
                      {deleting === p.id ? "..." : <FaTrash size={12} />}
                    </button>
                    <FaChevronRight size={11} color="#ccc" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Your Services */}
          <div className="db-panel">
            <div className="db-panel-header">
              <h3>Your Services <span className="db-count">(0)</span></h3>
              <button className="db-manage-btn" onClick={() => setShowSvcModal(true)}>
                Add Service <FaChevronRight size={11} />
              </button>
            </div>
            <div className="db-empty">
              <FaHandshake size={28} color="#ccc" />
              <p>No services yet. Offer your first service!</p>
              <button className="db-action-btn db-btn-blue" style={{ marginTop: 12 }} onClick={() => setShowSvcModal(true)}>
                <FaPlus size={12} /> Offer Service
              </button>
            </div>
          </div>
        </div>

        {/* ── RECOMMENDED + BROWSE ROW ── */}
        <div className="db-bottom-row">

          {/* Recommended for You */}
          <div className="db-recommended">
            <h3>Recommended for You</h3>
            <div className="db-rec-grid">
              {RECOMMENDED.map((item) => (
                <div key={item.name} className="db-rec-card" onClick={() => navigate("/market")}>
                  <img src={item.img} alt={item.name} />
                  <div className="db-rec-info">
                    <span className="db-rec-name">{item.name}</span>
                    <span className="db-rec-price">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browse Marketplace CTA */}
          <div className="db-browse-panel">
            <div className="db-browse-img" />
            <div className="db-browse-content">
              <h3>Explore the Marketplace</h3>
              <p>Browse thousands of fresh products from farmers across Cameroon.</p>
              <button className="db-browse-btn" onClick={() => navigate("/market")}>
                Browse Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ ADD PRODUCT MODAL ══ */}
      {showAddModal && (
        <div className="db-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="db-modal" onClick={e => e.stopPropagation()}>
            <div className="db-modal-header">
              <h2><FaPlus size={14} /> Post a Product</h2>
              <button onClick={() => setShowAddModal(false)}><FaTimes /></button>
            </div>

            <div className="db-modal-body">
              {/* Image upload */}
              <div
                className={`db-dropzone ${dragOver ? "db-drop-over" : ""}`}
                onDrop={e => { e.preventDefault(); setDragOver(false); setImageFiles(Array.from(e.dataTransfer.files).slice(0,1)); }}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileRef.current?.click()}
              >
                {imageFiles[0]
                  ? <img src={URL.createObjectURL(imageFiles[0])} alt="preview" className="db-drop-preview" />
                  : <><FaUpload size={22} color="#2E7D32" /><p>Click or drag to upload image</p></>
                }
                <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleFileChange} />
              </div>

              <div className="db-modal-grid">
                <div className="db-mfield db-full">
                  <label>Product name *</label>
                  <input name="name" value={form.name} onChange={e => handleChange(e, setForm)} placeholder="e.g. Fresh Tomatoes" />
                </div>
                <div className="db-mfield">
                  <label>Category *</label>
                  <select name="category" value={form.category} onChange={e => handleChange(e, setForm)}>
                    <option value="">Select</option>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="db-mfield">
                  <label>Subcategory</label>
                  <select name="subcategory" value={form.subcategory} onChange={e => handleChange(e, setForm)} disabled={!subcats.length}>
                    <option value="">Select</option>
                    {subcats.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="db-mfield">
                  <label>Price (XAF) *</label>
                  <input name="price" type="number" value={form.price} onChange={e => handleChange(e, setForm)} placeholder="e.g. 5000" />
                </div>
                <div className="db-mfield">
                  <label>Unit *</label>
                  <select name="unit" value={form.unit} onChange={e => handleChange(e, setForm)}>
                    <option value="">Select</option>
                    {UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <div className="db-mfield">
                  <label>Stock quantity</label>
                  <input name="stock" type="number" value={form.stock} onChange={e => handleChange(e, setForm)} placeholder="e.g. 100" />
                </div>
                <div className="db-mfield">
                  <label>Min. order</label>
                  <input name="minOrder" type="number" value={form.minOrder} onChange={e => handleChange(e, setForm)} placeholder="e.g. 1" />
                </div>
                <div className="db-mfield db-full">
                  <label>Description</label>
                  <textarea name="description" value={form.description} onChange={e => handleChange(e, setForm)} rows={3} placeholder="Describe your product..." />
                </div>
                <div className="db-mfield">
                  <label>Visibility</label>
                  <select name="status" value={form.status} onChange={e => handleChange(e, setForm)}>
                    <option value="public">Public</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="db-modal-footer">
              <button className="db-modal-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="db-modal-submit db-btn-green" onClick={() => handleSubmit(form)} disabled={uploading}>
                {uploading ? "Posting..." : <><FaPlus size={12} /> Post Product</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ OFFER SERVICE MODAL ══ */}
      {showSvcModal && (
        <div className="db-modal-backdrop" onClick={() => setShowSvcModal(false)}>
          <div className="db-modal" onClick={e => e.stopPropagation()}>
            <div className="db-modal-header">
              <h2><FaHandshake size={14} /> Offer a Service</h2>
              <button onClick={() => setShowSvcModal(false)}><FaTimes /></button>
            </div>

            <div className="db-modal-body">
              <div className="db-modal-grid">
                <div className="db-mfield db-full">
                  <label>Service name *</label>
                  <input name="name" value={svcForm.name} onChange={e => handleChange(e, setSvcForm)} placeholder="e.g. Farm Training" />
                </div>
                <div className="db-mfield">
                  <label>Subcategory</label>
                  <select name="subcategory" value={svcForm.subcategory} onChange={e => handleChange(e, setSvcForm)}>
                    <option value="">Select</option>
                    {svcSubcats.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="db-mfield">
                  <label>Price (XAF) *</label>
                  <input name="price" type="number" value={svcForm.price} onChange={e => handleChange(e, setSvcForm)} placeholder="e.g. 15000" />
                </div>
                <div className="db-mfield db-full">
                  <label>Description</label>
                  <textarea name="description" value={svcForm.description} onChange={e => handleChange(e, setSvcForm)} rows={3} placeholder="Describe your service..." />
                </div>
                <div className="db-mfield">
                  <label>Visibility</label>
                  <select name="status" value={svcForm.status} onChange={e => handleChange(e, setSvcForm)}>
                    <option value="public">Public</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="db-modal-footer">
              <button className="db-modal-cancel" onClick={() => setShowSvcModal(false)}>Cancel</button>
              <button className="db-modal-submit db-btn-blue" onClick={() => handleSubmit({ ...svcForm, minOrder: "1" })} disabled={uploading}>
                {uploading ? "Posting..." : <><FaPlus size={12} /> Post Service</>}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
