import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Accessible only when NOT logged in.
 * Logged-in users are redirected to /market.
 */
const PublicRoute: React.FC = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/market" replace /> : <Outlet />;
};

export default PublicRoute;