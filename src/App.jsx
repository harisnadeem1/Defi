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
import DeFiWikiPage from "@/pages/DeFiWikiPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import PrivateRoute from "@/components/PrivateRoute";
import LegalPage from "@/pages/LegalPage";
import ContactPage from "@/pages/ContactPage";

// Add this route

// Inside your <Routes>


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
<Route path="/legal/:slug" element={<LegalPage />} />
<Route path="/contact" element={<ContactPage />} />



            {/* Routes that require user to be logged in (any role) */}
            <Route
              path="/strategies"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/strategy/:id"
              element={
                <PrivateRoute>
                  <StrategyPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/learn-defi"
              element={
                <PrivateRoute>
                  <DeFiFundamentalsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/wiki"
              element={
                <PrivateRoute>
                  <DeFiWikiPage />
                </PrivateRoute>
              }
            />

            {/* Role-based protected routes */}
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
