import React from 'react';

export interface MotiveLogoProps {
  className?: string;
  variant?: 'icon' | 'horizontal' | 'full' | 'card';
  theme?: 'dark' | 'light' | 'auto';
  customLogoUrl?: string;
  showSubtitle?: boolean;
  logoStyle?: 'signature' | 'minimal' | 'crest';
}

/**
 * Official Motive Studio Vector Monograms
 */
export const MotiveLogoMark: React.FC<{
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  style?: 'signature' | 'minimal' | 'crest';
}> = ({ theme = 'dark', className = 'h-full w-auto', style = 'signature' }) => {
  const isLight = theme === 'light';
  const bodyColor = isLight ? '#14171D' : '#FFFFFF';
  const blueColor = '#0066ff';
  const blueOutline = isLight ? '#14171D' : '#06479E';

  if (style === 'minimal') {
    return (
      <svg
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} select-none`}
      >
        <path d="M 12 70 L 12 18 L 30 18 L 48 54 L 38 70 Z" fill={bodyColor} />
        <path d="M 88 70 L 88 18 L 70 18 L 52 54 L 62 70 Z" fill={bodyColor} />
        <path
          d="M 50 12 L 68 46 L 50 56 L 32 46 Z"
          fill={blueColor}
          stroke={bodyColor}
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (style === 'crest') {
    return (
      <svg
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} select-none`}
      >
        <polygon
          points="45,4 82,24 82,66 45,86 8,66 8,24"
          fill="none"
          stroke={bodyColor}
          strokeWidth="3"
          strokeOpacity="0.85"
        />
        <path
          d="M 24 64 L 24 30 L 45 56 L 66 30 L 66 64"
          stroke={bodyColor}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon points="45,20 53,30 45,40 37,30" fill={blueColor} />
      </svg>
    );
  }

  // Exact signature mark from official logo raster asset
  return (
    <img
      src={isLight ? '/logo_mark_black.png' : '/logo_mark_white.png'}
      alt="The Motive Studio Mark"
      className={`${className} object-contain select-none`}
    />
  );
};

export const MotiveLogo: React.FC<MotiveLogoProps> = ({
  className = 'h-10',
  variant = 'horizontal',
  theme = 'dark',
  customLogoUrl,
  showSubtitle = true,
  logoStyle = 'signature',
}) => {
  const isLight = theme === 'light';

  // Check if using the official uploaded logo vs an external user custom URL
  const isOfficialLogoAsset =
    !customLogoUrl ||
    customLogoUrl.trim() === '' ||
    customLogoUrl === '/logo_dark_theme.png' ||
    customLogoUrl === '/logo_light_theme.png' ||
    customLogoUrl === '/logo_official.png' ||
    customLogoUrl === '/logo.png' ||
    customLogoUrl.includes('WhatsApp_Image_2026-10-05_at_1.50.00_PM-removebg-preview_5adf7cc5.png');

  // Active official theme-matched asset
  const officialLogoSrc = isLight ? '/logo_light_theme.png' : '/logo_dark_theme.png';
  const effectiveSrc = isOfficialLogoAsset ? officialLogoSrc : customLogoUrl;

  // Dual-drop shadow filter ensuring ANY black, white, or color logo is 100% visible on any navbar
  const adaptiveFilterStyle: React.CSSProperties = {
    filter: 'drop-shadow(0px 1px 2px rgba(255,255,255,0.25)) drop-shadow(0px 1px 2px rgba(0,0,0,0.5))',
  };

  // If user explicitly picked an alternate vector style (minimal / crest)
  if (logoStyle && logoStyle !== 'signature') {
    if (variant === 'icon') {
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <MotiveLogoMark theme={theme} style={logoStyle} className="h-full w-auto" />
        </div>
      );
    }
    return (
      <div className={`flex items-center gap-3 sm:gap-3.5 ${className}`}>
        <div className="h-9 sm:h-10 w-auto shrink-0 flex items-center justify-center">
          <MotiveLogoMark theme={theme} style={logoStyle} className="h-full w-auto" />
        </div>
        <div className="flex flex-col justify-center text-left">
          <span
            className={`font-display font-black tracking-[-0.01em] text-sm sm:text-[15px] leading-none uppercase ${
              isLight ? 'text-[#111111]' : 'text-white'
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
  }

  // 1. Icon Only Variant (Cropped mark)
  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img
          src={isLight ? '/logo_mark_black.png' : '/logo_mark_white.png'}
          alt="The Motive Studio"
          style={adaptiveFilterStyle}
          className="h-full w-auto object-contain transition-transform duration-200 hover:scale-105"
        />
      </div>
    );
  }

  // 2. Card Variant: Official Presentation Plaque
  if (variant === 'card') {
    return (
      <div className="bg-white text-[#111111] p-6 sm:p-8 rounded-2xl shadow-xl border border-black/10 flex flex-col items-center text-center max-w-sm mx-auto">
        <div className="h-20 w-auto mb-4 flex items-center justify-center">
          <img
            src="/logo_light_theme.png"
            alt="The Motive Studio Official Logo"
            className="w-full max-h-24 object-contain"
          />
        </div>
      </div>
    );
  }

  // 3. Full / Stacked Variant
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <img
          src={effectiveSrc}
          alt="The Motive Studio Logo"
          style={adaptiveFilterStyle}
          className="w-full max-h-28 object-contain transition-transform duration-200 hover:scale-105"
        />
      </div>
    );
  }

  // 4. Horizontal Lockup (Default for Header, Footer, and Navigation)
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={effectiveSrc}
        alt="The Motive Studio"
        style={adaptiveFilterStyle}
        className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 hover:scale-105"
      />
    </div>
  );
};
