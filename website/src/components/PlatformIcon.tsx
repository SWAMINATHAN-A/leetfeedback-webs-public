import React from 'react';

interface PlatformIconProps {
  platform: 'leetcode' | 'geeksforgeeks' | 'hackerrank' | 'codechef' | 'tufplus';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const iconPath = {
    leetcode: '/support-icons/leetcode-svgrepo-com.svg',
    geeksforgeeks: '/support-icons/geeksforgeeks.svg',
    hackerrank: '/support-icons/hackerrank-svgrepo-com.svg',
    codechef: '/support-icons/codechef-svgrepo-com.svg',
    tufplus: '/support-icons/tuf.svg'
  };

  return (
    <img
      src={iconPath[platform]}
      alt={`${platform} icon`}
      className={`${sizeClasses[size]} ${className} dark:invert dark:brightness-200`}
    />
  );
};

export default PlatformIcon; 