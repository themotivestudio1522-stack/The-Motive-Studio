import React, { useState, useEffect } from 'react';
import { X, Download, CheckCircle2, BookOpen, Sparkles, ArrowRight, FileText, Star, Lock } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { EbookChapter } from '../data/studioData';

interface EbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewChapter?: EbookChapter | null;
}

export const EbookModal: React.FC<EbookModalProps> = ({
  isOpen,
  onClose,
  previewChapter,
}) => {
  const { content, showToast } = useStudioContent();
  const ebook = content.ebook;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Founder / Executive');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState<'download' | 'preview'>('download');
  const [selectedChapter, setSelectedChapter] = useState<EbookChapter | null>(null);

  useEffect(() => {
    if (previewChapter) {
      setSelectedChapter(previewChapter);
      setActiveTab('preview');
    } else if (ebook.chapters.length > 0) {
      setSelectedChapter(ebook.chapters[0]);
    }
  }, [previewChapter, ebook]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Ebook unlocked! Your download has started.');
    }, 600);
  };

  const simulateDownloadFile = () => {
    // Generate simulated downloadable file
    const content = `THE MOTIVE EBOOK: Brand & Digital Mastery\nPublished by The Motive Studio (2026)\n\nThank you for downloading our strategic executive guide.\nVisit: https://themotivestudio.com\nEmail: hello@themotivestudio.com\n\nChapters:\n1. The Neurological Brand Moat\n2. Sub-Second UI/UX Engineering\n3. Kinetic Identity & 3D Brand Systems\n4. Full-Funnel Conversion Architecture\n\n© 2026 The Motive Studio. All Rights Reserved.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'The_Motive_Ebook_2026.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Downloaded The_Motive_Ebook_2026.txt!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#181818] border border-white/15 rounded-3xl text-white shadow-2xl p-6 sm:p-10 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('download')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'download'
                ? 'bg-[#0066ff] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white bg-white/5'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Instant Download (PDF)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'bg-[#0066ff] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Chapter Previews</span>
          </button>
        </div>

        {/* TAB 1: DOWNLOAD FORM & RECEIPT */}
        {activeTab === 'download' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Cover Preview (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/20 mb-4 bg-neutral-900">
                <img
                  src={ebook.coverImage}
                  alt={ebook.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-display font-extrabold text-base text-white">
                {ebook.title}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                {ebook.pageCount} · {ebook.format}
              </p>
            </div>

            {/* Right Form / Success Area (7 cols) */}
            <div className="md:col-span-7">
              {!isSubmitted ? (
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#7fb0ff] uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" />
                    <span>Free Executive Field Guide</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                    Get Your Free Copy Now
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    Enter your email below to instantly receive the 48-page PDF edition and Notion implementation workspace. No spam, ever.
                  </p>

                  <form onSubmit={handleDownloadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                        Your Role
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-[#181818] border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                      >
                        <option value="Founder / CEO">Founder / CEO</option>
                        <option value="CMO / Marketing Director">CMO / Marketing Director</option>
                        <option value="Product / Design Leader">Product / Design Leader</option>
                        <option value="Creative Director">Creative Director</option>
                        <option value="Developer / Engineer">Developer / Engineer</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#0066ff]/30 active:scale-98 disabled:opacity-50 cursor-pointer text-sm"
                    >
                      {isSubmitting ? (
                        <span>Preparing Your Download...</span>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Unlock & Download Free PDF</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Access Granted!
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed mb-6">
                    Thank you, <strong className="text-white">{name}</strong>. A copy has been dispatched to <span className="text-[#7fb0ff] font-mono">{email}</span>.
                  </p>

                  <div className="space-y-3 max-w-xs mx-auto mb-6">
                    <button
                      type="button"
                      onClick={simulateDownloadFile}
                      className="w-full flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-bold py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Ebook (Direct PDF)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Read Chapter Previews in App</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CHAPTER PREVIEWS */}
        {activeTab === 'preview' && selectedChapter && (
          <div className="space-y-6">
            {/* Chapter selector pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/10">
              {ebook.chapters.map((ch) => (
                <button
                  key={ch.number}
                  type="button"
                  onClick={() => setSelectedChapter(ch)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedChapter.number === ch.number
                      ? 'bg-[#0066ff] text-white'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  Chapter {ch.number}
                </button>
              ))}
            </div>

            {/* Selected Chapter View */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#7fb0ff] font-mono">
                <span>MODULE {selectedChapter.number}</span>
                <span>The Motive Playbook Excerpt</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                {selectedChapter.title}
              </h3>

              <div className="text-sm text-neutral-300 italic border-l-2 border-[#0066ff] pl-3 py-1">
                "{selectedChapter.subtitle}"
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedChapter.summary}
              </p>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Core Framework Takeaways:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedChapter.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-neutral-400">
                Want all 48 pages and worksheets?
              </span>
              <button
                type="button"
                onClick={() => setActiveTab('download')}
                className="inline-flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold px-5 py-2.5 rounded-full text-xs transition-colors cursor-pointer"
              >
                <span>Download Complete Ebook</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
