import React from "react";
import "../../styles/Landing.css";
import Hero from "./Components/Hero/Hero";
import Program from "./Components/Program/Programs";


/* ✅ Main component */
const Landing: React.FC = () => {
  return (
    <div>
      <Hero />
      <Program/>
    </div>
  );
};

export default Landing;