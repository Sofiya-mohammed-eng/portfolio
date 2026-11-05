import React, { useState } from 'react';
import { portfolioContent } from '../data/content';
import { Shield } from 'lucide-react';

interface ProfileImageProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ProfileImage component for Sofiya Mohammed Hassen
 * 
 * NOTE FOR SOFIYA:
 * Use a square photo with the head and shoulders centered, with space above the head, for best results.
 * Place it at /public/profile.jpg (or .jpeg / .png).
 */
export const ProfileImage: React.FC<ProfileImageProps> = ({
  className = '',
  size = 'lg',
}) => {
  // Try /profile.jpg -> /profile.jpeg -> /profile.png before falling back to initials badge
  const sources = ['/profile.jpg', '/profile.jpeg', '/profile.png'];
  const [sourceIndex, setSourceIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  // Dimensions matching the target reference screenshot:
  // lg: ~440px on desktop (scaling smoothly down to 300px on mobile)
  // md: ~320px for the About page
  // sm: compact avatar
  const sizeClasses = {
    sm: 'w-24 h-24 text-2xl',
    md: 'w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 text-4xl',
    lg: 'w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] text-5xl',
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Soft ambient purple glow behind photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#6B4EAE]/25 dark:bg-[#A78BFA]/30 blur-2xl transform scale-105 pointer-events-none"
      />

      {/* Perfect circle frame (aspect-ratio: 1/1) with 6px border ring */}
      <div
        className={`relative ${sizeClasses[size]} aspect-square rounded-full border-[6px] border-white dark:border-[#3D2F57] shadow-[0_12px_40px_rgba(46,33,66,0.14)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.5)] overflow-hidden bg-[#EBE1D2] dark:bg-[#2A1F3D] transition-colors duration-300 z-10`}
      >
        {!hasError ? (
          <img
            src={sources[sourceIndex]}
            alt="Portrait of Sofiya Mohammed Hassen"
            onError={handleImageError}
            className="w-full h-full object-cover rounded-full select-none"
            style={{ objectPosition: 'center 25%' }}
            loading="eager"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EBE1D2] to-[#D8C9B3] dark:from-[#2A1F3D] dark:to-[#1B1326] text-[#2E2142] dark:text-[#EBE1D2] p-6 text-center select-none rounded-full">
            <Shield className="w-10 h-10 text-[#6B4EAE] dark:text-[#A78BFA] mb-2 opacity-90" />
            <span className="font-heading font-extrabold tracking-tight text-[#2E2142] dark:text-[#EBE1D2]">
              {portfolioContent.personal.initials}
            </span>
            <span className="text-xs font-semibold text-[#5E5470] dark:text-[#BDB0CC] mt-1 tracking-wider uppercase">
              DevSecOps
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
