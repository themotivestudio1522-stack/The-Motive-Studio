import React, { useState, useEffect } from 'react';
import { X, Star, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitReviewModal: React.FC<SubmitReviewModalProps> = ({ isOpen, onClose }) => {
  const { addReview } = useStudioContent();

  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('Founder / CEO');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [projectDelivered, setProjectDelivered] = useState('3D Animation & CGI');
  const [reviewText, setReviewText] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      addReview({
        clientName,
        clientRole,
        company,
        rating,
        projectDelivered,
        reviewText,
        avatarUrl: avatarUrl || undefined,
        verified: true,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  const handleReset = () => {
    setClientName('');
    setCompany('');
    setReviewText('');
    setAvatarUrl('');
    setIsSuccess(false);
    onClose();
  };

  const servicesOptions = [
    '2D Animation & Motion Graphics',
    '3D Animation & CGI',
    'Video Editing & Post-Production',
    'Reels & Viral Short-Form Content',
    'E-Book Design & Publishing Systems',
    'Brand Strategy & Identity',
    'Website Design',
    'Web Engineering & Full-Stack',
    'UI/UX Product Design',
    'Digital Marketing & Growth',
    'Data Solutions',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#181818] border border-white/15 rounded-3xl text-white shadow-2xl p-6 sm:p-9 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#7fb0ff] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" />
              <span>Client Feedback Desk</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Share Your Studio Experience
            </h3>

            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Your verified review helps ambitious founders and teams evaluate our execution quality.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating Star Selection */}
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-2">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-neutral-500 hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-neutral-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-neutral-300 ml-2 font-mono">
                    {rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    placeholder="Co-Founder & CEO"
                    value={clientRole}
                    onChange={(e) => setClientRole(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                  Company / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Kinesis Robotics"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                  Service Delivered *
                </label>
                <select
                  value={projectDelivered}
                  onChange={(e) => setProjectDelivered(e.target.value)}
                  className="w-full bg-[#181818] border border-white/15 focus:border-[#0066ff] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                >
                  {servicesOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                  Your Review & Impact Summary *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the collaboration, speed, creative output, and business results achieved..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl p-3 text-sm text-white placeholder-neutral-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                  Avatar Photo URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#0066ff]/30 active:scale-98 disabled:opacity-50 cursor-pointer text-sm mt-2"
              >
                {isSubmitting ? (
                  <span>Publishing Review...</span>
                ) : (
                  <>
                    <span>Publish Verified Review</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Review Published!
            </h3>

            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed mb-6">
              Thank you, <strong className="text-white">{clientName}</strong>. Your feedback for <strong className="text-[#7fb0ff]">{projectDelivered}</strong> has been added to our live verified reviews.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-[#0066ff] text-white text-xs font-bold hover:bg-[#0052cc] transition-colors cursor-pointer"
            >
              Done & View on Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
