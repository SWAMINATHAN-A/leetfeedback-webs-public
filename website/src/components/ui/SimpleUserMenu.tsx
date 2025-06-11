import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, UserCircle, ChevronDown } from 'lucide-react';
import ProfileImage from './ProfileImage';
import { motion, AnimatePresence } from 'framer-motion';

const SimpleUserMenu: React.FC = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const updateDropdownPosition = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const dropdownHeight = 200; // Approximate height of dropdown
        const spaceBelow = window.innerHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;

        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
          setDropdownPosition('top');
        } else {
          setDropdownPosition('bottom');
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      updateDropdownPosition();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      setIsOpen(false);
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
      >
        <ProfileImage
          src={user.photoURL}
          alt="User"
          size="sm"
        />
        <span className="text-sm font-medium hidden sm:block">
          {user.displayName || user.email}
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ 
              opacity: 0,
              scale: 0.95,
              y: dropdownPosition === 'top' ? 10 : -10
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{ 
              opacity: 0,
              scale: 0.95,
              y: dropdownPosition === 'top' ? 10 : -10
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.2
            }}
            className={`absolute right-0 w-48 bg-background border border-border rounded-md shadow-lg z-50 ${
              dropdownPosition === 'top' 
                ? 'bottom-full mb-2' 
                : 'top-full mt-2'
            }`}
          >
            <div className="p-2">
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={handleProfileClick}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <UserCircle className="h-4 w-4" />
                Profile
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SimpleUserMenu;