import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { uploadProduct } from "../../services/productService";
import ProductInfoForm from "./Components/ProductInfoForm/ProductInfoForm";
import ImageUploader from "./Components/ImageUploader/ImageUpload";
import ActionBar from "./Components/ActionBar/ActionBar";
import ProductPreview from "./Components/ProductPreview/ProductPreview";
import PublishOptions from "./Components/PublishOptions/PublishOptions";
import "../../styles/UploadProduct.css";

const UploadProduct: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation<{ category?: string }>();

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files].slice(0, 5));
  };

  useEffect(() => {
    if (location.state?.category) {
      setForm((prev) => ({ ...prev, category: location.state.category }));
    }
  }, [location.state]);

  const handleSubmit = async (draft = false) => {
    if (!draft) {
      if (!form.name || !form.category || !form.price || !form.unit || !form.stock) {
        alert("Please fill all required fields.");
        return;
      }
      if (form.description.length < 5) {
        alert("Description must be at least 5 characters.");
        return;
      }
    }
    if (!token) {
      alert("You must be logged in to upload a product.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("subcategory", form.subcategory);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock_quantity", form.stock);
      formData.append("unit", form.unit);
      formData.append("min_order", form.minOrder);
      formData.append("location", "");
      formData.append("status", draft ? "draft" : visibility === "public" ? "active" : "draft");
      if (imageFiles.length > 0) {
        formData.append("image", imageFiles[0]);
      }
      await uploadProduct(token, formData);
      alert(draft ? "Saved as draft!" : "Product published successfully!");
      navigate("/profile");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

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
            <ProductInfoForm form={form} onChange={handleChange} />
            <ImageUploader
              imageFiles={imageFiles}
              dragOver={dragOver}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={() => setDragOver(false)}
              onFileChange={handleFileChange}
            />
            <ActionBar
              loading={loading}
              onCancel={() => navigate("/market")}
              onDraft={() => handleSubmit(true)}
              onPublish={() => handleSubmit(false)}
            />
          </div>

          {/* ── RIGHT ── */}
          <div className="up-right">
            <ProductPreview
              imageFiles={imageFiles}
              name={form.name}
              category={form.category}
              price={form.price}
              stock={form.stock}
              unit={form.unit}
            />
            <PublishOptions
              visibility={visibility}
              onSelect={setVisibility}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default UploadProduct;