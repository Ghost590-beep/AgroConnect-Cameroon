import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaClipboardList,
  FaImage,
  FaEye,
  FaShieldAlt,
  FaRocket,
  FaCheck,
  FaCloudUploadAlt,
} from "react-icons/fa";
import "../../client/src/styles/UploadProduct.css";

const CATEGORIES = ["Crops & Seeds", "Animals", "Machines & Tools", "Services", "Medications", "Training"];

const SUBCATEGORIES: Record<string, string[]> = {
  "Crops & Seeds": ["Vegetables", "Fruits", "Grains", "Seeds", "Dairy Products"],
  Animals: ["Livestock"],
  "Machines & Tools": ["Tractors", "Hand Tools", "Irrigation Equipment", "Harvesting Equipment"],
  Services: ["Farm Labour", "Transportation", "Consultancy", "Equipment Rental"],
  Medications: ["Animal Medicine", "Crop Protection", "Supplements"],
  Training: ["Farming Techniques", "Sustainable Agriculture", "Market Access"],
};

const UNITS = ["kg", "g", "bunch", "piece", "litre", "bag", "crate"];

const UploadProduct: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    subcategory: "",
    unit: "",
    description: "",
    price: "",
    minOrder: "",
    stock: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    setImageFiles((prev) => [...prev, ...files].slice(0, 5));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files].slice(0, 5));
  };

  const handleSubmit = async (draft = false) => {
    if (!draft && (!form.name || !form.category || !form.price)) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/products",
        {
          name: form.name,
          category: form.category,
          subcategory: form.subcategory,
          description: form.description,
          price: form.price,
          stock_quantity: form.stock,
          unit: form.unit,
          min_order: form.minOrder,
          location: "",
          status: draft ? "draft" : visibility,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(draft ? "Saved as draft!" : "Product published successfully!");
      navigate("/market");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  const subcats = form.category ? SUBCATEGORIES[form.category] || [] : [];

  return (
    <div className="up-page">
      <div className="up-container">
        <div className="up-header">
          <h1 className="up-title">Upload new product</h1>
          <nav className="up-breadcrumb">
            <span onClick={() => navigate("/landing")}>Dashboard</span>
            <span className="up-sep">&rsaquo;</span>
            <span className="up-active">Upload product</span>
          </nav>
        </div>

        <div className="up-layout">
          {/* ── LEFT ── */}
          <div className="up-left">

            {/* PRODUCT INFO */}
            <div className="up-card">
              <div className="up-card-title">
                <FaClipboardList className="up-card-icon" />
                Product information
              </div>
              <div className="up-form-row">
                <div className="up-field">
                  <label>Product name <span className="up-req">*</span></label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Fresh Tomatoes"
                  />
                </div>
                <div className="up-field">
                  <label>Category <span className="up-req">*</span></label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="up-form-row">
                <div className="up-field">
                  <label>Subcategory</label>
                  <select name="subcategory" value={form.subcategory} onChange={handleChange} disabled={!subcats.length}>
                    <option value="">Select subcategory</option>
                    {subcats.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="up-field">
                  <label>Unit of measure <span className="up-req">*</span></label>
                  <select name="unit" value={form.unit} onChange={handleChange}>
                    <option value="">Select unit</option>
                    {UNITS.map((u) => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div className="up-field up-full">
                <label>Description <span className="up-req">*</span></label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  maxLength={500}
                  placeholder="Describe your product, quality, and any other important details..."
                />
                <span className="up-char-count">{form.description.length}/500</span>
              </div>
              <div className="up-form-row up-three">
                <div className="up-field">
                  <label>Price <span className="up-req">*</span></label>
                  <div className="up-price-wrap">
                    <span className="up-prefix">FCFA</span>
                    <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="e.g. 120" />
                  </div>
                </div>
                <div className="up-field">
                  <label>Min. order quantity <span className="up-req">*</span></label>
                  <div className="up-unit-wrap">
                    <input name="minOrder" type="number" value={form.minOrder} onChange={handleChange} placeholder="e.g. 10" />
                    <span className="up-suffix">{form.unit}</span>
                  </div>
                </div>
                <div className="up-field">
                  <label>Stock available <span className="up-req">*</span></label>
                  <div className="up-unit-wrap">
                    <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="e.g. 100" />
                    <span className="up-suffix">{form.unit}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGES */}
            <div className="up-card">
              <div className="up-card-title">
                <FaImage className="up-card-icon" />
                Product images
              </div>
              <p className="up-img-hint">Upload clear images of your product. You can add up to 5 images.</p>
              <div className="up-img-row">
                <div
                  className={`up-drop-zone ${dragOver ? "up-drop-over" : ""}`}
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onClick={() => fileRef.current?.click()}
                >
                  <div className="up-drop-icon">
                    <FaCloudUploadAlt size={24} color="#2E7D32" />
                  </div>
                  <p className="up-drop-text">Drag &amp; drop your images here</p>
                  <p className="up-drop-or">or</p>
                  <button className="up-choose-btn" type="button" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>
                    Choose files
                  </button>
                  <p className="up-file-meta">JPG, PNG or WebP (Max. 5MB each)</p>
                  <p className="up-file-count">{imageFiles.length} of 5 images uploaded</p>
                  <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                </div>
                <div className="up-tips-box">
                  <h4>Tips for great photos</h4>
                  {[
                    "Use natural lighting",
                    "Show product from different angles",
                    "Ensure images are clear and sharp",
                    "Avoid filters and heavy editing",
                    "Include actual product only",
                  ].map((tip) => (
                    <div className="up-tip-row" key={tip}>
                      <FaCheck size={11} color="#2E7D32" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
              {imageFiles.length > 0 && (
                <div className="up-thumbs">
                  {imageFiles.map((f, i) => (
                    <div key={i} className="up-thumb">
                      <img src={URL.createObjectURL(f)} alt={f.name} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACTION BAR */}
            <div className="up-action-bar">
              <button className="up-cancel-btn" onClick={() => navigate("/market")}>Cancel</button>
              <div className="up-btn-group">
                <button className="up-draft-btn" onClick={() => handleSubmit(true)} disabled={loading}>
                  Save as draft
                </button>
                <button className="up-publish-btn" onClick={() => handleSubmit(false)} disabled={loading}>
                  <FaRocket size={13} />
                  {loading ? "Publishing..." : "Publish product"}
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="up-right">

            {/* PREVIEW */}
            <div className="up-card">
              <div className="up-card-title">
                <FaEye className="up-card-icon" />
                Product preview
              </div>
              <div className="up-preview-img">
                {imageFiles.length > 0 ? (
                  <img src={URL.createObjectURL(imageFiles[0])} alt="preview" />
                ) : (
                  <>
                    <FaImage size={28} color="#ccc" />
                    <p>Product image will appear here</p>
                  </>
                )}
              </div>
              <div className="up-preview-fields">
                <div className="up-pf"><span className="up-pf-label">Product name</span><span className="up-pf-val">{form.name || "—"}</span></div>
                <div className="up-pf"><span className="up-pf-label">Category</span><span className="up-pf-val">{form.category || "—"}</span></div>
                <div className="up-pf"><span className="up-pf-label">Price</span><span className="up-pf-val">{form.price ? `FCFA ${form.price}` : "—"}</span></div>
                <div className="up-pf"><span className="up-pf-label">Available stock</span><span className="up-pf-val">{form.stock ? `${form.stock} ${form.unit}` : "—"}</span></div>
              </div>
            </div>

            {/* QUALITY */}
            <div className="up-quality-card">
              <div className="up-q-icon"><FaShieldAlt size={15} color="#fff" /></div>
              <div>
                <h4>Quality assurance</h4>
                <p>All products are reviewed to ensure quality and transparency.</p>
              </div>
            </div>

            {/* PUBLISHING OPTIONS */}
            <div className="up-card">
              <div className="up-card-title">
                <FaRocket className="up-card-icon" />
                Publishing options
              </div>
              <p className="up-vis-label">Visibility <span className="up-req">*</span></p>
              {(["public", "private"] as const).map((v) => (
                <div key={v} className="up-vis-option" onClick={() => setVisibility(v)}>
                  <div className={`up-radio ${visibility === v ? "up-radio-on" : ""}`}>
                    {visibility === v && <span className="up-radio-dot" />}
                  </div>
                  <div>
                    <h4>{v.charAt(0).toUpperCase() + v.slice(1)}</h4>
                    <p>{v === "public" ? "Visible to all buyers" : "Only visible to specific buyers"}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;