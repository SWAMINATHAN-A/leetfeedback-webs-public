import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  Loader2,
  Check,
  ChevronLeft,
} from "lucide-react";
import Footer from "../components/Footer";
import { LoginFeaturesDynamicIsland } from "../components/LoginFeaturesDynamicIsland";

// Form steps for registration flow
type FormStep = "username" | "email" | "password" | "complete";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    signInWithCredentials,
    registerWithCredentials,
  } = useAuth();
  const navigate = useNavigate();

  const [isGlowing, setIsGlowing] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>("username");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
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

    if (currentStep === "username") {
      if (formData.username.length < 3 || formData.username.length > 20) {
        setError("Username must be 3-20 characters");
        return;
      }
      if (isSignUp) {
        setCurrentStep("email");
      } else {
        // Login flow - go to password
        setCurrentStep("password");
      }
    } else if (currentStep === "email") {
      // Email is optional for registration, but if provided must be valid
      if (formData.email && !validateEmail(formData.email)) {
        setError("Please enter a valid email");
        return;
      }
      setCurrentStep("password");
    } else if (currentStep === "password") {
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      if (isSignUp) {
        await handleRegister();
      } else {
        await handleLogin();
      }
    }
  };

  const handleBack = () => {
    if (currentStep === "password") {
      if (isSignUp) {
        setCurrentStep("email");
      } else {
        setCurrentStep("username");
      }
    } else if (currentStep === "email") {
      setCurrentStep("username");
    }
  };

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError("");
    triggerGlow();

    try {
      const response = await signInWithCredentials({
        username: formData.username,
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
        email: formData.email || undefined,
        password: formData.password,
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isSubmitting) {
      handleNext();
    }
  };

  const getPlaceholder = () => {
    switch (currentStep) {
      case "username":
        return "Enter your username";
      case "email":
        return "Email (optional)";
      case "password":
        return "Enter your password";
      default:
        return "";
    }
  };

  const getCurrentValue = () => {
    switch (currentStep) {
      case "username":
        return formData.username;
      case "email":
        return formData.email;
      case "password":
        return formData.password;
      default:
        return "";
    }
  };

  const getInputName = () => {
    switch (currentStep) {
      case "username":
        return "username";
      case "email":
        return "email";
      case "password":
        return "password";
      default:
        return "";
    }
  };

  const getInputType = () => {
    if (currentStep === "password") return "password";
    if (currentStep === "email") return "email";
    return "text";
  };

  const getStepIndicator = () => {
    if (!isSignUp) {
      // Login: username -> password
      if (currentStep === "username") return "Step 1 of 2";
      if (currentStep === "password") return "Step 2 of 2";
    } else {
      // Sign up: username -> email -> password
      if (currentStep === "username") return "Step 1 of 3";
      if (currentStep === "email") return "Step 2 of 3";
      if (currentStep === "password") return "Step 3 of 3";
    }
    return "";
  };

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
              className="absolute -top-2 md:-top-4 left-0 right-0 h-6 md:h-12"
              style={{
                background:
                  "linear-gradient(90deg, #0894FF 0%, #C959DD 50%, #FF2E54 100%)",
                filter: "blur(25px)",
                transform: "translateZ(0)",
              }}
            />

            {/* Right edge glow */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="absolute top-0 -right-2 md:-right-4 bottom-0 w-6 md:w-12"
              style={{
                background:
                  "linear-gradient(180deg, #FF9004 0%, #FF2E54 50%, #C959DD 100%)",
                filter: "blur(25px)",
                transform: "translateZ(0)",
              }}
            />

            {/* Bottom edge glow */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="absolute -bottom-2 md:-bottom-4 left-0 right-0 h-6 md:h-12"
              style={{
                background:
                  "linear-gradient(270deg, #0894FF 0%, #C959DD 50%, #FF9004 100%)",
                filter: "blur(25px)",
                transform: "translateZ(0)",
              }}
            />

            {/* Left edge glow */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="absolute top-0 -left-2 md:-left-4 bottom-0 w-6 md:w-12"
              style={{
                background:
                  "linear-gradient(0deg, #FF9004 0%, #C959DD 50%, #0894FF 100%)",
                filter: "blur(25px)",
                transform: "translateZ(0)",
              }}
            />

            {/* Corner accents for smoother blending */}
            {/* Top-left corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute -top-1 md:-top-2 -left-1 md:-left-2 w-12 h-12 md:w-16 md:h-16"
              style={{
                background:
                  "radial-gradient(circle, #0894FF 0%, transparent 70%)",
                filter: "blur(10px)",
                transform: "translateZ(0)",
              }}
            />
            {/* Top-right corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="absolute -top-1 md:-top-2 -right-1 md:-right-2 w-12 h-12 md:w-16 md:h-16"
              style={{
                background:
                  "radial-gradient(circle, #FF9004 0%, transparent 70%)",
                filter: "blur(10px)",
                transform: "translateZ(0)",
              }}
            />
            {/* Bottom-right corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="absolute -bottom-1 md:-bottom-2 -right-1 md:-right-2 w-12 h-12 md:w-16 md:h-16"
              style={{
                background:
                  "radial-gradient(circle, #FF9004 0%, transparent 70%)",
                filter: "blur(10px)",
                transform: "translateZ(0)",
              }}
            />
            {/* Bottom-left corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="absolute -bottom-1 md:-bottom-2 -left-1 md:-left-2 w-12 h-12 md:w-16 md:h-16"
              style={{
                background:
                  "radial-gradient(circle, #C959DD 0%, transparent 70%)",
                filter: "blur(10px)",
                transform: "translateZ(0)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Main content area */}
        <div className="w-full container-medium flex flex-col items-center gap-8">
          {/* Dynamic Island Feature Showcase - Fixed height container */}
          <div className="w-full flex justify-center">
            <LoginFeaturesDynamicIsland />
          </div>

          {/* Sign-in form area */}
          <div className="w-full container-small">
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
                    {currentStep !== "username" && (
                      <button
                        onClick={handleBack}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                      </button>
                    )}
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">
                      {getStepIndicator()}
                    </span>
                  </div>

                  {/* Input field */}
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
                            : currentStep === "username"
                              ? "username"
                              : "off"
                      }
                    />
                  </div>

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
                          : currentStep === "password"
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

          {/* Toggle sign up / sign in */}
          {currentStep === "username" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
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
