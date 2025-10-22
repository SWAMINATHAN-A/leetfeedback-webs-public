import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import {
  NavigationProvider,
  useNavigation,
} from "./contexts/NavigationContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RoadmapPage from "./pages/RoadmapPage";
import SimpleProfilePage from "./pages/SimpleProfilePage";
import StatsPage from "./pages/StatsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import { ProgressiveBlur } from "./components/magicui/progressive-blur";
import { MobileScrollNav } from "./components/MobileScrollNav";
import { BackgroundRippleEffect } from "./components/ui/background-ripple-effect";
import { DockDemo } from "./components/DockDemo";
import { DynamicIslandDemo } from "./components/DynamicIslandDemo";
import { NavigationIsland } from "./components/NavigationIsland";
import { ThemeSwitchIsland } from "./components/ThemeSwitchIsland";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import "./App.css";

const COOKIE_CONSENT_KEY = "leetfeedback_cookie_consent";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isNavigating, navigationTarget, completeNavigation } =
    useNavigation();
  const { isThemeSwitching, completeThemeSwitch, isDark } = useTheme();

  const isHomePage = location.pathname === "/";
  const isStatsPage = location.pathname === "/profile/stats";
  const isRoadmapPage = location.pathname === "/roadmap";
  const isPolicyPage =
    location.pathname === "/privacy" ||
    location.pathname === "/terms" ||
    location.pathname === "/cookies";

  const [showDynamicIsland, setShowDynamicIsland] = useState(false);
  const [showDock, setShowDock] = useState(false);

  // Check if we should show the dynamic island on mount
  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const shouldShowPages =
      isHomePage || isStatsPage || isRoadmapPage || isPolicyPage;

    if (!consent && shouldShowPages) {
      // No consent stored, show dynamic island
      setShowDynamicIsland(true);
      setShowDock(false);
    } else if (shouldShowPages) {
      // Already has consent, show dock directly
      setShowDynamicIsland(false);
      setShowDock(true);
    }
  }, [isHomePage, isStatsPage, isRoadmapPage, isPolicyPage]);

  const handleDynamicIslandComplete = () => {
    setShowDynamicIsland(false);
    // Wait before showing dock for smooth transition
    setTimeout(() => {
      setShowDock(true);
    }, 300);
  };

  const handleNavigationComplete = () => {
    if (navigationTarget) {
      navigate(navigationTarget);
      completeNavigation();
    }
  };

  return (
    <div className="App min-h-screen relative">
      {/* Background Ripple Effect */}
      <div className="fixed inset-0 w-full h-full z-0">
        <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/profile" element={<SimpleProfilePage />} />
          <Route path="/profile/stats" element={<StatsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
        </Routes>
        {isHomePage && <MobileScrollNav />}
      </div>

      <ProgressiveBlur
        position="bottom"
        className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
      />

      {/* Navigation Island - shows during page navigation */}
      <AnimatePresence>
        {isNavigating && navigationTarget && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-8 left-0 right-0 z-50 flex justify-center"
          >
            <NavigationIsland
              target={navigationTarget}
              onComplete={handleNavigationComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Switch Island - shows during theme switching */}
      <AnimatePresence>
        {isThemeSwitching && !isNavigating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-8 left-0 right-0 flex justify-center"
            style={{ zIndex: 10000 }}
          >
            <ThemeSwitchIsland
              isTogglingToDark={isDark}
              onComplete={completeThemeSwitch}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Island - shows on first load for cookie consent */}
      <AnimatePresence>
        {!isNavigating &&
          !isThemeSwitching &&
          showDynamicIsland &&
          (isHomePage || isStatsPage || isRoadmapPage || isPolicyPage) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed bottom-8 left-0 right-0 z-50 flex justify-center"
            >
              <DynamicIslandDemo onComplete={handleDynamicIslandComplete} />
            </motion.div>
          )}
      </AnimatePresence>

      {/* Dock - shows after dynamic island completes */}
      {!isNavigating &&
        !isThemeSwitching &&
        showDock &&
        (isHomePage || isStatsPage || isRoadmapPage || isPolicyPage) && (
          <DockDemo />
        )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationProvider>
          <Router>
            <AppContent />
            <Analytics />
            <SpeedInsights />
          </Router>
        </NavigationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
