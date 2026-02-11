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
import { DockDemo } from "./components/DockDemo";
import { SignInDynamicIsland } from "./components/SignInDynamicIsland";
import { NavigationIsland } from "./components/NavigationIsland";
import { ThemeSwitchIsland } from "./components/ThemeSwitchIsland";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import { smoothScrollTo } from "./utils/smoothScroll";
import "./App.css";

// Lazy load non-critical pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicyPage"));
const DownloadsPage = lazy(() => import("./pages/DownloadsPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const GuidePage = lazy(() => import("./pages/GuidePage"));
const ProblemsPage = lazy(() => import("./pages/ProblemsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));


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

  const isProfilePage = location.pathname === "/profile";
  const isHomePage = location.pathname === "/";
  const isRoadmapPage = location.pathname === "/roadmap";
  const isDownloadsPage = location.pathname === "/downloads";
  const isCareersPage = location.pathname === "/careers";
  const isGuidePage = location.pathname === "/guide";
  const isProblemsPage = location.pathname === "/problems";
  const isBlogPage = location.pathname === "/blog" || location.pathname.startsWith("/blog/");
  const isPolicyPage =
    location.pathname === "/privacy" ||
    location.pathname === "/terms" ||
    location.pathname === "/cookies";

  const [showDynamicIsland, setShowDynamicIsland] = useState(false);
  const [showDock, setShowDock] = useState(false);
  const [showProgressiveBlur, setShowProgressiveBlur] = useState(false);

  // Show dock and progressive blur immediately on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDock(true);
      setShowProgressiveBlur(true);
    }, 300);
    return () => clearTimeout(timer);
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

  // Hide dock when scrolling near footer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      const threshold = 200; // Hide dock when within 200px of bottom

      if (scrollPosition >= documentHeight - threshold) {
        setShowDock(false);
      } else if (
        showDock === false &&
        scrollPosition < documentHeight - threshold - 100 &&
        !showDynamicIsland
      ) {
        // Show dock again when scrolling up, with some hysteresis
        // Only if dynamic island is not shown
        setShowDock(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showDock, showDynamicIsland]);

  return (
    <div className="App min-h-screen relative">
      <ScrollToTop />

      {/* Content overlay */}
      <div className="relative z-10">
        {location.pathname !== "/login" && <Header />}
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/infrastructure-migration" element={<BlogPostPage />} />
          </Routes>
        </Suspense>
        {isHomePage && <ScrollbarNav />}
      </div>

      {/* Progressive Blur - shows after dynamic island completes */}
      <AnimatePresence>
        {showProgressiveBlur &&
          !isNavigating &&
          !isThemeSwitching &&
          (isHomePage || isRoadmapPage || isBlogPage || isPolicyPage || isProfilePage) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-0 left-0 right-0 pointer-events-none z-20"
              style={{
                willChange: "auto",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <ProgressiveBlur position="bottom" className="" />
            </motion.div>
          )}
      </AnimatePresence>

      {/* Navigation Island - shows during page navigation */}
      <AnimatePresence>
        {isNavigating && navigationTarget && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-8 left-0 right-0 z-50 flex justify-center"
            style={{ willChange: "opacity, transform" }}
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-8 left-0 right-0 flex justify-center"
            style={{ zIndex: 10000, willChange: "opacity, transform" }}
          >
            <ThemeSwitchIsland
              isTogglingToDark={targetTheme}
              onComplete={completeThemeSwitch}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign In Dynamic Island */}
      <AnimatePresence>
        {isSignInIslandOpen && !isNavigating && !isThemeSwitching && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-8 left-0 right-0 z-50 flex justify-center"
            style={{ willChange: "opacity, transform" }}
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
        (isHomePage || isRoadmapPage || isDownloadsPage || isCareersPage || isGuidePage || isProblemsPage || isBlogPage || isPolicyPage || isProfilePage) && (
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
