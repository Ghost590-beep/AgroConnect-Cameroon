import React from "react";
import "../Header/Header.css";
import Logo from '../../../../assets/logo (3).png'


const Header: React.FC = () => {
  return (
   <div className="header">

      <img src={Logo} alt="" className="Logo" />

      <ul className="header-menu">
        <li>DashBoard</li>
        <li>Marketplace</li>
        <li>About</li>  
        <li>Profile</li>
        <li>Contact</li>
      </ul>
   </div>
  );
};

export default Header;
