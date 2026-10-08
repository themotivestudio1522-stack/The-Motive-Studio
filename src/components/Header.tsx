import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Linkedin, Facebook, Instagram } from 'lucide-react';
import { MotiveLogo } from './MotiveLogo';
import { useStudioContent } from '../context/StudioContentContext';

interface HeaderProps {
  onStartProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartProject }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content } = useStudioContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#work' },
    { label: 'Ebook', href: '#ebook' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Blog', href: '#blog' },
  ];

  const linkedinUrl = content.socials?.linkedin || 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B6nDsZNWyQherCT0HW%2B%2FclA%3D%3D';
  const facebookUrl = content.socials?.facebook || 'https://www.facebook.com/profile.php?id=61594971998869';
  const instagramUrl = content.socials?.instagram || 'https://www.instagram.com/themotivestudio1522/';

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
        <div className="flex items-center shrink-0 mr-6 lg:mr-8 xl:mr-12">
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
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 mr-4">
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

        {/* Zone 3: Social Icons + Primary Action */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Social Quick Icons (Desktop) */}
          <div className="hidden xl:flex items-center gap-1.5 mr-1 pr-2 border-r border-white/15">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#0066ff] border border-white/15 hover:border-[#0066ff] flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
              title="LinkedIn Profile"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#0066ff] border border-white/15 hover:border-[#0066ff] flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
              title="Facebook Page"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#0066ff] border border-white/15 hover:border-[#0066ff] flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
              title="Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

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

            {/* Social Icons Row in Mobile Menu */}
            <div className="flex items-center gap-2.5 pt-2 pb-1 px-1">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-[#0066ff] border border-white/15 text-xs font-bold text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#7fb0ff]" />
                <span>LinkedIn</span>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-[#0066ff] border border-white/15 text-xs font-bold text-white transition-colors"
              >
                <Facebook className="w-4 h-4 text-[#7fb0ff]" />
                <span>Facebook</span>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-[#0066ff] border border-white/15 text-xs font-bold text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#7fb0ff]" />
                <span>Instagram</span>
              </a>
            </div>

            <div className="pt-2">
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
