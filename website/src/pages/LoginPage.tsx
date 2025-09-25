import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Alert, AlertDescription } from "../components/ui/alert";

interface LoginFormData {
  username: string;
  email: string;
  password: string;
}

interface RegisterFormData extends LoginFormData {
  github_username: string;
  github_repo: string;
  github_branch: string;
}

const LoginPage: React.FC = () => {
  const { signInWithGoogle, signInWithCredentials, registerWithCredentials, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [loginData, setLoginData] = useState<LoginFormData>({
    username: "",
    email: "",
    password: "",
  });
  
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    github_username: "",
    github_repo: "",
    github_branch: "main",
  });

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      await signInWithGoogle();
      navigate("/profile");
    } catch (error: any) {
      setError(error.message || "Google sign-in failed");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await signInWithCredentials({
        username: loginData.username,
        email: loginData.email,
        password: loginData.password,
      });

      if (response.success) {
        navigate("/profile");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await registerWithCredentials({
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        github_username: registerData.github_username,
        github_repo: registerData.github_repo,
        github_branch: registerData.github_branch,
      });

      if (response.success) {
        navigate("/profile");
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (error: any) {
      setError(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isRegisterMode ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription>
              {isRegisterMode 
                ? "Sign up to get started with LeetFeedback" 
                : "Sign in to your account"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full"
              disabled={isLoading || isSubmitting}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Continue with Google
            </Button>

            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Login/Register Form */}
            {isRegisterMode ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={registerData.username}
                      onChange={handleRegisterInputChange}
                      placeholder="johndoe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={registerData.email}
                      onChange={handleRegisterInputChange}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={registerData.password}
                      onChange={handleRegisterInputChange}
                      placeholder="Enter your password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github_username">GitHub Username</Label>
                  <Input
                    id="github_username"
                    name="github_username"
                    type="text"
                    required
                    value={registerData.github_username}
                    onChange={handleRegisterInputChange}
                    placeholder="your-github-username"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github_repo">GitHub Repository</Label>
                    <Input
                      id="github_repo"
                      name="github_repo"
                      type="text"
                      required
                      value={registerData.github_repo}
                      onChange={handleRegisterInputChange}
                      placeholder="repository-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github_branch">Branch</Label>
                    <Input
                      id="github_branch"
                      name="github_branch"
                      type="text"
                      required
                      value={registerData.github_branch}
                      onChange={handleRegisterInputChange}
                      placeholder="main"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={loginData.username}
                    onChange={handleLoginInputChange}
                    placeholder="Enter your username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={handleLoginInputChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                      placeholder="Enter your password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            )}

            {/* Toggle between login and register */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                {isRegisterMode ? "Already have an account? " : "Don't have an account? "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setError("");
                }}
                className="text-primary hover:underline font-medium"
              >
                {isRegisterMode ? "Sign In" : "Sign Up"}
              </button>
            </div>

            {/* Back to home */}
            <div className="text-center text-sm">
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
