import React from 'react';

export interface MotiveLogoProps {
  className?: string;
  variant?: 'icon' | 'horizontal' | 'full' | 'card';
  theme?: 'dark' | 'light' | 'auto';
  customLogoUrl?: string;
  showSubtitle?: boolean;
}

/**
 * Official Motive Studio Vector Monogram
 * Exact geometric reproduction of The Motive Studio emblem:
 * - Geometric 'M' ribbon in bold matte charcoal/white
 * - Signature Electric Blue 3D faceted top-right wing
 * - Ascending growth/launch arrow through the center
 */
export const MotiveLogoMark: React.FC<{
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
}> = ({ theme = 'dark', className = 'h-full w-auto' }) => {
  const isLight = theme === 'light';
  const bodyColor = isLight ? '#15181E' : '#FFFFFF';
  const bluePrimary = '#0066FF';
  const blueShadow = '#004BB5';
  const arrowFill = isLight ? '#FFFFFF' : '#0066FF';
  const arrowStroke = isLight ? '#15181E' : '#FFFFFF';

  return (
    <svg
      viewBox="0 0 360 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none drop-shadow-sm`}
    >
      {/* MONOGRAM 'M': LEFT ASCENDING MOUNTAIN */}
      {/* Outer ascending left leg */}
      <path
        d="M 36 215 L 115 45 L 152 45 L 73 215 Z"
        fill={bodyColor}
      />
      {/* Inner descending stroke to center trough */}
      <path
        d="M 115 45 L 175 168 L 195 128 L 148 45 Z"
        fill={bodyColor}
      />
      {/* Bottom center trough apex */}
      <path
        d="M 175 168 L 160 200 L 132 142 L 152 110 Z"
        fill={bodyColor}
      />
      {/* Center rising stroke bordering the arrow */}
      <path
        d="M 175 168 L 208 102 L 224 118 L 192 198 L 160 200 Z"
        fill={bodyColor}
      />

      {/* THE UPWARD LAUNCH ARROW (MOTIVE'S GROWTH EMBLEM) */}
      {/* Arrow Shaft */}
      <path
        d="M 198 122 L 222 138 L 232 116 L 210 100 Z"
        fill={arrowFill}
        stroke={arrowStroke}
        strokeWidth="1.5"
      />
      {/* Arrowhead with dynamic swept barbs pointing toward top-right */}
      <path
        d="M 218 95 L 254 32 L 194 72 L 214 84 L 202 108 L 216 116 L 226 94 Z"
        fill={arrowFill}
        stroke={arrowStroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* SIGNATURE TOP-RIGHT ELECTRIC BLUE 3D FACET */}
      {/* Primary Top Face: Vibrant Electric Blue */}
      <path
        d="M 248 32 L 298 32 L 264 100 L 238 100 Z"
        fill={bluePrimary}
      />
      {/* 3D Isometric Depth Facet: Royal Blue Shadow */}
      <path
        d="M 264 100 L 288 148 L 268 148 L 248 108 Z"
        fill={blueShadow}
      />

      {/* MONOGRAM 'M': RIGHT DESCENDING LEG */}
      <path
        d="M 248 108 L 268 148 L 308 215 L 272 215 L 236 142 Z"
        fill={bodyColor}
      />
      {/* Right base foot */}
      <path
        d="M 246 195 L 308 215 L 272 215 L 230 195 Z"
        fill={bodyColor}
      />
    </svg>
  );
};

export const MotiveLogo: React.FC<MotiveLogoProps> = ({
  className = 'h-10',
  variant = 'horizontal',
  theme = 'dark',
  customLogoUrl,
  showSubtitle = true,
}) => {
  // Only use custom image if the user explicitly uploaded/entered a custom URL (ignore default /official_logo.jpg which has a white background box)
  const isCustomUploaded =
    customLogoUrl &&
    customLogoUrl.trim() !== '' &&
    customLogoUrl !== '/official_logo.jpg';

  if (isCustomUploaded) {
    if (variant === 'icon') {
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <img
            src={customLogoUrl}
            alt="The Motive Studio"
            className="h-full w-auto object-contain"
          />
        </div>
      );
    }

    if (variant === 'card' || variant === 'full') {
      return (
        <div className="flex flex-col items-center text-center max-w-sm mx-auto">
          <img
            src={customLogoUrl}
            alt="The Motive Studio Logo"
            className="w-full max-h-32 object-contain"
          />
        </div>
      );
    }

    // Horizontal lockup (Header, Footer, Navbar) — clean transparent without white side padding box
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={customLogoUrl}
          alt="The Motive Studio"
          className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 hover:scale-105"
        />
      </div>
    );
  }

  // Official Card Variant: Clean presentation lockup
  if (variant === 'card') {
    return (
      <div className="bg-white text-[#111111] p-6 sm:p-8 rounded-2xl shadow-xl border border-black/10 flex flex-col items-center text-center max-w-sm mx-auto">
        <div className="h-20 w-auto mb-4 flex items-center justify-center">
          <MotiveLogoMark theme="light" className="h-full w-auto" />
        </div>
        <div className="font-display font-black text-xl sm:text-2xl tracking-[-0.01em] uppercase text-[#111111] leading-tight">
          THE MOTIVE STUDIO
        </div>
        {showSubtitle && (
          <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-[#111111]/80 uppercase mt-2.5 leading-none">
            WE CREATE. YOU GROW.
          </div>
        )}
      </div>
    );
  }

  // Icon only
  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <MotiveLogoMark theme={theme} className="h-full w-auto" />
      </div>
    );
  }

  // Full stacked logo (Mark above typography)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="h-16 sm:h-20 w-auto mb-3 flex items-center justify-center">
          <MotiveLogoMark theme={theme} className="h-full w-auto" />
        </div>
        <div
          className={`font-display font-black text-xl sm:text-2xl tracking-[-0.02em] uppercase leading-tight ${
            theme === 'light' ? 'text-[#111111]' : 'text-white'
          }`}
        >
          THE MOTIVE STUDIO
        </div>
        {showSubtitle && (
          <div className="text-[10px] sm:text-xs font-bold tracking-[0.28em] text-[#0066ff] uppercase mt-2 leading-none">
            WE CREATE. YOU GROW.
          </div>
        )}
      </div>
    );
  }

  // Horizontal lockup (Header, Footer, Navbar) — Pure transparent vector mark + crisp typography
  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 ${className}`}>
      <div className="h-9 sm:h-10 w-auto shrink-0 flex items-center justify-center">
        <MotiveLogoMark theme={theme} className="h-full w-auto" />
      </div>
      <div className="flex flex-col justify-center text-left">
        <span
          className={`font-display font-black tracking-[-0.01em] text-sm sm:text-[15px] leading-none uppercase ${
            theme === 'light' ? 'text-[#111111]' : 'text-white'
          }`}
        >
          THE MOTIVE STUDIO
        </span>
        {showSubtitle && (
          <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.25em] text-[#0066ff] uppercase mt-1.5 leading-none">
            WE CREATE. YOU GROW.
          </span>
        )}
      </div>
    </div>
  );
};
