import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  User,
  Mail,
  Calendar,
  LogOut,
  Edit3,
  Save,
  X,
  Flame,
  Zap,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Settings,
  Shield,
  Loader2,
  Key,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { fetchUserStats, UserStats, changePassword, deleteAccount } from "../utils/backendAuth";

const ProfilePage: React.FC = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || "",
  });

  // Modal states
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

  // Fetch user stats
  useEffect(() => {
    const loadStats = async () => {
      setIsLoadingStats(true);
      const userStats = await fetchUserStats();
      setStats(userStats);
      setIsLoadingStats(false);
    };
    if (user) {
      loadStats();
    }
  }, [user]);

  const handleSignOut = React.useCallback(async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }, [signOut, navigate]);

  const handleSaveProfile = React.useCallback(() => {
    console.log("Saving profile:", profileData);
    setIsEditing(false);
  }, [profileData]);

  const handleCancelEdit = React.useCallback(() => {
    setProfileData({
      displayName: user?.displayName || "",
    });
    setIsEditing(false);
  }, [user?.displayName]);

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
  const xpForNextLevel = ((stats?.totalXp || user.totalXp || 0) % 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-medium py-12">
        {/* Profile Header with Gradient Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl mb-8"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-fuchsia-600/20" />
          <div className="absolute inset-0 bg-card/80 backdrop-blur-xl" />

          {/* Content */}
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar Section */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex flex-col items-center md:items-start"
              >
                <div className="relative group">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-border shadow-2xl"
                    />
                  ) : (
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-4 border-border flex items-center justify-center shadow-2xl">
                      <span className="text-4xl md:text-5xl font-bold text-white">
                        {(user.displayName || user.username || "U").charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-card" />
                </div>

                {/* Level Badge */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 px-4 py-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                >
                  <span className="text-sm font-bold text-white">Level {level}</span>
                </motion.div>
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.displayName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            displayName: e.target.value,
                          })
                        }
                        className="text-3xl font-bold bg-background/50 border border-border rounded-lg px-4 py-2"
                        placeholder="Display Name"
                      />
                    ) : (
                      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {profileData.displayName || user.displayName || user.username || "User"}
                      </h1>
                    )}
                    <div className="flex items-center gap-3 text-muted-foreground mt-2">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        <span>@{user.username || "user"}</span>
                      </div>
                      {user.email && (
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Calendar className="w-4 h-4" />
                      Member since {memberSince}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress to Level {level + 1}</span>
                    <span className="font-medium">{xpForNextLevel}/100 XP</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpForNextLevel}%` }}
                      transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Flame,
              label: "Current Streak",
              value: stats?.currentStreak ?? user.currentStreak ?? 0,
              suffix: "days",
              color: "from-orange-500 to-red-500",
              delay: 0.1,
            },
            {
              icon: Zap,
              label: "Total XP",
              value: stats?.totalXp ?? user.totalXp ?? 0,
              suffix: "XP",
              color: "from-yellow-500 to-orange-500",
              delay: 0.2,
            },
            {
              icon: Trophy,
              label: "Problems Solved",
              value: stats?.totalSolves ?? 0,
              suffix: "",
              color: "from-green-500 to-emerald-500",
              delay: 0.3,
            },
            {
              icon: Target,
              label: "Total Submissions",
              value: stats?.totalSubmissions ?? 0,
              suffix: "",
              color: "from-blue-500 to-cyan-500",
              delay: 0.4,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl"
                style={{ background: `linear-gradient(to bottom right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }}
              />
              <div className="relative bg-card border border-border rounded-2xl p-6 hover:border-muted-foreground/50 transition-colors">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">
                  {isLoadingStats ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      {stat.value.toLocaleString()}
                      {stat.suffix && <span className="text-lg text-muted-foreground ml-1">{stat.suffix}</span>}
                    </>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Problem Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              Problems by Difficulty
            </h2>

            {isLoadingStats ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { label: "Easy", value: stats?.problemsByDifficulty?.Easy ?? 0, color: "bg-green-500", maxWidth: 100 },
                  { label: "Medium", value: stats?.problemsByDifficulty?.Medium ?? 0, color: "bg-yellow-500", maxWidth: 80 },
                  { label: "Hard", value: stats?.problemsByDifficulty?.Hard ?? 0, color: "bg-red-500", maxWidth: 60 },
                ].map((item, index) => {
                  const total = (stats?.problemsByDifficulty?.Easy ?? 0) +
                    (stats?.problemsByDifficulty?.Medium ?? 0) +
                    (stats?.problemsByDifficulty?.Hard ?? 0);
                  const percentage = total > 0 ? (item.value / total) * 100 : 0;

                  return (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-muted-foreground">{item.value} solved</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Streak Days Total</span>
                </div>
                <span className="font-bold text-lg">
                  {isLoadingStats ? <Loader2 className="w-4 h-4 animate-spin" /> : stats?.totalStreakDays ?? 0}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-muted-foreground" />
              Account Settings
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Account Type</h3>
                    <p className="text-sm text-muted-foreground">
                      Username & Password
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="font-medium">User ID</h3>
                    <p className="text-sm text-muted-foreground font-mono truncate">
                      {user.uid}
                    </p>
                  </div>
                </div>
              </div>

              {user.timezone && (
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Timezone</h3>
                      <p className="text-sm text-muted-foreground">{user.timezone}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Change Password Button */}
              <button
                onClick={() => {
                  setShowPasswordModal(true);
                  setModalMessage(null);
                  setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-muted/50 hover:bg-muted rounded-xl transition-colors"
              >
                <Key className="w-5 h-5" />
                Change Password
              </button>

              <div className="pt-4 border-t border-border space-y-3">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>

                {/* Delete Account Button */}
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setModalMessage(null);
                    setDeletePassword("");
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Account
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
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
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
    </div>
  );
};

export default ProfilePage;
