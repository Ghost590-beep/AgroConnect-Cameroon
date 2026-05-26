import React, { useState } from "react";
import axios from "axios";
import "./styles/UploadProduct.css";

const UploadProduct: React.FC = () => {

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    location: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  /* HANDLE INPUT CHANGE */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* SUBMIT PRODUCT */
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/products",
        {
          name: form.name,
          category: form.category,
          price: form.price,
          location: form.location,
          description: form.description,
          image: form.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product uploaded successfully!");

      console.log(res.data);

      /* CLEAR FORM */
      setForm({
        name: "",
        category: "",
        price: "",
        location: "",
        description: "",
        image: "",
      });

    } catch (err: any) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Failed to upload product"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">

      <div className="upload-card">

        <h1>Upload Product</h1>

        <form onSubmit={handleSubmit}>

          {/* PRODUCT NAME */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Category
            </option>

            <option value="Vegetables">
              Vegetables
            </option>

            <option value="Fruits">
              Fruits
            </option>

            <option value="Grains">
              Grains
            </option>

            <option value="Livestock">
              Livestock
            </option>

            <option value="Seeds">
              Seeds
            </option>

            <option value="Fertilizers">
              Fertilizers
            </option>
          </select>

          {/* PRICE */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          {/* IMAGE URL */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            rows={5}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Uploading..."
              : "Upload Product"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default UploadProduct;