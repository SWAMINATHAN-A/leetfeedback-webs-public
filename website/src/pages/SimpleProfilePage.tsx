import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "../contexts/NavigationContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { User, LogOut, Mail } from "lucide-react";
import ProfileImage from "../components/ui/ProfileImage";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { DockDemo } from "../components/DockDemo";
import { cn } from "../lib/utils";
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
      <main className="container-medium py-12">
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
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <CardTitle className="text-2xl sm:text-3xl mb-2 break-words">
                    {user.displayName || user.username || "User"}
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 mx-auto sm:mx-0" />
                    <span className="break-all">{user.email}</span>
                  </div>
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
                    Username
                  </label>
                  <p className="text-muted-foreground bg-muted/50 rounded-2xl p-2 break-all">
                    {user.username}
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
                    Provider
                  </label>
                  <p className="text-muted-foreground bg-muted/50 rounded-2xl p-2 break-all">
                    {user.provider}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>



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
                  className="flex items-center gap-2 rounded-3xl"
                >
                  <User className="w-4 h-4" />
                  Back to Home
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded-3xl"
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
