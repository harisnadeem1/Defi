import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingPage from "@/pages/LandingPage"; 
import HomePage from "@/pages/HomePage"; 
import StrategyPage from "@/pages/StrategyPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminPage from "@/pages/AdminPage";
import ProfilePage from "@/pages/ProfilePage";
import ChatPage from "@/pages/ChatPage";
import DeFiFundamentalsPage from "@/pages/DeFiFundamentalsPage";
import DeFiWikiPage from "@/pages/DeFiWikiPage"; // New Wiki Page
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/strategies" element={<HomePage />} />
            <Route path="/strategy/:id" element={<StrategyPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/learn-defi" element={<DeFiFundamentalsPage />} />
            <Route path="/wiki" element={<DeFiWikiPage />} /> {/* New Wiki Route */}
            
            <Route element={<ProtectedRoute allowedRoles={['user', 'worker', 'admin']} />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin', 'worker']} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;