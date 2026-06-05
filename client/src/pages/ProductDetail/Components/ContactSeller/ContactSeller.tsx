import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import "./ContactSeller.css";

interface ContactSellerProps {
  phone?: string;
}

const ContactSeller: React.FC<ContactSellerProps> = ({ phone }) => {
  return (
    <div className="pd-contact-row">
      <a href={`tel:${phone || ""}`} className="pd-contact-btn">
        <FaPhone size={12} /> Call seller
      </a>
      
      <a  href={`https://wa.me/${phone || ""}`}
        target="_blank"
        rel="noreferrer"
        className="pd-whatsapp-btn"
      >
        <FaWhatsapp size={12} /> WhatsApp
      </a>
    </div>
  );
};

export default ContactSeller;