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
import ContactBar from "./components/ContactBar";
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
  const [contactBarVisible, setContactBarVisible] = useState(true);
  const [showProgressiveBlur, setShowProgressiveBlur] = useState(false);
  const [manualOverride, setManualOverride] = useState(false); // Track manual toggle

  // Show progressive blur after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgressiveBlur(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // When contact bar is manually toggled, manage dock visibility
  useEffect(() => {
    if (contactBarVisible) {
      setShowDock(false);
    } else {
      // Always show dock when contact bar is hidden (regardless of scroll position)
      setShowDock(true);
    }
  }, [contactBarVisible]);

  const handleSignInComplete = useCallback(() => {
    closeSignInIsland();
  }, [closeSignInIsland]);

  const handleManualToggle = useCallback(() => {
    setManualOverride(true);
    setContactBarVisible(!contactBarVisible);
    
    // Reset manual override after 5 seconds to re-enable scroll-based behavior
    setTimeout(() => {
      setManualOverride(false);
    }, 5000);
  }, [contactBarVisible]);

  const handleNavigationComplete = useCallback(() => {
    if (navigationTarget) {
      navigate(navigationTarget);
      completeNavigation();
      // Scroll to top of page with anime.js
      smoothScrollTo(0, 600, "easeInOutCubic");
    }
  }, [navigationTarget, navigate, completeNavigation]);

  // Handle scroll-based ContactBar to Dock transition
  useEffect(() => {
    const handleScroll = () => {
      // Skip scroll-based transitions if user manually toggled
      if (manualOverride) return;

      const scrollPosition = window.scrollY;
      const scrollThreshold = 300; // Scroll threshold to trigger transition
      const documentHeight = document.body.scrollHeight;
      const viewportBottom = scrollPosition + window.innerHeight;
      const footerThreshold = 200; // Hide dock when within 200px of bottom

      // Auto-hide ContactBar and show Dock after scrolling down
      if (scrollPosition > scrollThreshold) {
        if (contactBarVisible) {
          setContactBarVisible(false);
          setShowDock(true);
        }
      } else {
        // Show ContactBar and hide Dock when scrolling back to top
        if (!contactBarVisible) {
          setContactBarVisible(true);
          setShowDock(false);
        }
      }

      // Hide dock when scrolling near footer
      if (viewportBottom >= documentHeight - footerThreshold) {
        setShowDock(false);
      } else if (
        showDock === false &&
        scrollPosition > scrollThreshold &&
        viewportBottom < documentHeight - footerThreshold - 100 &&
        !showDynamicIsland
      ) {
        // Show dock again when scrolling up from footer, but only if past threshold
        setShowDock(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showDock, showDynamicIsland, contactBarVisible, manualOverride]);

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

      {/* ContactBar - Fixed to viewport, outside of relative containers */}
      {location.pathname !== "/login" && (
        <ContactBar
          visible={contactBarVisible}
          onToggle={handleManualToggle}
        />
      )}

      {/* Progressive Blur - shows after dynamic island completes */}
      <AnimatePresence>
        {showProgressiveBlur &&
          !isNavigating &&
          !isThemeSwitching &&
          !contactBarVisible &&
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
          <DockDemo onToggleContact={handleManualToggle} />
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
