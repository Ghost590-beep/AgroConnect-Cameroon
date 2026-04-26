import React from "react";
import "../Hero/Hero.css";
import Header from "../Header/Header";
import hero_image from "../../../../assets/hero_image.png"
import hero_image_back from "../../../../assets/i.png"
import Heart from "../../../../assets/o-removebg-preview.png"
import Calories from "../../../../assets/calories.png"

const Hero: React.FC = () => {
  return (
    <div className="hero">

      <div className="blur hero-blur-"></div>
      <div className="left-h">
        <Header/>
{/* the best add */}
        <div className="the-best-ad">
        <div></div>
        <span>Your digital partners in agriculture </span>
        </div>

{/* Hero heading */}
        <div className="hero-text">
            <div>
            <span className="stroke-text">Connect </span>

            <span>Thrive</span>
            </div> 
            <div>
              <span>Grow</span>
              </div>
              <div>
                <span>The number one agriculture marketplace buy,sell and rent crops,animals,machines and more.</span>
              </div>
        </div>

{/* figures */}
        <div className="figures">
          <div>
            <button className="figure">
            <span>+50,000 </span>
            <span>Farmers</span>
            </button>
          </div>
          <div>
            <button className="figure">
            <span>+12,000 </span>
            <span>Product</span>
            </button>
          </div>
          <div>
            <button className="figure">
            <span>+3,200 </span>
            <span>Buyers</span>
            </button>
          </div>
        </div>

        {/* hero competition */}
        <div className="hero-button">
          <button className="btn">Get Started</button>
          <button className="btn">Learn more</button>
        </div>
      </div>

       <div className="right-h">
        <button className="btn">Sign Up</button>


        <div className="heart-rate">
          <img src={Heart} alt="" className="herat" />
          {/* <span>Faster</span>
          <span>Easier</span> */}
        </div>

        <div>
          <img src={hero_image_back} alt="" className="hero-image-back" />
          <img src={hero_image} alt=""  className="hero-image"/>
        </div>

        <div className="calories">
          <img src={Calories} alt="" />
           <div>
            <span>Crop yield</span>
          <span>220 tonnes per hectare</span>
           </div>
        </div>

       </div>
    </div>
  );
};

export default Hero;
