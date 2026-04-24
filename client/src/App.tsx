import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Landing from "./pages/LandingPage/Landing";

/*
  App.tsx — root router
  Routes:
    /           → redirect to /login
    /login      → Login page
    /register   → Register page
    /Landing    → Landing page

  TODO: add /dashboard, /marketplace, /profile as they are built
*/
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
