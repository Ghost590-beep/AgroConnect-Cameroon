import React from "react";
import "../Hero/Hero.css";
import Header from "../Header/Header";
import {motion} from 'framer-motion'
import type { Transition } from "framer-motion";

const Hero: React.FC = () => {

  const transition:Transition= {type: 'spring', duration :3};
  return (
    <div className="hero">

      <div className="blur hero-blur-"></div>
      <div className="left-h">
        <Header/>
{/* the best add */}
        <div className="the-best-ad">
        <motion.div
           initial={{left:'238px'}}
           whileInView={{ left: '8px' }}
           transition={{
           duration:2,
           ease:"easeInOut",
           repeat:Infinity,
           repeatType:"reverse"
        }}
        ></motion.div>
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
                <span>The number one agriculture marketplace buy,sell </span><br/>
                <span>and rent crops,animals,machines and more.</span>
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

       </div>
    </div>
  );
};

export default Hero;
