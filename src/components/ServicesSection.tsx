import React, { useState } from 'react';
import { ServiceItem } from '../data/studioData';
import { ArrowUpRight, Folder, ExternalLink } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { ScrollReveal } from './ScrollReveal';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onInquireService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onInquireService,
}) => {
  const { content } = useStudioContent();
  const services = content.services;

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All 12 Capabilities' },
    { id: 'animation', label: '2D & 3D Animation' },
    { id: 'video', label: 'Video Editing & Reels' },
    { id: 'design', label: 'Branding & Ebooks' },
    { id: 'web', label: 'Web & Engineering' },
    { id: 'growth', label: 'Marketing & Data' },
  ];

  const getDriveLinkForCategory = (cat: string) => {
    if (cat === 'animation' || cat === 'video') {
      return {
        title: 'Animations & Video Motion Drive',
        url: 'https://drive.google.com/drive/folders/17MhPKC28xcSzgSNxKmtlUx-7G4sSxwLC?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
      };
    }
    if (cat === 'web') {
      return {
        title: 'UI/UX & Website Design Drive',
        url: 'https://drive.google.com/drive/folders/1oNbT1oDarigVI8ct_0-N_CgYilWREhtU?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
      };
    }
    if (cat === 'design') {
      return {
        title: 'Graphics, Brand & Packaging Drive',
        url: 'https://drive.google.com/drive/folders/1QW5eBu9DmLPwA94n4a71E9x4OWTTGqgX?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
      };
    }
    return {
      title: 'Master Studio Drive Archive',
      url: 'https://drive.google.com/drive/folders/1lQRNikZqauoSauelA4HnizeuOJos5RET?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    };
  };

  const filteredServices = services.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#f7f5f0] text-[#111111]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-7 border-b border-black/10">
            <div>
              <div className="text-[#0066ff] text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.25em] mb-2.5">
                Full-Spectrum Creative Services
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.02] text-[#111111]">
                Creative thinking.<br />
                Digital execution.
              </h2>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2.5">
              <p className="max-w-md text-neutral-600 text-xs sm:text-sm leading-relaxed">
                From 2D/3D animation, commercial video editing, and viral reels to executive ebooks, brand identity, and custom web development.
              </p>
              <a
                href={getDriveLinkForCategory(activeCategory).url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066ff] hover:text-[#0052cc] transition-colors"
              >
                <Folder className="w-3.5 h-3.5" />
                <span>Open {getDriveLinkForCategory(activeCategory).title}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal variant="fade-up" delay={120} duration={650}>
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#111111] text-white shadow-md'
                    : 'bg-white border border-black/10 text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredServices.map((service, index) => {
            const serviceDrive = getDriveLinkForCategory(service.category);
            return (
              <ScrollReveal
                key={service.id}
                variant="fade-up"
                delay={(index % 4) * 80}
                duration={700}
                className="h-full"
              >
                <div className="group relative bg-white border border-black/10 rounded-2xl p-6 flex flex-col justify-between h-full min-h-[300px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0066ff]/50 hover:shadow-xl hover:shadow-black/5 overflow-hidden">
                  {/* Background ambient corner circle */}
                  <div className="absolute -right-12 -bottom-12 w-28 h-28 bg-[#0066ff]/10 rounded-full transition-transform duration-500 group-hover:scale-150 pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-extrabold text-[#0066ff] tracking-widest">
                        {service.number}
                      </span>
                      <span className="w-9 h-9 rounded-xl bg-[#f7f5f0] flex items-center justify-center font-bold text-base text-neutral-900 group-hover:bg-[#0066ff] group-hover:text-white transition-colors duration-200">
                        {service.symbol}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-neutral-900 mb-2 group-hover:text-[#0066ff] transition-colors duration-150">
                      {service.title}
                    </h3>

                    <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed mb-5">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectService(service)}
                        className="text-xs font-bold text-neutral-800 hover:text-[#0066ff] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Deliverables</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={serviceDrive.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-neutral-500 hover:text-[#0066ff] flex items-center gap-1 transition-colors"
                        title={`View ${serviceDrive.title}`}
                      >
                        <Folder className="w-3 h-3 text-[#0066ff]" />
                        <span>Drive</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => onInquireService(service.title)}
                      className="text-xs font-bold text-[#0066ff] hover:text-[#0052cc] px-3 py-1 rounded-full bg-[#0066ff]/10 hover:bg-[#0066ff]/20 transition-colors cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
