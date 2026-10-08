import React from 'react';
import { ArrowDown, ArrowUpRight, Folder, BookOpen } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { ScrollReveal } from './ScrollReveal';

interface HeroProps {
  onStartProject: () => void;
  onOpenEbook?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onOpenEbook }) => {
  const { content } = useStudioContent();
  const { hero, branding } = content;

  return (
    <section id="home" className="relative min-h-screen bg-[#111111] text-white flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px'
        }}
      />

      {/* Atmospheric Ambient Glow */}
      <div
        className="absolute right-[-180px] top-[15%] w-[600px] h-[600px] rounded-full blur-[180px] opacity-[0.24] pointer-events-none"
        style={{ backgroundColor: branding.accentColor || '#0066ff' }}
      />
      <div className="absolute left-[-120px] bottom-[10%] w-[380px] h-[380px] bg-[#0052cc] rounded-full blur-[140px] opacity-[0.14] pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow Label */}
          <ScrollReveal variant="fade-up" duration={600} threshold={0}>
            <div className="inline-flex items-center gap-2 text-[#7fb0ff] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-6">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: branding.accentColor || '#0066ff' }}
              />
              <span>{hero.eyebrow}</span>
            </div>
          </ScrollReveal>

          {/* Primary Display Title */}
          <ScrollReveal variant="fade-up" duration={750} delay={100} threshold={0}>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[76px] font-black leading-[0.96] tracking-[-0.03em] mb-7 text-white">
              {hero.titleLine1}<br />
              <span
                className="text-[#0066ff]"
                style={{ color: branding.accentColor || '#0066ff' }}
              >
                {hero.titleLine2}
              </span>
            </h1>
          </ScrollReveal>

          {/* Value Proposition Description */}
          <ScrollReveal variant="fade-up" duration={700} delay={180} threshold={0}>
            <p className="text-[#bdbdbd] text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-normal mb-9 text-balance">
              {hero.description}
            </p>
          </ScrollReveal>

          {/* Action Button Group */}
          <ScrollReveal variant="fade-up" duration={700} delay={250} threshold={0}>
            <div className="flex items-center gap-3.5 flex-wrap mb-14">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0066ff]/30 active:translate-y-0 cursor-pointer"
                style={{ backgroundColor: branding.accentColor || '#0066ff' }}
              >
                <span>{hero.primaryCtaText}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onStartProject}
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-1 hover:bg-white/5 active:translate-y-0 cursor-pointer"
              >
                <span>{hero.secondaryCtaText}</span>
                <ArrowUpRight className="w-4 h-4 text-[#7fb0ff]" />
              </button>

              <a
                href="https://drive.google.com/drive/folders/1lQRNikZqauoSauelA4HnizeuOJos5RET?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-neutral-200 hover:text-white text-xs sm:text-sm font-bold px-5 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-1 active:translate-y-0 cursor-pointer"
              >
                <Folder className="w-4 h-4 text-[#7fb0ff]" />
                <span>Drive Portfolios</span>
              </a>

              <a
                href="#ebook"
                onClick={(e) => {
                  if (onOpenEbook) {
                    e.preventDefault();
                    onOpenEbook();
                  }
                }}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-neutral-200 hover:text-white text-xs sm:text-sm font-bold px-5 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-1 active:translate-y-0 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#7fb0ff]" />
                <span>Free Studio Ebook</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Proof Badges & Adjacency */}
          <ScrollReveal variant="fade-up" duration={700} delay={320} threshold={0}>
            <div className="pt-7 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl text-left">
              <div>
                <div className="font-display font-extrabold text-xl sm:text-2xl text-white tabular-nums tracking-tight">
                  {hero.stat1Value}
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-400 mt-1">
                  {hero.stat1Label}
                </div>
              </div>

              <div>
                <div className="font-display font-extrabold text-xl sm:text-2xl text-white tabular-nums tracking-tight">
                  {hero.stat2Value}
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-400 mt-1">
                  {hero.stat2Label}
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div
                  className="font-display font-extrabold text-xl sm:text-2xl text-[#7fb0ff] tabular-nums tracking-tight"
                  style={{ color: branding.accentColor || '#7fb0ff' }}
                >
                  {hero.stat3Value}
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-400 mt-1">
                  {hero.stat3Label}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-neutral-500 text-[11px] tracking-[0.25em] uppercase font-semibold">
        <span>Scroll to explore</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#0066ff]" />
      </div>
    </section>
  );
};
