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
  const bodyColor = isLight ? '#14171D' : '#FFFFFF';
  const blueColor = '#0A68DF';
  const blueOutline = isLight ? '#14171D' : '#06479E';

  return (
    <svg
      viewBox="0 0 420 265"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
    >
      {/* OUTER LEFT & CENTER RIBBON OF 'M' (Ascending to left peak, down to V-valley, up to top-right peak) */}
      <path
        d="M 18 242 L 154 28 L 208 112 L 278 4 L 298 34 L 218 158 L 154 60 L 62 206 L 90 206 L 154 106 L 208 190 L 244 134 L 268 152 L 208 245 L 154 162 L 103 242 Z"
        fill={bodyColor}
      />

      {/* RIGHT LOWER BLACK TRIANGLE LEG OF 'M' (With inner white chevron cutout) */}
      <path
        d="M 326 122 L 402 242 L 298 242 L 272 200 L 294 166 L 324 214 L 352 214 L 310 148 Z"
        fill={bodyColor}
      />

      {/* SIGNATURE TOP-RIGHT ELECTRIC BLUE '7' / WING FACET */}
      {/* Upper blue wing from top horizontal bar sweeping down-left */}
      <path
        d="M 278 4 L 368 4 L 264 166 L 274 96 L 296 64 L 316 34 L 298 34 Z"
        fill={blueColor}
        stroke={blueOutline}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Lower right blue diagonal bar descending into the right leg */}
      <path
        d="M 320 96 L 348 140 L 348 214 L 302 142 Z"
        fill={blueColor}
        stroke={blueOutline}
        strokeWidth="1.5"
        strokeLinejoin="round"
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
