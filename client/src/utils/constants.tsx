// utils/constants.tsx

import React from "react";
import {
  FaSearch, FaTimes, FaLeaf, FaAppleAlt, FaSeedling,
  FaTruck, FaShieldAlt, FaHeadset, FaShoppingCart,
  FaTrash, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaFacebook, FaTwitter, FaInstagram, FaWhatsapp,
  FaFilter, FaSortAmountDown, FaChevronRight,
  FaCheckCircle, FaCrow, FaTractor, FaHandshake,
  FaCapsules, FaTools, FaTint, FaUserTie,
  FaBug, FaFlask, FaCheese, FaChalkboardTeacher, FaStore,
} from "react-icons/fa";
export const API_BASE = "http://localhost:5000";
export const API = `${API_BASE}/api`;
export const DELIVERY_FEE = 50;

export const CATEGORY_EMOJI: Record<string, string> = {
  "Crops & Seeds": "🌿",
  Animals:         "🐄",
  "Machines & Tools": "🚜",
  Services:        "🤝",
  Medications:     "💊",
  Training:        "📚",
};

export interface SubCategory {
  name: string;
  icon: React.ReactNode;
}

export interface Category {
  name: string;
  icon: React.ReactNode;
  subcategories: SubCategory[];
}

export const CATEGORIES: Category[] = [
  {
    name: "All Categories",
    icon: <FaLeaf />,
    subcategories: [],
  },
  {
    name: "Crops & Seeds",
    icon: <FaLeaf />,
    subcategories: [
      { name: "Vegetables",     icon: <FaLeaf /> },
      { name: "Fruits",         icon: <FaAppleAlt /> },
      { name: "Grains",         icon: <FaSeedling /> },
      { name: "Seeds",          icon: <FaSeedling /> },
      { name: "Dairy Products", icon: <FaCheese /> },
    ],
  },
  {
    name: "Animals",
    icon: <FaCrow />,
    subcategories: [
      { name: "Livestock", icon: <FaCrow /> },
    ],
  },
  {
    name: "Machines & Tools",
    icon: <FaTractor />,
    subcategories: [
      { name: "Tractors",              icon: <FaTractor /> },
      { name: "Hand Tools",            icon: <FaTools /> },
      { name: "Irrigation Equipment",  icon: <FaTint /> },
      { name: "Harvesting Equipment",  icon: <FaTools /> },
    ],
  },
  {
    name: "Services",
    icon: <FaHandshake />,
    subcategories: [
      { name: "Farm Labour",      icon: <FaUserTie /> },
      { name: "Transportation",   icon: <FaTruck /> },
      { name: "Consultancy",      icon: <FaHandshake /> },
      { name: "Equipment Rental", icon: <FaTractor /> },
    ],
  },
  {
    name: "Medications",
    icon: <FaCapsules />,
    subcategories: [
      { name: "Animal Medicine", icon: <FaCapsules /> },
      { name: "Crop Protection", icon: <FaBug /> },
      { name: "Supplements",     icon: <FaFlask /> },
    ],
  },
  {
    name: "Training",
    icon: <FaChalkboardTeacher />,
    subcategories: [
      { name: "Farming Techniques",     icon: <FaChalkboardTeacher /> },
      { name: "Sustainable Agriculture", icon: <FaLeaf /> },
      { name: "Market Access",          icon: <FaStore /> },
    ],
  },
];

export const FEATURES = [
  { title: "Safe & Secure", text: "Protected transactions", icon: <FaShieldAlt /> },
  { title: "Quality Products", text: "From trusted local farmers", icon: <FaLeaf /> },
  { title: "Fast Delivery", text: "Quick and reliable delivery", icon: <FaTruck /> },
  { title: "24/7 Support", text: "We are here to help", icon: <FaHeadset /> },
];

export const LOCATIONS = [
  "All Locations",
  "Yaounde",
  "Bamenda",
  "Bafoussam",
  "Douala",
  "Nigeria",
  "Other",
];