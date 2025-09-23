import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import RoadmapPage from "./pages/RoadmapPage";
import SimpleProfilePage from "./pages/SimpleProfilePage";
import StatsPage from "./pages/StatsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import { ProgressiveBlur } from "./components/magicui/progressive-blur";
import { MobileScrollNav } from "./components/MobileScrollNav";
import { BackgroundRippleEffect } from "./components/ui/background-ripple-effect";
import { DockDemo } from "./components/DockDemo";
import Header from "./components/Header";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isStatsPage = location.pathname === "/profile/stats";
  const isRoadmapPage = location.pathname === "/roadmap";

  return (
    <div className="App min-h-screen relative">
      {/* Background Ripple Effect */}
      <div className="fixed inset-0 w-full h-full z-0">
        <BackgroundRippleEffect
          rows={8}
          cols={27}
          cellSize={56}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/profile" element={<SimpleProfilePage />} />
          <Route path="/profile/stats" element={<StatsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
        </Routes>
        {isHomePage && <MobileScrollNav />}
      </div>

      <ProgressiveBlur
        position="bottom"
        height="10vh"
        className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
      />
      
      {/* Dock - show on home page, stats page, and roadmap page */}
      {(isHomePage || isStatsPage || isRoadmapPage) && <DockDemo />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
          <Analytics />
          <SpeedInsights />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
