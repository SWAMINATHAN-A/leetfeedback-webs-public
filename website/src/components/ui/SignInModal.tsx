import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { X, LogIn, Lock, RefreshCw, Code2 } from 'lucide-react';
import { MagicCard } from '../magicui/magic-card';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

    const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
      onClose();
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const handleTermsClick = () => {
    onClose();
    navigate('/terms');
  };

  const handlePrivacyClick = () => {
    onClose();
    navigate('/privacy');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <MagicCard className="relative w-full max-w-md mx-4 overflow-hidden">
        <div className="relative bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl">
          {/* Gradient Header */}
          <div className="relative bg-gradient-to-br from-background via-muted/50 to-background border-b border-border/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="relative p-8 text-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors group"
              >
                <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
              </button>
              
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-border/50 flex items-center justify-center">
                <Code2 className="h-8 w-8 text-foreground" />
              </div>
              
              <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text">
                Welcome to LeetFeedback
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Sign in to unlock your coding journey and sync progress across all your devices
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm mb-6 dark:bg-red-950/20 dark:border-red-800 dark:text-red-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  {error}
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full group relative overflow-hidden bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-xl px-6 py-4 font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                <div className="flex items-center justify-center gap-3">
                  <LogIn className="h-5 w-5 text-blue-500" />
                  <span>Continue with Google</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>

            {/* Benefits */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Lock className="h-4 w-4 text-blue-500" />
                  </div>
                  <span>Secure authentication & privacy protection</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <RefreshCw className="h-4 w-4 text-purple-500" />
                  </div>
                  <span>Sync progress across all devices instantly</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                By signing in, you agree to our{' '}
                <button 
                  onClick={handleTermsClick}
                  className="text-foreground hover:underline focus:outline-none focus:underline transition-all"
                >
                  Terms of Service
                </button>
                {' '}and{' '}
                <button 
                  onClick={handlePrivacyClick}
                  className="text-foreground hover:underline focus:outline-none focus:underline transition-all"
                >
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </MagicCard>
    </div>
  );
};

export default SignInModal;