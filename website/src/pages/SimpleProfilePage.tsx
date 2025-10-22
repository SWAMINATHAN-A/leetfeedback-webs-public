import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "../contexts/NavigationContext";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { User, LogOut, Github, Mail, Calendar, Code } from "lucide-react";
import ProfileImage from "../components/ui/ProfileImage";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { DockDemo } from "../components/DockDemo";
import { cn } from "../lib/utils";
import ShinyText from "../components/ShinyText";
import { motion, AnimatePresence } from "motion/react";

const SimpleProfilePage: React.FC = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const { isNavigating } = useNavigation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const isBackendUser = user.authType === "backend";
  const isFirebaseUser = user.authType === "firebase";

  // Debug: log user data to see what's being received
  React.useEffect(() => {
    if (user) {
      console.log("User data:", user);
      console.log("GitHub data:", user.github);
      console.log("GitHub linked:", user.github?.linked);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {!isNavigating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <DockDemo />
          </motion.div>
        )}
      </AnimatePresence>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid gap-6">
          {/* Profile Header */}
          <Card className="rounded-3xl">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <div className="relative flex-shrink-0">
                  <ProfileImage
                    src={user.photoURL}
                    alt={user.displayName || user.username || "User"}
                    size="lg"
                  />
                  <Badge
                    variant={isBackendUser ? "default" : "secondary"}
                    className="absolute -bottom-2 -right-2"
                  >
                    {isBackendUser ? "Backend" : "Google"}
                  </Badge>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <CardTitle className="text-2xl sm:text-3xl mb-2 break-words">
                    {user.displayName || user.username || "User"}
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground mb-4">
                    <Mail className="w-4 h-4 mx-auto sm:mx-0" />
                    <span className="break-all">{user.email}</span>
                  </div>
                  {isBackendUser && user.github?.username && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
                      <Github className="w-4 h-4 mx-auto sm:mx-0" />
                      <a
                        href={`https://github.com/${user.github.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors break-all"
                      >
                        @{user.github.username}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Account Information */}
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {isBackendUser ? "Username" : "Display Name"}
                  </label>
                  <p className="text-muted-foreground bg-muted/50 rounded-2xl p-2 break-all">
                    {isBackendUser
                      ? user.username
                      : user.displayName || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <p className="text-muted-foreground bg-muted/50 rounded-2xl p-2 break-all">
                    {user.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Authentication Type
                  </label>
                  <div className="flex items-center gap-2">
                    <Badge variant={isBackendUser ? "default" : "secondary"}>
                      {isBackendUser ? "Backend Account" : "Google Account"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Provider
                  </label>
                  <p className="text-muted-foreground bg-muted/50 rounded-2xl p-2 break-all">
                    {user.provider}
                  </p>
                </div>
                {isBackendUser && user.role && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Role
                    </label>
                    <p className="text-muted-foreground bg-muted/50 rounded-2xl p-2 break-all">
                      {user.role}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* GitHub Information (Backend users only) */}
          {isBackendUser && (
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  GitHub Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.github?.linked ? (
                  <>
                    <div className="mb-4">
                      <Badge
                        variant="default"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <ShinyText
                          text="✓ GitHub Linked"
                          speed={4}
                          className="text-white"
                        />
                      </Badge>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          GitHub Username
                        </label>
                        <p className="text-muted-foreground bg-muted/50 rounded-2xl p-2 break-all">
                          {user.github.username || "Not set"}
                        </p>
                        {user.github.username && (
                          <a
                            href={`https://github.com/${user.github.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline mt-1 inline-block"
                          >
                            View Profile →
                          </a>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Repository
                        </label>
                        <p className="text-muted-foreground bg-muted/50 rounded-2xl p-2 break-all">
                          {user.github.repo || "Not set"}
                        </p>
                        {user.github.username && user.github.repo && (
                          <a
                            href={`https://github.com/${user.github.username}/${user.github.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline mt-1 inline-block"
                          >
                            View Repository →
                          </a>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Branch
                        </label>
                        <p className="text-muted-foreground bg-muted/50 rounded-2xl p-2 break-all">
                          {user.github.branch || "main"}
                        </p>
                      </div>
                    </div>

                    {user.github.username && user.github.repo && (
                      <div className="mt-4 p-4 bg-muted/30 rounded-2xl overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm font-medium">
                            Repository URL
                          </span>
                        </div>
                        <code className="text-xs bg-muted p-2 rounded block break-all overflow-x-auto">
                          https://github.com/{user.github.username}/
                          {user.github.repo}/tree/{user.github.branch || "main"}
                        </code>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Github className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      GitHub Not Linked
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Connect your GitHub account to enable code feedback and
                      tracking.
                    </p>
                    <Badge variant="secondary">
                      GitHub Linking Coming Soon
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Back to Home
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SimpleProfilePage;
