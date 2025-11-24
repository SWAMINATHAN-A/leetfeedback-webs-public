import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
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
import { ProgressiveBlur } from "./components/magicui/progressive-blur";
import { ScrollbarNav } from "./components/ScrollbarNav";
import { BackgroundRippleEffect } from "./components/ui/background-ripple-effect";
import { DockDemo } from "./components/DockDemo";
import { DynamicIslandDemo } from "./components/DynamicIslandDemo";
import { SignInDynamicIsland } from "./components/SignInDynamicIsland";
import { NavigationIsland } from "./components/NavigationIsland";
import { ThemeSwitchIsland } from "./components/ThemeSwitchIsland";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import { smoothScrollTo } from "./utils/smoothScroll";
import "./App.css";

// Lazy load non-critical pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));
const SimpleProfilePage = lazy(() => import("./pages/SimpleProfilePage"));
const StatsPage = lazy(() => import("./pages/StatsPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicyPage"));

const COOKIE_CONSENT_KEY = "leetfeedback_cookie_consent";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isNavigating,
    navigationTarget,
    completeNavigation,
    isSignInIslandOpen,
    closeSignInIsland,
  } = useNavigation();
  const { isThemeSwitching, completeThemeSwitch, isDark, targetTheme } =
    useTheme();

  const isHomePage = location.pathname === "/";
  const isStatsPage = location.pathname === "/profile/stats";
  const isRoadmapPage = location.pathname === "/roadmap";
  const isPolicyPage =
    location.pathname === "/privacy" ||
    location.pathname === "/terms" ||
    location.pathname === "/cookies";

  const [showDynamicIsland, setShowDynamicIsland] = useState(false);
  const [showDock, setShowDock] = useState(false);
  const [showProgressiveBlur, setShowProgressiveBlur] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Show loading animation on initial load, then show appropriate UI
  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const shouldShowPages =
      isHomePage || isStatsPage || isRoadmapPage || isPolicyPage;

    if (shouldShowPages && isInitialLoad) {
      // Always show loading animation on first load
      setShowDynamicIsland(true);
      setShowDock(false);

      // After 0.7 seconds, check what to show next
      const timer = setTimeout(() => {
        setIsInitialLoad(false);

        if (!consent) {
          // No consent, keep showing dynamic island for cookie prompt
          // Island will handle its own completion
        } else {
          // Has consent, transition to dock
          setShowDynamicIsland(false);
          setTimeout(() => {
            setShowDock(true);
            setShowProgressiveBlur(true);
          }, 300);
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isHomePage, isStatsPage, isRoadmapPage, isPolicyPage, isInitialLoad]);

  const handleDynamicIslandComplete = useCallback(() => {
    setShowDynamicIsland(false);
    // Wait before showing dock and progressive blur for smooth transition
    setTimeout(() => {
      setShowDock(true);
      setShowProgressiveBlur(true);
    }, 300);
  }, []);

  const handleSignInComplete = useCallback(() => {
    closeSignInIsland();
  }, [closeSignInIsland]);

  const handleNavigationComplete = useCallback(() => {
    if (navigationTarget) {
      navigate(navigationTarget);
      completeNavigation();
      // Scroll to top of page with anime.js
      smoothScrollTo(0, 600, "easeInOutCubic");
    }
  }, [navigationTarget, navigate, completeNavigation]);

  return (
    <div className="App min-h-screen relative">
      {/* Background Ripple Effect */}
      <div className="fixed inset-0 w-full h-full z-0">
        <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <Header />
        <Suspense fallback={<div className="min-h-screen" />}>
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
        </Suspense>
        {isHomePage && <ScrollbarNav />}
      </div>

      {/* Progressive Blur - shows after dynamic island completes */}
      <AnimatePresence>
        {showProgressiveBlur &&
          !isNavigating &&
          !isThemeSwitching &&
          (isHomePage || isStatsPage || isRoadmapPage || isPolicyPage) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProgressiveBlur
                position="bottom"
                className="fixed bottom-0 left-0 right-0 pointer-events-none"
              />
            </motion.div>
          )}
      </AnimatePresence>

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
              isTogglingToDark={targetTheme}
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

      {/* Sign In Dynamic Island */}
      <AnimatePresence>
        {isSignInIslandOpen && !isNavigating && !isThemeSwitching && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-8 left-0 right-0 z-50 flex justify-center"
          >
            <SignInDynamicIsland onComplete={handleSignInComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock - shows after dynamic island completes */}
      {!isNavigating &&
        !isThemeSwitching &&
        !isSignInIslandOpen &&
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
