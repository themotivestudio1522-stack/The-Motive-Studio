import React from 'react';
import { ArrowUp, Instagram, Linkedin, Facebook, Globe } from 'lucide-react';
import { MotiveLogo } from './MotiveLogo';
import { useStudioContent } from '../context/StudioContentContext';
import { ScrollReveal } from './ScrollReveal';

export const Footer: React.FC = () => {
  const { content } = useStudioContent();
  const { branding } = content;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    {
      label: 'Instagram',
      href: content.socials?.instagram || 'https://www.instagram.com/themotivestudio1522/',
      icon: Instagram,
    },
    {
      label: 'LinkedIn',
      href: content.socials?.linkedin || 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B6nDsZNWyQherCT0HW%2B%2FclA%3D%3D',
      icon: Linkedin,
    },
    {
      label: 'Facebook',
      href: content.socials?.facebook || 'https://www.facebook.com/profile.php?id=61594971998869',
      icon: Facebook,
    },
    {
      label: 'Fiverr Pro',
      href: content.socials?.fiverr || 'https://fiverr.com',
      icon: Globe,
    },
    {
      label: 'Upwork Top Rated',
      href: content.socials?.upwork || 'https://upwork.com',
      icon: Globe,
    },
  ];

  const drivePortfolios = [
    { label: 'Master Studio Drive (All Categories)', href: 'https://drive.google.com/drive/folders/1lQRNikZqauoSauelA4HnizeuOJos5RET?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto' },
    { label: 'Motion & 3D Drive', href: 'https://drive.google.com/drive/folders/17MhPKC28xcSzgSNxKmtlUx-7G4sSxwLC?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto' },
    { label: 'UI/UX & Web Drive', href: 'https://drive.google.com/drive/folders/1oNbT1oDarigVI8ct_0-N_CgYilWREhtU?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto' },
    { label: 'Brand & Graphics Drive', href: 'https://drive.google.com/drive/folders/1QW5eBu9DmLPwA94n4a71E9x4OWTTGqgX?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto' },
  ];

  return (
    <footer className="bg-[#090909] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-white/10">
            <div>
              <div className="mb-3">
                <MotiveLogo
                  variant="horizontal"
                  theme="dark"
                  customLogoUrl={branding.customLogoUrl}
                  className="h-10 sm:h-11"
                />
              </div>
              <p className="text-xs text-neutral-400 max-w-sm">
                Creative digital studio specializing in brand identity, high-conversion web development, and digital experiences.
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-[#0066ff] border border-white/10 hover:border-[#0066ff] text-xs font-semibold text-neutral-300 hover:text-white transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#7fb0ff] group-hover:text-white" />
                    <span>{s.label}</span>
                  </a>
                );
              })}
              <button
                type="button"
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#0066ff] hover:border-[#0066ff] flex items-center justify-center text-white transition-all cursor-pointer ml-1"
                aria-label="Scroll back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Dedicated Google Drive Live Archives Bar in Footer */}
        <ScrollReveal variant="fade-up" delay={50} duration={650}>
          <div className="py-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#0066ff]" />
              <span className="uppercase tracking-wider font-bold text-white text-[11px]">Direct Google Drive Portfolios:</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              {drivePortfolios.map((dp) => (
                <a
                  key={dp.label}
                  href={dp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-neutral-400 hover:text-[#7fb0ff] transition-colors underline-offset-4 hover:underline"
                >
                  {dp.label}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={100} duration={650}>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-neutral-400 font-mono">
            <div>
              © 2026 {branding.studioName}. All rights reserved. · Directed by <span className="text-white font-semibold">Eman Tariq (CEO)</span> &amp; <span className="text-white font-semibold">Zara Amin Khan (Co-Founder)</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-white/80 font-bold tracking-widest text-[11px] font-display">
                WE CREATE. <span style={{ color: branding.accentColor || '#0066ff' }}>YOU GROW.</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

