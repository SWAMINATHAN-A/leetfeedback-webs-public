import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ChevronDown, UserCircle } from 'lucide-react';

interface UserProfileDropdownProps {
  className?: string;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ className = '' }) => {
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, handleClickOutside]);

  const handleSignOut = useCallback(async () => {
    try {
      setIsOpen(false);
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, [signOut, navigate]);

  const handleProfileClick = useCallback(() => {
    setIsOpen(false);
    navigate('/profile');
  }, [navigate]);
</edits>

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border/50"
      >
        <div className="relative">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              className="h-8 w-8 rounded-full object-cover border-2 border-border/20"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-muted to-muted/50 border-2 border-border/20 flex items-center justify-center">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full"></div>
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium leading-none">
            {user.displayName || user.email?.split('@')[0] || 'User'}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {user.email && user.email.length > 20 ? user.email.substring(0, 20) + '...' : user.email}
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-72 bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-5 border-b border-border/50 bg-gradient-to-r from-background to-muted/20">
            <div className="flex items-center gap-4">
              <div className="relative">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="h-14 w-14 rounded-full object-cover border-3 border-border/30"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-muted to-muted/50 border-3 border-border/30 flex items-center justify-center">
                    <User className="h-7 w-7 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold truncate">
                  {user.displayName || 'User'}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {user.email}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-xs text-muted-foreground">
                    via {user.provider === 'google.com' ? 'Google' : user.provider === 'apple.com' ? 'Apple' : user.provider}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-muted/50 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <UserCircle className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-left">
                <div className="font-medium">Profile</div>
                <div className="text-xs text-muted-foreground">Manage your account</div>
              </div>
            </button>
            
            <button
              onClick={() => {
                setIsOpen(false);
                // Add settings navigation here if needed
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-muted/50 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <Settings className="h-4 w-4 text-purple-500" />
              </div>
              <div className="text-left">
                <div className="font-medium">Settings</div>
                <div className="text-xs text-muted-foreground">Preferences & privacy</div>
              </div>
            </button>
            
            <div className="my-2 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-red-50/50 hover:text-red-600 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <LogOut className="h-4 w-4 text-red-500" />
              </div>
              <div className="text-left">
                <div className="font-medium">Sign Out</div>
                <div className="text-xs text-muted-foreground">End your session</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;