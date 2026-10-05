import React, { useEffect } from 'react';
import { ProjectItem } from '../data/studioData';
import { X, ArrowRight, CheckCircle2, TrendingUp, Layers, ExternalLink, Folder } from 'lucide-react';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquireSimilar: (projectName: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onInquireSimilar,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#181818] border border-white/15 rounded-3xl text-white shadow-2xl p-6 sm:p-10 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close case study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Year */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7fb0ff] uppercase tracking-wider mb-2">
          <span>{project.category}</span>
          <span>·</span>
          <span>{project.year}</span>
          <span>·</span>
          <span className="text-neutral-400">{project.client}</span>
        </div>

        {/* Title */}
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          {project.title}
        </h2>

        {/* Large Media Image */}
        <div className="rounded-2xl overflow-hidden mb-8 border border-white/10 aspect-[16/9] bg-neutral-900">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Impact Metrics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#0066ff]/10 border border-[#0066ff]/30 mb-8">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-left">
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-white tabular-nums tracking-tight">
                {m.value}
              </div>
              <div className="text-xs text-neutral-300 mt-1 font-medium">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-white/10">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
              The Challenge
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#7fb0ff] mb-2">
              The Motive Solution
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Deliverables & Technologies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Key Deliverables
            </h4>
            <ul className="space-y-2">
              {project.deliverables.map((del) => (
                <li key={del} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#0066ff] shrink-0" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Execution Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Google Drive Portfolio Link Banner */}
        {project.driveUrl && (
          <div className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066ff]/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0066ff]/20 text-[#7fb0ff] flex items-center justify-center shrink-0">
                <Folder className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#7fb0ff]">
                  Google Drive Live Portfolio
                </div>
                <div className="text-sm font-bold text-white">
                  {project.driveFolderTitle || 'Explore Raw Project Deliverables & Assets'}
                </div>
              </div>
            </div>

            <a
              href={project.driveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#0066ff] hover:text-white text-xs font-bold transition-all whitespace-nowrap shadow-md cursor-pointer"
            >
              <span>Open Drive Folder</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* CTA Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div>
            <h4 className="text-base font-bold text-white">Inspired by this build?</h4>
            <p className="text-xs text-neutral-400">Let's discuss how we can achieve similar metrics for your brand.</p>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onInquireSimilar(project.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all duration-150 cursor-pointer shadow-lg shadow-[#0066ff]/25"
          >
            <span>Inquire About Similar Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
