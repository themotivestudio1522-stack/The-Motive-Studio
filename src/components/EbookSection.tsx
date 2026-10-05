import React, { useState } from 'react';
import { useStudioContent } from '../context/StudioContentContext';
import { BookOpen, Download, Star, CheckCircle2, ArrowRight, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { EbookChapter } from '../data/studioData';
import { ScrollReveal } from './ScrollReveal';

interface EbookSectionProps {
  onOpenEbookModal: () => void;
  onOpenChapterPreview: (chapter: EbookChapter) => void;
}

export const EbookSection: React.FC<EbookSectionProps> = ({
  onOpenEbookModal,
  onOpenChapterPreview,
}) => {
  const { content } = useStudioContent();
  const ebook = content.ebook || {
    title: 'THE MOTIVE PLAYBOOK',
    subtitle: 'Brand & Digital Mastery for Ambitious Teams',
    badge: 'Free Comprehensive Guide · 2026 Edition',
    coverImage: '/src/assets/images/motive_ebook_cover_1791222239342.jpg',
    description: 'The definitive executive field guide on how high-growth businesses turn strategic positioning, sub-second UI/UX performance, and kinetic brand systems into durable market leadership.',
    pageCount: '48 Pages',
    format: 'PDF + Interactive Notion Checklist',
    downloadCount: '2,400+ Founders & CMOs',
    rating: '4.95 / 5',
    authorNote: 'Curated by The Motive Studio principal directors based on 65+ deployed brand and web ecosystems.',
    chapters: []
  };

  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);

  return (
    <section id="ebook" className="py-24 sm:py-32 bg-[#111111] text-white border-b border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute left-[-150px] top-[20%] w-[550px] h-[550px] rounded-full blur-[180px] opacity-[0.20] pointer-events-none"
        style={{ backgroundColor: content.branding.accentColor || '#0066ff' }}
      />
      <div className="absolute right-[-100px] bottom-[15%] w-[400px] h-[400px] bg-[#0052cc] rounded-full blur-[160px] opacity-[0.14] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-7 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-[#7fb0ff] text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.25em] mb-2.5">
                <BookOpen className="w-4 h-4 text-[#0066ff]" />
                <span>Studio Publication & Ebook</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.02] text-white">
                The Motive Ebook.<br />
                <span
                  className="text-[#0066ff]"
                  style={{ color: content.branding.accentColor || '#0066ff' }}
                >
                  Free Executive Guide.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-neutral-400 text-xs sm:text-sm leading-relaxed">
              {ebook.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Main Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: 3D Book Cover Mockup (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <ScrollReveal variant="zoom-in" duration={800} delay={100}>
              <div
                onClick={onOpenEbookModal}
                className="group relative cursor-pointer perspective-1000 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Decorative back glow */}
                <div
                  className="absolute inset-4 rounded-2xl blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-75"
                  style={{ backgroundColor: content.branding.accentColor || '#0066ff' }}
                />

                {/* Book Container with 3D spine illusion */}
                <div className="relative w-[280px] sm:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-neutral-900 group-hover:border-[#0066ff] transition-all">
                  <img
                    src={ebook.coverImage}
                    alt={ebook.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono font-bold">
                    <span className="bg-[#111111]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-md border border-white/20">
                      2026 EDITION
                    </span>
                    <span className="bg-[#0066ff] text-white px-2.5 py-1 rounded-md">
                      FREE PDF
                    </span>
                  </div>

                  {/* Bottom subtle title pill */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-xs text-white">
                    <span className="font-bold">{ebook.pageCount}</span>
                    <span className="text-[#8bb5ff] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Click to read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Credibility Stats Bar */}
            <ScrollReveal variant="fade-up" delay={200} duration={600}>
              <div className="mt-8 flex items-center gap-6 text-center text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-white font-mono">{ebook.rating}</span>
                  <span className="text-neutral-400 font-normal">Rating</span>
                </div>
                <div className="w-px h-4 bg-white/15" />
                <div className="text-neutral-300">
                  <strong className="text-white font-mono">{ebook.downloadCount}</strong>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Chapters & Direct Action (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal variant="fade-left" duration={700} delay={100}>
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#8bb5ff] mb-2.5">
                  {ebook.badge}
                </div>
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug mb-2.5">
                  {ebook.subtitle}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {ebook.authorNote}
                </p>
              </div>
            </ScrollReveal>

            {/* Chapters Preview List */}
            <ScrollReveal variant="fade-up" duration={750} delay={200}>
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  What's Inside (4 Core Modules):
                </div>

                {ebook.chapters.map((ch, idx) => {
                  const isSelected = activeChapterIdx === idx;
                  return (
                    <div
                      key={ch.number}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer ${
                        isSelected
                          ? 'border-[#0066ff] bg-[#0066ff]/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                      onClick={() => setActiveChapterIdx(idx)}
                    >
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm font-bold text-[#0066ff]">
                            CH {ch.number}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-white">
                              {ch.title}
                            </h4>
                            <p className="text-xs text-neutral-400 hidden sm:block">
                              {ch.subtitle}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenChapterPreview(ch);
                          }}
                          className="text-xs font-bold text-[#7fb0ff] hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-1 transition-colors"
                        >
                          <span>Preview</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {isSelected && (
                        <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-2 text-xs">
                          <p className="text-neutral-300 leading-relaxed">
                            {ch.summary}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                            {ch.highlights.map((h) => (
                              <div key={h} className="flex items-center gap-2 text-neutral-400">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0066ff] shrink-0" />
                                <span className="truncate">{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Download CTA Bar */}
            <ScrollReveal variant="fade-up" duration={700} delay={250}>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#7fb0ff]" />
                    <span>Instant Digital Delivery</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    Available in high-res PDF + Notion Implementation Workspace.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenEbookModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold px-7 py-3 rounded-full text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0066ff]/30 active:scale-95 cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: content.branding.accentColor || '#0066ff' }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free Ebook</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

