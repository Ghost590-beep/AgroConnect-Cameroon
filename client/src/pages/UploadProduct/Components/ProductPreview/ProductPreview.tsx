import React from "react";
import { FaEye, FaImage } from "react-icons/fa";
import "./ProductPreview.css";

interface ProductPreviewProps {
  imageFiles: File[];
  name: string;
  category: string;
  price: string;
  stock: string;
  unit: string;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({
  imageFiles,
  name,
  category,
  price,
  stock,
  unit,
}) => {
  return (
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
        <div className="up-pf">
          <span className="up-pf-label">Product name</span>
          <span className="up-pf-val">{name || "—"}</span>
        </div>
        <div className="up-pf">
          <span className="up-pf-label">Category</span>
          <span className="up-pf-val">{category || "—"}</span>
        </div>
        <div className="up-pf">
          <span className="up-pf-label">Price</span>
          <span className="up-pf-val">{price ? `FCFA ${price}` : "—"}</span>
        </div>
        <div className="up-pf">
          <span className="up-pf-label">Available stock</span>
          <span className="up-pf-val">{stock ? `${stock} ${unit}` : "—"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;