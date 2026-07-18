import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css";

interface LayoutProps {
  variant?: "full" | "minimal";
}

const Layout: React.FC<LayoutProps> = ({ variant = "full" }) => {
  return (
    <div className="app-shell">
      <Navbar variant={variant} />
      <main className={`app-shell-main ${variant === "minimal" ? "app-shell-main-minimal" : ""}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
