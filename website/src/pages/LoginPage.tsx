import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Check,
  ChevronLeft,
} from "lucide-react";
import Footer from "../components/Footer";
import { LoginFeaturesDynamicIsland } from "../components/LoginFeaturesDynamicIsland";

// Utility function
const cn = (...classes: (string | undefined | null | boolean)[]): string =>
  classes.filter(Boolean).join(" ");

// Form steps for registration flow
type FormStep = "email" | "password" | "username" | "github" | "complete";

interface FormData {
  email: string;
  password: string;
  username: string;
  github_username: string;
  github_repo: string;
  github_branch: string;
}

const LoginPage: React.FC = () => {
  const {
    signInWithGoogle,
    signInWithCredentials,
    registerWithCredentials,
    isLoading,
  } = useAuth();
  const navigate = useNavigate();

  const [isGlowing, setIsGlowing] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>("email");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    github_username: "",
    github_repo: "",
    github_branch: "main",
  });

  // Focus input when step changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const triggerGlow = () => {
    setIsGlowing(true);
    setTimeout(() => setIsGlowing(false), 1500);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNext = async () => {
    triggerGlow();

    if (currentStep === "email") {
      if (!validateEmail(formData.email)) {
        setError("Please enter a valid email");
        return;
      }
      setCurrentStep("password");
    } else if (currentStep === "password") {
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      if (isSignUp) {
        setCurrentStep("username");
      } else {
        // Login flow - submit credentials
        await handleLogin();
      }
    } else if (currentStep === "username") {
      if (formData.username.length < 3) {
        setError("Username must be at least 3 characters");
        return;
      }
      setCurrentStep("github");
    } else if (currentStep === "github") {
      if (!formData.github_username || !formData.github_repo) {
        setError("Please fill in all GitHub details");
        return;
      }
      await handleRegister();
    }
  };

  const handleBack = () => {
    if (currentStep === "password") {
      setCurrentStep("email");
    } else if (currentStep === "username") {
      setCurrentStep("password");
    } else if (currentStep === "github") {
      setCurrentStep("username");
    }
  };

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError("");
    triggerGlow();

    try {
      const response = await signInWithCredentials({
        username: formData.username || formData.email.split("@")[0],
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        setCurrentStep("complete");
        setTimeout(() => navigate("/profile"), 1000);
      } else {
        setError(response.message || "Login failed");
      }
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async () => {
    setIsSubmitting(true);
    setError("");
    triggerGlow();

    try {
      const response = await registerWithCredentials({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        github_username: formData.github_username,
        github_repo: formData.github_repo,
        github_branch: formData.github_branch,
      });

      if (response.success) {
        setCurrentStep("complete");
        setTimeout(() => navigate("/profile"), 1000);
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (error: any) {
      setError(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      triggerGlow();
      await signInWithGoogle();
      navigate("/profile");
    } catch (error: any) {
      setError(error.message || "Google sign-in failed");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isSubmitting) {
      handleNext();
    }
  };

  const getPlaceholder = () => {
    switch (currentStep) {
      case "email":
        return "yo@example.com";
      case "password":
        return "Enter your password";
      case "username":
        return "Choose a username";
      case "github":
        return "GitHub username";
      default:
        return "";
    }
  };

  const getCurrentValue = () => {
    switch (currentStep) {
      case "email":
        return formData.email;
      case "password":
        return formData.password;
      case "username":
        return formData.username;
      case "github":
        return formData.github_username;
      default:
        return "";
    }
  };

  const getInputName = () => {
    switch (currentStep) {
      case "email":
        return "email";
      case "password":
        return "password";
      case "username":
        return "username";
      case "github":
        return "github_username";
      default:
        return "";
    }
  };

  const getInputType = () => {
    if (currentStep === "password") return "password";
    if (currentStep === "email") return "email";
    return "text";
  };

  const renderGitHubFields = () => (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name="github_username"
          value={formData.github_username}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="GitHub username"
          className="w-full bg-transparent text-foreground text-2xl md:text-4xl font-light tracking-tight border-b-2 border-muted-foreground/30 focus:border-foreground pb-3 outline-none transition-colors placeholder:text-muted-foreground/50"
        />
      </div>
      <div className="relative">
        <input
          type="text"
          name="github_repo"
          value={formData.github_repo}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Repository name"
          className="w-full bg-transparent text-foreground text-2xl md:text-4xl font-light tracking-tight border-b-2 border-muted-foreground/30 focus:border-foreground pb-3 outline-none transition-colors placeholder:text-muted-foreground/50"
        />
      </div>
      <div className="relative">
        <input
          type="text"
          name="github_branch"
          value={formData.github_branch}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Branch (default: main)"
          className="w-full bg-transparent text-foreground text-xl md:text-2xl font-light tracking-tight border-b-2 border-muted-foreground/30 focus:border-foreground pb-3 outline-none transition-colors placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Animated border glow effect */}
      <AnimatePresence>
        {isGlowing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 pointer-events-none z-50"
            style={{
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          >
            {/* Top edge glow */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute -top-4 left-0 right-0 h-12"
              style={{
                background:
                  "linear-gradient(90deg, #0894FF 0%, #C959DD 50%, #FF2E54 100%)",
                filter: "blur(24px)",
                transform: "translateZ(0)",
              }}
            />

            {/* Right edge glow */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="absolute top-0 -right-4 bottom-0 w-12"
              style={{
                background:
                  "linear-gradient(180deg, #FF9004 0%, #FF2E54 50%, #C959DD 100%)",
                filter: "blur(24px)",
                transform: "translateZ(0)",
              }}
            />

            {/* Bottom edge glow */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="absolute -bottom-4 left-0 right-0 h-12"
              style={{
                background:
                  "linear-gradient(270deg, #0894FF 0%, #C959DD 50%, #FF9004 100%)",
                filter: "blur(24px)",
                transform: "translateZ(0)",
              }}
            />

            {/* Left edge glow */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="absolute top-0 -left-4 bottom-0 w-12"
              style={{
                background:
                  "linear-gradient(0deg, #FF9004 0%, #C959DD 50%, #0894FF 100%)",
                filter: "blur(24px)",
                transform: "translateZ(0)",
              }}
            />

            {/* Corner accents for smoother blending */}
            {/* Top-left corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute -top-2 -left-2 w-16 h-16"
              style={{
                background:
                  "radial-gradient(circle, #0894FF 0%, transparent 70%)",
                filter: "blur(14px)",
                transform: "translateZ(0)",
              }}
            />
            {/* Top-right corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="absolute -top-2 -right-2 w-16 h-16"
              style={{
                background:
                  "radial-gradient(circle, #FF9004 0%, transparent 70%)",
                filter: "blur(14px)",
                transform: "translateZ(0)",
              }}
            />
            {/* Bottom-right corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="absolute -bottom-2 -right-2 w-16 h-16"
              style={{
                background:
                  "radial-gradient(circle, #FF9004 0%, transparent 70%)",
                filter: "blur(14px)",
                transform: "translateZ(0)",
              }}
            />
            {/* Bottom-left corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="absolute -bottom-2 -left-2 w-16 h-16"
              style={{
                background:
                  "radial-gradient(circle, #C959DD 0%, transparent 70%)",
                filter: "blur(14px)",
                transform: "translateZ(0)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Main content area */}
        <div className="w-full max-w-4xl flex flex-col items-center gap-8">
          {/* Dynamic Island Feature Showcase - Fixed height container */}
          <div className="w-full flex justify-center">
            <LoginFeaturesDynamicIsland />
          </div>

          {/* Sign-in form area */}
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {currentStep === "complete" ? (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <Check className="w-8 h-8 text-white" />
                  </motion.div>
                  <p className="text-xl text-foreground">Welcome aboard!</p>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  {/* Step indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    {currentStep !== "email" && (
                      <button
                        onClick={handleBack}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                      </button>
                    )}
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">
                      {currentStep === "email" &&
                        (isSignUp ? "Step 1 of 4" : "Step 1 of 2")}
                      {currentStep === "password" &&
                        (isSignUp ? "Step 2 of 4" : "Step 2 of 2")}
                      {currentStep === "username" && "Step 3 of 4"}
                      {currentStep === "github" && "Step 4 of 4"}
                    </span>
                  </div>

                  {/* Input field */}
                  {currentStep === "github" ? (
                    renderGitHubFields()
                  ) : (
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type={getInputType()}
                        name={getInputName()}
                        value={getCurrentValue()}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={getPlaceholder()}
                        disabled={isSubmitting}
                        className="w-full bg-transparent text-foreground text-3xl md:text-5xl font-light tracking-tight border-b-2 border-muted-foreground/30 focus:border-foreground pb-4 outline-none transition-colors placeholder:text-muted-foreground/50 disabled:opacity-50"
                        autoComplete={
                          currentStep === "email"
                            ? "email"
                            : currentStep === "password"
                            ? "current-password"
                            : "off"
                        }
                      />
                    </div>
                  )}

                  {/* Error message */}
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <div className="flex items-center justify-between gap-4">
                    <button
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors disabled:opacity-50"
                    >
                      <span className="text-lg font-medium">
                        {isSubmitting
                          ? "Processing..."
                          : currentStep === "github" ||
                            (!isSignUp && currentStep === "password")
                          ? "Submit"
                          : "Continue"}
                      </span>
                      {isSubmitting ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Alternative sign-in options */}
          {currentStep === "email" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-4 w-full max-w-md">
                <div className="flex-1 h-px bg-muted-foreground/30" />
                <span className="text-sm text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-muted-foreground/30" />
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="flex items-center gap-3 px-6 py-3 bg-muted hover:bg-muted/80 rounded-full transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                <span className="text-sm font-medium">
                  Continue with Google
                </span>
              </button>

              {/* Toggle sign up / sign in */}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "New here? Create an account"}
              </button>
            </motion.div>
          )}

          {/* Back to home */}
          <Link
            to="/"
            className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all duration-200 text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;
