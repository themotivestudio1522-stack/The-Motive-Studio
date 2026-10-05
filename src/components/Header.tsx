import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Edit3, Settings } from 'lucide-react';
import { MotiveLogo } from './MotiveLogo';
import { useStudioContent } from '../context/StudioContentContext';

interface HeaderProps {
  onStartProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartProject }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content, setIsDrawerOpen } = useStudioContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Ebook', href: '#ebook' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Blog', href: '#blog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#111111]/94 backdrop-blur-md py-3.5 border-b border-white/10 shadow-2xl'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Official Logo with ample right spacing */}
        <div className="flex items-center shrink-0 mr-8 lg:mr-12 xl:mr-16">
          <a
            href="#home"
            className="flex items-center group transform transition-transform duration-300 ease-out hover:scale-105 active:scale-95 origin-left cursor-pointer"
            aria-label="The Motive Studio Home"
          >
            <MotiveLogo
              variant="horizontal"
              theme="dark"
              customLogoUrl={content.branding.customLogoUrl}
              className="h-10 sm:h-11 transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 mr-4 xl:mr-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-white text-xs uppercase tracking-wider font-bold transition-colors duration-150 relative py-1 px-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0066ff] after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Prominent Edit Website / Logo Button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2.5 rounded-full transition-all duration-200 border border-white/20 hover:border-white/40 cursor-pointer shadow-sm hover:scale-[1.02]"
            title="Edit Website, Logo, Services & Content"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#7fb0ff]" />
            <span className="hidden sm:inline">Edit Website</span>
            <span className="sm:hidden">Edit</span>
          </button>

          <button
            type="button"
            onClick={onStartProject}
            className="inline-flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-bold px-5 sm:px-6 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0066ff]/25 active:translate-y-0 cursor-pointer whitespace-nowrap"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/90 hover:text-white rounded-lg border border-white/10 bg-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-5 pt-3 pb-6 bg-[#181818] border-b border-white/10 shadow-2xl mt-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDrawerOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-[#7fb0ff]" />
                <span>Edit Website &amp; Logo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartProject();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white text-sm font-bold py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
