import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Landing from "./pages/LandingPage/Landing";
import Profile from "./pages/ProfilePage/Profile";

/*
  App.tsx — root router
  Routes:
    /           → redirect to /login
    /login      → Login page
    /register   → Register page
    /Landing    → Landing page
    /Profile    → Profile page

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
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
