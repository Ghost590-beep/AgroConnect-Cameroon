import React, { useRef } from "react";
import { FaImage, FaCloudUploadAlt, FaCheck } from "react-icons/fa";
import "./ImageUploader.css";

interface ImageUploaderProps {
  imageFiles: File[];
  dragOver: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageFiles,
  dragOver,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileChange,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="up-card">
      <div className="up-card-title">
        <FaImage className="up-card-icon" />
        Product images
      </div>
      <p className="up-img-hint">
        Upload clear images of your product. You can add up to 5 images.
      </p>

      <div className="up-img-row">
        <div
          className={`up-drop-zone ${dragOver ? "up-drop-over" : ""}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => fileRef.current?.click()}
        >
          <div className="up-drop-icon">
            <FaCloudUploadAlt size={24} color="#2E7D32" />
          </div>
          <p className="up-drop-text">Drag &amp; drop your images here</p>
          <p className="up-drop-or">or</p>
          <button
            className="up-choose-btn"
            type="button"
            onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
          >
            Choose files
          </button>
          <p className="up-file-meta">JPG, PNG or WebP (Max. 5MB each)</p>
          <p className="up-file-count">{imageFiles.length} of 5 images uploaded</p>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
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
  );
};

export default ImageUploader;