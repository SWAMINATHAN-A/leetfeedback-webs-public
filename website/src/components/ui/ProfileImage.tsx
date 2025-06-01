import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface ProfileImageProps {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ 
  src, 
  alt = 'User', 
  size = 'md',
  className = '' 
}) => {
  const [imageSrc, setImageSrc] = useState<string>('/support-icons/default.jpg');
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12', 
    lg: 'h-24 w-24'
  };

  useEffect(() => {
    if (src && !hasError) {
      // Try to load the image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setImageSrc(src);
        setHasError(false);
      };
      img.onerror = () => {
        console.log('Profile image failed to load:', src);
        setImageSrc('/support-icons/default.jpg');
        setHasError(true);
      };
      img.src = src;
    } else {
      setImageSrc('/support-icons/default.jpg');
    }
  }, [src, hasError]);

  const handleImageError = () => {
    if (imageSrc !== '/support-icons/default.jpg') {
      console.log('Image error, falling back to default');
      setImageSrc('/support-icons/default.jpg');
      setHasError(true);
    }
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-muted border-2 border-border/20 flex items-center justify-center ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleImageError}
          referrerPolicy="no-referrer"
        />
      ) : (
        <User className={`${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : 'h-12 w-12'} text-muted-foreground`} />
      )}
    </div>
  );
};

export default ProfileImage;