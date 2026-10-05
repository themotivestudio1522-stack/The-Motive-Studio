import React, { useState } from 'react';
import { ProjectItem, STUDIO_DRIVE_PORTFOLIOS } from '../data/studioData';
import { ArrowUpRight, Folder, ExternalLink } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { ScrollReveal } from './ScrollReveal';

interface WorkSectionProps {
  onOpenCaseStudy: (project: ProjectItem) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onOpenCaseStudy }) => {
  const { content } = useStudioContent();
  const projects = content.projects;
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Brand Identity', 'Website Design', 'UI/UX Design', 'Motion Design'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="py-24 sm:py-32 bg-white text-[#111111] border-b border-black/10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-black/10">
            <div>
              <div className="text-[#0066ff] text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.25em] mb-2.5">
                Selected Work
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.02] text-[#111111]">
                Built to be<br />
                remembered.
              </h2>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <p className="max-w-md text-neutral-600 text-xs sm:text-sm leading-relaxed">
                A selection of creative work across branding,
                digital products, websites and visual experiences.
              </p>
              <a
                href="https://drive.google.com/drive/folders/1lQRNikZqauoSauelA4HnizeuOJos5RET?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066ff] hover:text-[#0052cc] transition-colors"
              >
                <Folder className="w-3.5 h-3.5" />
                <span>Open Master Google Drive Archive</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filters (Clean Segmented Controls) */}
        <ScrollReveal variant="fade-up" delay={100} duration={650}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  filter === cat
                    ? 'bg-[#111111] text-white shadow-md'
                    : 'bg-[#f7f5f0] text-neutral-600 hover:text-black hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active Category Direct Google Drive Folder Quick Access Bar */}
          {(() => {
            const activeDrive = (() => {
              if (filter === 'Brand Identity') {
                return {
                  categoryLabel: 'Brand Identity & Graphics',
                  title: 'Graphics, Brand Identity & Packaging Drive Portfolio',
                  url: 'https://drive.google.com/drive/folders/1QW5eBu9DmLPwA94n4a71E9x4OWTTGqgX?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
                  description: 'Direct Google Drive folder for raw vector marks, brand books, packaging dielines, and luxury print PDFs.',
                  fileTypes: 'Vector SVG/EPS, Brand Guidelines PDFs, Packaging Dielines, Typography Specs',
                };
              }
              if (filter === 'Website Design') {
                return {
                  categoryLabel: 'Website Design & Engineering',
                  title: 'UI/UX, SaaS & Website Design Drive Portfolio',
                  url: 'https://drive.google.com/drive/folders/1oNbT1oDarigVI8ct_0-N_CgYilWREhtU?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
                  description: 'Direct Google Drive folder for desktop & mobile web design systems, interactive Figma layouts, and components.',
                  fileTypes: 'Figma Layouts, Responsive Wireframes, Design Tokens, Prototype Specs',
                };
              }
              if (filter === 'UI/UX Design') {
                return {
                  categoryLabel: 'UI/UX Design & Mobile Apps',
                  title: 'UI/UX, SaaS Dashboards & Mobile Apps Drive Portfolio',
                  url: 'https://drive.google.com/drive/folders/1oNbT1oDarigVI8ct_0-N_CgYilWREhtU?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
                  description: 'Direct Google Drive folder for native iOS/Android mobile screens, SaaS control centers, and user journey flows.',
                  fileTypes: 'Figma Design Systems, iOS/Android UI Kits, Interactive Prototype Files',
                };
              }
              if (filter === 'Motion Design') {
                return {
                  categoryLabel: 'Motion Design, 3D CGI & Video',
                  title: 'Animations, 3D CGI & Commercial Video Drive Portfolio',
                  url: 'https://drive.google.com/drive/folders/17MhPKC28xcSzgSNxKmtlUx-7G4sSxwLC?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
                  description: 'Direct Google Drive folder for 3D CGI renders, kinetic typography, high-framerate commercial cuts, and reels.',
                  fileTypes: '4K MP4 Renders, ProRes Video, Octane 3D Renders, Lottie JSON Loops',
                };
              }
              return {
                categoryLabel: 'All 50+ Studio Categories',
                title: 'Master Studio Drive Archive (Complete 50+ Folder Repository)',
                url: 'https://drive.google.com/drive/folders/1lQRNikZqauoSauelA4HnizeuOJos5RET?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
                description: 'Browse the uncompressed master drive archive encompassing branding, websites, apps, 3D motion, and publications.',
                fileTypes: 'Figma, Vector AI, 4K MP4 Renders, Print PDFs, Source Deliverables',
              };
            })();

            return (
              <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#111111] text-white border border-black/10 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0066ff] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#0066ff]/20">
                    <Folder className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7fb0ff]">
                        {activeDrive.categoryLabel}
                      </span>
                      <span className="text-white/40 hidden sm:inline">·</span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {activeDrive.fileTypes}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {activeDrive.title}
                    </div>
                    <p className="text-xs text-neutral-300 mt-0.5 line-clamp-1">
                      {activeDrive.description}
                    </p>
                  </div>
                </div>

                <a
                  href={activeDrive.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#0066ff] hover:text-white text-xs font-bold transition-all duration-150 shadow hover:shadow-lg whitespace-nowrap cursor-pointer shrink-0"
                >
                  <span>Open Drive Folder</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })()}
        </ScrollReveal>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              variant="fade-up"
              delay={(index % 2) * 120}
              duration={750}
            >
              <div
                onClick={() => onOpenCaseStudy(project)}
                className="group relative rounded-3xl overflow-hidden bg-[#111111] border border-black/10 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300" />

                  {/* Top Corner Action Indicator */}
                  <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#0066ff] group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>

                  {/* Bottom Content Area */}
                  <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-8 text-white z-10">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#8bb5ff] uppercase tracking-wider mb-2">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-white/60 font-mono">{project.year}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2 group-hover:text-[#7fb0ff] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Impact Metric Bar & Direct Drive Action */}
                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-6">
                        {project.metrics.slice(0, 2).map((m) => (
                          <div key={m.label} className="text-xs">
                            <span className="font-mono font-bold text-white text-sm mr-1.5">{m.value}</span>
                            <span className="text-neutral-400">{m.label}</span>
                          </div>
                        ))}
                      </div>

                      {project.driveUrl && (
                        <a
                          href={project.driveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#0066ff] border border-white/20 text-xs font-semibold text-white transition-all hover:scale-105"
                          title="Open Google Drive Files"
                        >
                          <Folder className="w-3.5 h-3.5 text-[#7fb0ff]" />
                          <span>Drive Files</span>
                          <ExternalLink className="w-3 h-3 text-white/70" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Google Drive Portfolio Repositories Showcase Bar */}
        <ScrollReveal variant="fade-up" delay={150} duration={750} className="mt-14">
          <div className="bg-[#111111] text-white rounded-3xl p-7 sm:p-10 border border-black/10 shadow-2xl relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute right-[-100px] top-[-100px] w-80 h-80 bg-[#0066ff]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-[#7fb0ff] text-xs font-mono font-bold tracking-[0.25em] uppercase mb-2">
                  <Folder className="w-4 h-4 text-[#0066ff]" />
                  <span>Direct Client Verification</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Explore Live Google Drive Portfolios
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl">
                  Browse our uncompressed project folders, raw Figma design systems, 4K CGI renders, and brand guidelines directly on Google Drive.
                </p>
              </div>

              <a
                href="https://drive.google.com/drive/folders/1lQRNikZqauoSauelA4HnizeuOJos5RET?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#0066ff]/30 active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
              >
                <span>Open Master Studio Archive (50+ Folders)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* 4 Dedicated Drive Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {STUDIO_DRIVE_PORTFOLIOS.map((drive) => (
                <a
                  key={drive.id}
                  href={drive.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group/drive p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066ff] hover:bg-white/10 transition-all flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0066ff]/20 text-[#7fb0ff] flex items-center justify-center group-hover/drive:bg-[#0066ff] group-hover/drive:text-white transition-colors">
                        <Folder className="w-4 h-4" />
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover/drive:text-white transition-colors" />
                    </div>

                    <div className="text-[11px] font-mono text-[#7fb0ff] font-bold uppercase tracking-wider mb-1">
                      {drive.category}
                    </div>

                    <h4 className="font-display font-bold text-sm text-white mb-2 group-hover/drive:text-[#7fb0ff] transition-colors">
                      {drive.title}
                    </h4>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                      {drive.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-semibold text-neutral-400 group-hover/drive:text-white">
                    <span>View Drive Folder</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#7fb0ff]" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

