import React from "react";
import { useNavigate } from "react-router-dom";
import "../Program/Program.css";
import Background from "../../../../assets/agro.jpg";

const Programs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="Programs" id="programs">

      {/* Header */}
      <div className="programs-header">
        <span className="stroke-text">Explore our</span>
        <span>Programs</span>
        <span className="stroke-text">
          to start your Journey
        </span>
      </div>

      {/* Cards */}
      <div className="cards">

        {/* Card 1 */}
        <div className="card">
          <div className="card-content">

            <h2>Add a New Product</h2>

            <p>
              Sell crops, livestock, equipment,
              and more.
            </p>

            <button
              className="card-btn"
              onClick={() => navigate("/upload-product")}
            >
              + Add Product
            </button>

          </div>

          {/* OPTIONAL IMAGE */}
          {/* 
          <img
            src={Background}
            alt="product"
            className="card-img"
          /> 
          */}
        </div>

        {/* Card 2 */}
        <div className="card">
          <div className="card-content">

            <h2>Offer a Service</h2>

            <p>
              Provide training, rental services,
              and more.
            </p>

            <button
              className="card-btn blue"
            >
              + Offer Service
            </button>

          </div>

          {/* OPTIONAL IMAGE */}
          {/* 
          <img
            src={Background}
            alt="service"
            className="card-img"
          /> 
          */}
        </div>

        {/* Card 3 */}
        <div className="card">
          <div className="card-content">

            <h2>Create an Account</h2>

            <p>
              Join AgroConnect and start buying,
              selling, and growing.
            </p>

            <button
              className="card-btn"
              onClick={() => navigate("/register")}
            >
              + Create Account
            </button>

          </div>

          {/* OPTIONAL IMAGE */}
          {/* 
          <img
            src={Background}
            alt="account"
            className="card-img"
          /> 
          */}
        </div>

      </div>

    </div>
  );
};

export default Programs;