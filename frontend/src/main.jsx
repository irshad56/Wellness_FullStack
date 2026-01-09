import React from "react";
import ReactDOM from "react-dom/client";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard.jsx";
import BookTherapy from "./pages/BookTherapy";
import { AuthProvider } from "./auth/AuthContext";
import ViewProfile from "./pages/ViewProfile.jsx";
import BookSession from "./pages/BookSession.jsx";
import Products from "./pages/Products.jsx";
import MySessions from "./pages/MySessions.jsx";
import BuyNow from "./pages/BuyNow.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import AskQuestion from "./pages/AskQuestion.jsx";
import AIRecommendation from "./pages/AIRecommendation.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookTherapy" element={<BookTherapy />} />
        <Route path="/profile/:id" element={<ViewProfile />} />
        <Route path="/book-session/:id" element={<BookSession />} />
        <Route path="/products" element={<Products />} />
        <Route path="/activity" element={<MySessions />} />
        <Route path="/BuyNow" element={<BuyNow />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/ai-recommendation" element={<AIRecommendation />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);


