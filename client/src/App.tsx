import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout/Layout";

import Landing from "./pages/LandingPage/Landing (2)";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Market from "./pages/MarketPage/Market";
import Profile from "./pages/ProfilePage/Profile";
import Checkout from "./pages/Checkout/checkout (2)";
import UploadProduct from "./pages/UploadProduct/UploadProduct";
import ProductDetail from "./pages/ProductDetail/ProductDetail (2)";
import About from "./pages/About/About";
import Dashboard from "./pages/Dashboard/Dashboard";


// inside <Route element={<ProtectedRoute />}> or as public — your choice:

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />

        {/* Public + protected pages sharing the full navbar/footer chrome */}
        <Route element={<Layout variant="full" />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/about" element={<About />} />

          {/* Protected — redirect to /login if not logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="/market" element={<Market />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/upload-product" element={<UploadProduct />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        {/* Public only, minimal chrome — redirect to /market if already logged in */}
        <Route element={<Layout variant="minimal" />}>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;