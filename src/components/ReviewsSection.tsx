import React, { useState } from 'react';
import { useStudioContent } from '../context/StudioContentContext';
import { Star, CheckCircle2, MessageSquare, Plus, Quote, Sparkles } from 'lucide-react';
import { ReviewItem } from '../data/studioData';
import { ScrollReveal } from './ScrollReveal';

interface ReviewsSectionProps {
  onOpenSubmitModal: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenSubmitModal }) => {
  const { content } = useStudioContent();
  const reviews = content.reviews || [];

  const [activeFilter, setActiveFilter] = useState<'all' | 'video-motion' | 'brand-web'>('all');

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'video-motion') {
      return (
        r.projectDelivered.toLowerCase().includes('animation') ||
        r.projectDelivered.toLowerCase().includes('reels') ||
        r.projectDelivered.toLowerCase().includes('video')
      );
    }
    if (activeFilter === 'brand-web') {
      return (
        r.projectDelivered.toLowerCase().includes('brand') ||
        r.projectDelivered.toLowerCase().includes('book') ||
        r.projectDelivered.toLowerCase().includes('web') ||
        r.projectDelivered.toLowerCase().includes('ui')
      );
    }
    return true;
  });

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-[#f7f5f0] text-[#111111] border-b border-black/10 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-7 border-b border-black/10">
            <div>
              <div className="inline-flex items-center gap-2 text-[#0066ff] text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.25em] mb-2.5">
                <Sparkles className="w-4 h-4 text-[#0066ff]" />
                <span>Verified Client Proof</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.02] text-[#111111]">
                Trusted by visionaries.<br />
                <span
                  className="text-[#0066ff]"
                  style={{ color: content.branding.accentColor || '#0066ff' }}
                >
                  Proven execution.
                </span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-white border border-black/10 shadow-sm flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <div className="text-xs">
                  <strong className="text-xs sm:text-sm font-bold text-neutral-900 mr-1.5 font-mono">4.95 / 5</strong>
                  <span className="text-neutral-500 text-[11px]">({reviews.length}+ reviews)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenSubmitModal}
                className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white px-5 py-3 rounded-full text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 text-[#0066ff]" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal variant="fade-up" delay={100} duration={650}>
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'all', label: 'All Testimonials' },
              { id: 'video-motion', label: '3D/2D Animation & Video' },
              { id: 'brand-web', label: 'Branding, Ebooks & Web' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  activeFilter === cat.id
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-white border border-black/10 text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev, index) => (
            <ScrollReveal
              key={rev.id}
              variant="fade-up"
              delay={(index % 3) * 100}
              duration={700}
              className="h-full"
            >
              <div
                className="group bg-white rounded-3xl p-7 border border-black/10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#0066ff]/50 hover:shadow-xl flex flex-col justify-between h-full"
              >
                <div>
                  {/* Rating & Verified Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>

                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Client</span>
                      </span>
                    )}
                  </div>

                  {/* Delivered Service Badge */}
                  <div className="text-xs font-mono font-bold text-[#0066ff] uppercase tracking-wider mb-3">
                    {rev.projectDelivered}
                  </div>

                  {/* Review Text */}
                  <p className="text-neutral-700 text-sm leading-relaxed mb-6 font-normal">
                    "{rev.reviewText}"
                  </p>
                </div>

                {/* Author & Company Footer */}
                <div className="pt-4 border-t border-black/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#111111] text-white font-bold flex items-center justify-center text-sm shrink-0 overflow-hidden border border-black/10">
                    {rev.avatarUrl ? (
                      <img
                        src={rev.avatarUrl}
                        alt={rev.clientName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span>{rev.clientName.charAt(0)}</span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-sm text-neutral-900 leading-tight">
                      {rev.clientName}
                    </h4>
                    <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">
                      {rev.clientRole} · <strong className="text-neutral-700 font-semibold">{rev.company}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

