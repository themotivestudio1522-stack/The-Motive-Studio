import React, { useEffect } from 'react';
import { ArticleItem } from '../data/studioData';
import { X, CheckCircle2, Clock, Share2, ArrowRight } from 'lucide-react';

interface ArticleModalProps {
  article: ArticleItem | null;
  onClose: () => void;
  onStartConversation: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onStartConversation,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#181818] border border-white/15 rounded-3xl text-white shadow-2xl p-6 sm:p-10 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Time */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7fb0ff] uppercase tracking-wider mb-3">
          <span>{article.category}</span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1 text-neutral-400">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug mb-6">
          {article.title}
        </h2>

        {/* Lead Excerpt */}
        <div className="text-base sm:text-lg text-neutral-300 font-medium italic border-l-2 border-[#0066ff] pl-4 mb-8 leading-relaxed">
          "{article.excerpt}"
        </div>

        {/* Article Paragraphs */}
        <div className="space-y-5 text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Strategic Takeaways Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#7fb0ff] mb-3">
            Key Strategic Takeaways
          </h4>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((takeaway) => (
              <li key={takeaway} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Author / Studio Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            Published by <strong className="text-white">The Motive Studio Editorial Desk</strong>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onStartConversation();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <span>Discuss This With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
