import React from "react";
import "../Footer/footer.css";
import Github from "../../../../assets/github.png"
import Instagram from "../../../../assets/instagram.png"
import LinkedIn from "../../../../assets/linkedin.png"
import Logo from "../../../../assets/logo (3).png"


const Footer: React.FC = () => {
  return (
   <div className="Footer-container">
      <hr />
      <div className="footer">
        <div className="social-links">
        <img src={Github} alt="" />
        <img src={Instagram} alt="" />
        <img src={LinkedIn} alt="" />
      </div>
      <div className="logo-f">
        <img src={Logo} alt="" />
      </div>
    </div>
   </div>
  );
};

export default Footer;
