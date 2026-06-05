import React from "react";
import Navbar from "../LandingPage/Component/Navbar/Navbar";
import HeroSection from "../LandingPage/Component/Hero/Hero";
import StatsFeatures from "../LandingPage/Component/StatsFeatures/Stats";
import CategoriesHow from "../LandingPage/Component/Catergory/Cat";
import TestimonialsJoinFooter from "../LandingPage/Component/Testimonials/Test";
import "./Landing.css";
import FeaturedProducts from "../LandingPage/Component/Feature/Feature";

const Landing: React.FC = () => (
  <div className="ln-page">
    <Navbar />
    <HeroSection />
    <StatsFeatures />
    <CategoriesHow />
    <FeaturedProducts/>
    <TestimonialsJoinFooter />
  </div>
);

export default Landing;
