// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import BookTherapy from "./pages/BookTherapy";
import Dashboard from "./pages/Dashboard";
import ViewProfile from "./pages/ViewProfile";
import BookSession from "./pages/BookSession";
import Products from "./pages/Products";
import MySessions from "./pages/MySessions";
import BuyNow from "./pages/BuyNow";
import CommunityPage from "./pages/CommunityPage";
import AskQuestion from "./pages/AskQuestion";
import AIRecommendation from "./pages/AIRecommendation";

import ProtectedRoute from "./auth/ProtectedRoute";
import "./index.css";

export default function App() {
  return (
    <Routes>
      {/* ---------- Public Routes ---------- */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />


      {/* ---------- Protected Routes ---------- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookTherapy" element={<BookTherapy />} />

        {/* ✅ NEW: Practitioner Profile */}
        <Route path="/profile/:id" element={<ViewProfile />} />
        <Route path="/book-session/:id" element={<BookSession />} />
        <Route path="/products" element={<Products />} />
        <Route path="/activity" element={<MySessions />} />
        <Route path="/BuyNow" element={<BuyNow />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/ai-recommendation" element={<AIRecommendation />} />

      </Route>

      {/* ---------- Default Redirect ---------- */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* ---------- 404 ---------- */}
      <Route
        path="*"
        element={<div className="p-10 text-center">404 Not Found</div>}
      />
    </Routes>
  );
}