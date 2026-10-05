import React, { useEffect } from 'react';
import { ServiceItem } from '../data/studioData';
import { X, CheckCircle2, Clock, Zap, ArrowRight, Folder, ExternalLink } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquire: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onInquire,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const getDriveLinkForService = (category: string) => {
    if (category === 'animation' || category === 'video') {
      return {
        title: 'Animations & Video Motion Drive',
        url: 'https://drive.google.com/drive/folders/17MhPKC28xcSzgSNxKmtlUx-7G4sSxwLC?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
      };
    }
    if (category === 'web') {
      return {
        title: 'UI/UX & Web Design Drive',
        url: 'https://drive.google.com/drive/folders/1oNbT1oDarigVI8ct_0-N_CgYilWREhtU?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
      };
    }
    if (category === 'design') {
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

  const driveInfo = getDriveLinkForService(service.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#181818] border border-white/15 rounded-3xl text-white shadow-2xl p-6 sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close service modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Number & Symbol */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-xl bg-[#0066ff]/20 text-[#0066ff] flex items-center justify-center font-bold text-lg">
            {service.symbol}
          </span>
          <span className="font-mono text-xs font-bold text-[#7fb0ff] uppercase tracking-widest">
            Capability {service.number}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          {service.title}
        </h2>

        {/* Description */}
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Timeline & Key Metric Row */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-[#0066ff]" />
              <span>Typical Timeline</span>
            </div>
            <div className="text-sm font-bold text-white">{service.timeline}</div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Target Benchmark</span>
            </div>
            <div className="text-sm font-bold text-white">{service.keyMetric}</div>
          </div>
        </div>

        {/* Google Drive Portfolio Link Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-neutral-300">
            <Folder className="w-4 h-4 text-[#7fb0ff] shrink-0" />
            <span>View client samples in <strong className="text-white font-semibold">{driveInfo.title}</strong></span>
          </div>
          <a
            href={driveInfo.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0066ff] text-white hover:bg-[#0052cc] font-bold text-xs transition-colors shrink-0"
          >
            <span>Open Drive</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Deliverables List */}
        <div className="mb-8">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Core Scope & Deliverables
          </h4>
          <ul className="space-y-2.5">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#0066ff] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Action */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onInquire(service.title);
            }}
            className="inline-flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <span>Inquire for {service.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

