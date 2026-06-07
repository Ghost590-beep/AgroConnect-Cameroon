import React from "react";
import { FaLeaf } from "react-icons/fa";
import "./ProductImage.css";

interface ProductImageProps {
  image?: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ image, name }) => {
  return (
    <div className="pd-image-col">
      {image ? (
        <img
          src={image}
          alt={name}
          className="pd-image"
        />
      ) : (
        <div className="pd-image-placeholder">
          <FaLeaf size={48} color="#ccc" />
        </div>
      )}
    </div>
  );
};

export default ProductImage;