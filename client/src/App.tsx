import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Landing from "./pages/LandingPage/Landing (2)";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Market from "./pages/MarketPage/Market";
import Profile from "./pages/ProfilePage/Profile";
import Checkout from "./pages/Checkout/checkout (2)";
import UploadProduct from "./pages/UploadProduct/UploadProduct";
import ProductDetail from "./pages/ProductDetail/ProductDetail (2)";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Always public */}
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<Landing />} />

        {/* Public only — redirect to /market if already logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected — redirect to /login if not logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/market" element={<Market />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/upload-product" element={<UploadProduct />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;