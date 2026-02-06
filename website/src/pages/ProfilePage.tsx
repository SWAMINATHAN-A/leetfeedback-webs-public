import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextEffect } from "../components/ui/text-effect";
import { ChromaText } from "../components/ui/textRenderAppear";
import Footer from "../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  User,
  Mail,
  Calendar,
  LogOut,
  Flame,
  Zap,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Shield,
  Loader2,
  Key,
  Trash2,
  AlertTriangle,
  Star,
  Sparkles,
  Edit3,
  Save,
  X,
  Globe,
  Eye,
  EyeOff,
} from "lucide-react";
import { fetchUserStats, UserStats, fetchSubscriptionStatus, createSubscription, changePassword, deleteAccount } from "../utils/backendAuth";
import reelCircle from "../assets/reel-circle-deco.svg";
import radialMarquee from "../assets/radial-marquee-circle-deco.svg";

// ChromaText styles for profile page
const ProfileChromaStyles = () => (
  <style>{`
    .chroma-text {
      display: inline-flex;
      padding-bottom: 0.1rem;
      padding-right: 0.15em;
      background-size: 300% 100%;
      background-position: 100% 0;
      will-change: background-position;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }

    .chroma-text-animate {
      animation: chroma-sweep-profile 1.2s ease-in-out forwards;
      filter: blur(1px);
    }

    [data-chroma-id="profile-header"],
    [data-chroma-id="stats-section"],
    [data-chroma-id="subscription-status"] {
      background-image: linear-gradient(
        90deg,
        hsl(var(--foreground)) 0px,
        hsl(var(--foreground)) 33.33%,
        rgb(255, 182, 193) 40%,
        rgb(255, 218, 185) 45%,
        rgb(230, 230, 250) 50%,
        rgb(255, 240, 245) 55%,
        rgb(240, 248, 255) 60%,
        transparent 66.67%,
        transparent
      );
    }

    [data-chroma-id="stats-section"] {
      animation-delay: 0.1s;
    }

    [data-chroma-id="subscription-status"] {
      animation-delay: 0.2s;
    }

    @keyframes chroma-sweep-profile {
      0% {
        background-position: 100% 0;
        filter: blur(1px);
      }
      100% {
        background-position: 0 0;
        filter: blur(0px);
      }
    }
  `}</style>
);

// Visible wrapper that triggers animation only when scrolled into view
const VisibleChromaText: React.FC<{
  id: string;
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}> = ({ id, className, delay, duration, children }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationKey((prev) => prev + 1);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref}>
      {isVisible ? (
        <ChromaText key={animationKey} id={id} className={className} delay={delay} duration={duration}>
          {children}
        </ChromaText>
      ) : (
        <span className={className} style={{ opacity: 0 }}>
          {children}
        </span>
      )}
    </span>
  );
};

interface StatItemProps {
  title: string;
  description: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({
  title,
  description,
  value,
  icon: Icon,
  delay = 0,
}) => {
  return (
    <BlurFade delay={delay}>
      <motion.div
        className="group block py-8 border-b border-border/30 hover:border-foreground/20 transition-colors duration-500"
        whileHover={{ x: 8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-baseline justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <Icon className="w-6 h-6 text-muted-foreground" />
              <h3 className="text-2xl md:text-3xl font-light text-foreground group-hover:text-foreground/80 transition-colors">
                {title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg">
              {description}
            </p>
          </div>
          <div className="text-muted-foreground group-hover:text-foreground transition-colors">
            <span className="text-3xl md:text-4xl font-bold">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
          </div>
        </div>
      </motion.div>
    </BlurFade>
  );
};

const ProfilePage: React.FC = () => {
  // Force refresh - new profile page design
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{ isSubscriptionActive: boolean } | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Settings modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [deletePassword, setDeletePassword] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Fetch user stats and subscription status
  useEffect(() => {
    const loadData = async () => {
      if (user) {
        setIsLoadingStats(true);
        setIsLoadingSubscription(true);
        
        const [userStats, subStatus] = await Promise.all([
          fetchUserStats(),
          fetchSubscriptionStatus()
        ]);
        
        setStats(userStats);
        setSubscriptionStatus(subStatus);
        setIsLoadingStats(false);
        setIsLoadingSubscription(false);
      }
    };
    loadData();
  }, [user]);

  const handleSignOut = React.useCallback(async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }, [signOut, navigate]);

  const handleSubscribe = async () => {
    if (subscriptionStatus?.isSubscriptionActive) {
      alert("You're already a premium member! Thank you for your support. 🎉");
      return;
    }

    try {
      const result = await createSubscription();
      if (result.success && result.shortUrl) {
        window.open(result.shortUrl, '_blank');
      } else {
        if (result.message === 'Already subscribed') {
          alert("You're already a premium member! Thank you for your support. 🎉");
        } else {
          alert(result.message || 'Failed to create subscription');
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to create subscription. Please try again.');
    }
  };

  const handleChangePassword = async () => {
    setModalMessage(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setModalMessage({ type: "error", text: "New passwords don't match" });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setModalMessage({ type: "error", text: "New password must be at least 8 characters" });
      return;
    }

    setModalLoading(true);
    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    setModalLoading(false);

    if (result.success) {
      setModalMessage({ type: "success", text: result.message });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => {
        setShowPasswordModal(false);
        setModalMessage(null);
      }, 2000);
    } else {
      setModalMessage({ type: "error", text: result.message });
    }
  };

  const handleDeleteAccount = async () => {
    setModalMessage(null);

    if (!deletePassword) {
      setModalMessage({ type: "error", text: "Please enter your password to confirm" });
      return;
    }

    setModalLoading(true);
    const result = await deleteAccount(deletePassword);
    setModalLoading(false);

    if (result.success) {
      setModalMessage({ type: "success", text: result.message });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setModalMessage({ type: "error", text: result.message });
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const memberSince = React.useMemo(() => {
    if (user.createdAt) {
      return new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    }
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  }, [user.createdAt]);

  // Calculate level based on XP
  const level = Math.floor((stats?.totalXp || user.totalXp || 0) / 100) + 1;

  const statItems: StatItemProps[] = [
    {
      title: "Current Streak",
      description: "Days of consecutive coding practice",
      value: (stats?.currentStreak ?? user.currentStreak ?? 0),
      icon: Flame,
    },
    {
      title: "Total Experience",
      description: "XP earned from solving problems",
      value: `${(stats?.totalXp ?? user.totalXp ?? 0).toLocaleString()} XP`,
      icon: Zap,
    },
    {
      title: "Problems Solved",
      description: "Total coding challenges completed",
      value: (stats?.totalSolves ?? 0),
      icon: Trophy,
    },
    {
      title: "Total Submissions",
      description: "All attempts across platforms",
      value: (stats?.totalSubmissions ?? 0),
      icon: Target,
    },
    {
      title: "Streak Days Total",
      description: "Cumulative days of practice",
      value: (stats?.totalStreakDays ?? 0),
      icon: TrendingUp,
    },
  ];

  return (
    <>
      <main className="min-h-screen relative overflow-hidden">
        <ProfileChromaStyles />

        {/* Large watermark typography - left */}
        <div
          className="fixed left-0 top-1/2 -translate-y-1/2 -translate-x-[20%] pointer-events-none select-none z-0"
          aria-hidden
        >
          <span className="text-[18vw] md:text-[20vw] font-extralight tracking-tighter text-foreground/[0.03] whitespace-nowrap">
            Your
          </span>
        </div>

        {/* Large watermark typography - right */}
        <div
          className="fixed right-0 top-1/2 -translate-y-1/2 translate-x-[20%] pointer-events-none select-none z-0"
          aria-hidden
        >
          <span className="text-[18vw] md:text-[20vw] font-extralight tracking-tighter text-foreground/[0.03] whitespace-nowrap">
            Profile
          </span>
        </div>

        {/* Reel circle decoration */}
        <div
          className="absolute -top-[300px] -right-[300px] pointer-events-none opacity-30 z-0"
          aria-hidden
        >
          <img src={reelCircle} alt="" className="w-[800px] h-[800px]" />
        </div>

        {/* Radial marquee circle */}
        <div
          className="absolute -bottom-[400px] -left-[400px] pointer-events-none opacity-20 z-0"
          aria-hidden
        >
          <img src={radialMarquee} alt="" className="w-[1000px] h-auto" />
        </div>

        {/* Decorative lines */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
          <div className="absolute left-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
          <div className="absolute right-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <div className="container max-w-4xl mx-auto px-6 pt-32 pb-24">
            {/* Back button */}
            <BlurFade delay={0.1}>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
              >
                <ArrowBackIcon className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                <span>Home</span>
              </button>
            </BlurFade>

            {/* User info header */}
            <div className="mb-20">
              <div className="flex items-center gap-6 mb-8">
                {/* Avatar */}
                <BlurFade delay={0.15}>
                  <div className="relative">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-border"
                      />
                    ) : (
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-2 border-border flex items-center justify-center">
                        <span className="text-2xl md:text-3xl font-bold text-white">
                          {(user.displayName || user.username || "U").charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </BlurFade>

                <div className="flex-1">
                  <h1 className="text-4xl md:text-6xl font-extralight tracking-tight mb-4">
                    <VisibleChromaText id="profile-header" delay={0.2} duration={1.2}>
                      {user.displayName || user.username || "User"}
                    </VisibleChromaText>
                  </h1>
                  <BlurFade delay={0.3}>
                    <div className="flex flex-col gap-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>@{user.username || "user"}</span>
                      </div>
                      {user.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Member since {memberSince}</span>
                      </div>
                    </div>
                  </BlurFade>
                </div>
              </div>

              <BlurFade delay={0.4}>
                <div className="mb-8 relative">
                  {/* Small reel circle decoration around premium area */}
                  {subscriptionStatus?.isSubscriptionActive && (
                    <div
                      className="absolute top-0 right-0 pointer-events-none opacity-30 z-0"
                      aria-hidden
                    >
                      <img src={reelCircle} alt="" className="w-24 h-24" />
                    </div>
                  )}
                  
                  {isLoadingSubscription ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Loading subscription status...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium relative z-10 ${
                          subscriptionStatus?.isSubscriptionActive 
                            ? 'bg-black dark:bg-white text-white dark:text-black border border-gray-800 dark:border-gray-200 shadow-sm'
                            : 'bg-muted text-muted-foreground border border-border'
                        }`}>
                          {subscriptionStatus?.isSubscriptionActive ? (
                            <>
                              <Sparkles className="w-4 h-4" />
                              <span className="text-white dark:text-black">Premium Member</span>
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4" />
                              <span>Free Member</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {!subscriptionStatus?.isSubscriptionActive && (
                        <button
                          onClick={handleSubscribe}
                          className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                        >
                          Upgrade to Premium
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </BlurFade>
            </div>

            {/* Stats section */}
            <div className="mb-16">
              <BlurFade delay={0.5}>
                <h2 className="text-2xl font-light mb-8">
                  <VisibleChromaText id="stats-section" delay={0.4} duration={1.2}>
                    Your Statistics
                  </VisibleChromaText>
                </h2>
              </BlurFade>
              
              <div className="border-t border-border/30">
                {isLoadingStats ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  statItems.map((stat, index) => (
                    <StatItem
                      key={stat.title}
                      {...stat}
                      delay={0.6 + index * 0.1}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-border/30 pt-8">
              <BlurFade delay={1.2}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                  
                  <button
                    onClick={() => setShowSettingsModal(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <Key className="w-5 h-5" />
                    Account Settings
                  </button>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Account Settings</h2>
                  <button
                    onClick={() => setShowSettingsModal(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-8">
                {/* Account Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Account Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">Username</p>
                        <p className="text-sm text-muted-foreground">@{user.username || "user"}</p>
                      </div>
                    </div>
                    
                    {user.email && (
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium">Email Address</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">Member Since</p>
                        <p className="text-sm text-muted-foreground">{memberSince}</p>
                      </div>
                    </div>
                    
                    {user.timezone && (
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium">Timezone</p>
                          <p className="text-sm text-muted-foreground">{user.timezone}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      {user.visibility === 'public' ? <Eye className="w-5 h-5 text-muted-foreground" /> : <EyeOff className="w-5 h-5 text-muted-foreground" />}
                      <div className="flex-1">
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">
                          {user.visibility === 'public' ? "Public profile" : "Private profile"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Security & Privacy</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setShowPasswordModal(true);
                        setModalMessage(null);
                        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      }}
                      className="w-full flex items-center gap-3 p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-left"
                    >
                      <Key className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">Change Password</p>
                        <p className="text-sm text-muted-foreground">Update your account password</p>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-muted-foreground"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                    
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Shield className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">Account Type</p>
                        <p className="text-sm text-muted-foreground">Username & Password authentication</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-500">Danger Zone</h3>
                  <div className="space-y-3">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 p-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-left border border-red-500/20"
                    >
                      <LogOut className="w-5 h-5 text-red-500" />
                      <div className="flex-1">
                        <p className="font-medium text-red-500">Sign Out</p>
                        <p className="text-sm text-red-400">Sign out of your account on this device</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setModalMessage(null);
                        setDeletePassword("");
                      }}
                      className="w-full flex items-center gap-3 p-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-left border border-red-500/20"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                      <div className="flex-1">
                        <p className="font-medium text-red-500">Delete Account</p>
                        <p className="text-sm text-red-400">Permanently delete your account (7-day recovery)</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-transparent flex items-center justify-center">
                  <Key className="w-5 h-5 text-foreground" />
                </div>
                <h2 className="text-xl font-bold">Change Password</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Confirm new password"
                  />
                </div>

                {modalMessage && (
                  <p className={`text-sm ${modalMessage.type === "error" ? "text-red-500" : "text-green-500"}`}>
                    {modalMessage.text}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-4 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    disabled={modalLoading}
                    className="flex-1 px-4 py-3 bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {modalLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Change Password"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-red-500">Delete Account</h2>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
                <p className="text-sm text-red-400">
                  <strong>Warning:</strong> This will mark your account for deletion. You have 7 days to recover your account by logging in again. After 7 days, your account and all data will be permanently deleted.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter your password to confirm</label>
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Your password"
                  />
                </div>

                {modalMessage && (
                  <p className={`text-sm ${modalMessage.type === "error" ? "text-red-500" : "text-green-500"}`}>
                    {modalMessage.text}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={modalLoading}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {modalLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Delete Account"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default ProfilePage;