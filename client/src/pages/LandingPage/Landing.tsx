import React from "react";
import "../../styles/Landing.css";
import Hero from "./Components/Hero/Hero";
import Program from "./Components/Program/Programs";
import Category from "./Components/Category/Category";
import Require from "./Components/Requirement/Require";


/* ✅ Main component */
const Landing: React.FC = () => {
  return (
    <div>
      <Hero />
      <Program/>
      <Category/>
      <Require/>
    </div>
  );
};

export default Landing;