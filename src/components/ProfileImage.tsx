import React, { useState } from 'react';
import { portfolioContent } from '../data/content';
import { Shield } from 'lucide-react';

interface ProfileImageProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  className = '',
  size = 'lg',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28 text-2xl',
    md: 'w-48 h-48 sm:w-56 sm:h-56 text-4xl',
    lg: 'w-64 h-64 sm:w-72 sm:h-72 lg:w-84 lg:h-84 text-5xl',
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Decorative subtle ambient ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6B4EAE]/20 via-[#C9B8EA]/20 to-[#FAF6F0] blur-xl opacity-70" />

      {/* Organic blob container */}
      <div
        className={`relative ${sizeClasses[size]} organic-blob animate-morph bg-[#EBE1D2] border-2 border-[#D8C9B3] overflow-hidden shadow-lg flex items-center justify-center transition-all`}
      >
        {!imageError ? (
          <img
            src={portfolioContent.personal.profilePhotoPath}
            alt={portfolioContent.personal.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EBE1D2] to-[#D8C9B3] text-[#2E2142] p-4 text-center select-none">
            <Shield className="w-8 h-8 text-[#6B4EAE] mb-1 opacity-80" />
            <span className="font-heading font-extrabold tracking-tight text-[#2E2142]">
              {portfolioContent.personal.initials}
            </span>
            <span className="text-[11px] font-medium text-[#5E5470] mt-1 tracking-wider uppercase">
              DevSecOps
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
