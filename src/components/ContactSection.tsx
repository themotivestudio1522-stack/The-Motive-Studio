import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, ArrowUpRight, Instagram, Linkedin, Facebook } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { ScrollReveal } from './ScrollReveal';

interface ContactSectionProps {
  initialService?: string;
  initialMessage?: string;
  onClearInitialService?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService,
  initialMessage,
  onClearInitialService,
}) => {
  const { content } = useStudioContent();
  const { contact, branding } = content;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: initialService || 'Website Design',
    budget: '$15k – $30k',
    message: initialMessage || '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const serviceOptions = [
    'Digital Marketing',
    'Branding & Strategy',
    'Brand Identity',
    'Website Design',
    'UI/UX Design',
    'Web Development',
    'Logo Animation',
    'Data Solutions',
  ];

  const budgetOptions = ['Under $10k', '$10k – $25k', '$25k – $50k', '$50k+'];

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onClearInitialService) onClearInitialService();
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      service: 'Website Design',
      budget: '$15k – $30k',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#111111] text-white relative overflow-hidden">
      {/* Background glow accent */}
      <div
        className="absolute right-[-150px] bottom-[-100px] w-[500px] h-[500px] rounded-full blur-[190px] opacity-[0.18] pointer-events-none"
        style={{ backgroundColor: branding.accentColor || '#0066ff' }}
      />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Direct Info */}
          <ScrollReveal variant="fade-right" duration={750}>
            <div>
            <div className="text-[#7fb0ff] text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.25em] mb-3">
              {contact.label}
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] leading-[1.02] mb-5">
              {contact.headline}<br />
              <span
                className="text-[#0066ff]"
                style={{ color: branding.accentColor || '#0066ff' }}
              >
                {contact.accentWord}
              </span>
            </h2>

            <p className="text-neutral-400 text-xs sm:text-sm max-w-md leading-relaxed mb-8 font-normal">
              {contact.description}
            </p>

            {/* Direct Contact Cards with Copy */}
            <div className="space-y-4 max-w-md">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-white hover:text-[#7fb0ff] transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl bg-[#0066ff]/20 text-[#0066ff] flex items-center justify-center"
                    style={{ color: branding.accentColor || '#0066ff' }}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Email Studio</div>
                    <div className="text-sm font-bold font-mono">{contact.email}</div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(contact.email, 'email')}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-3 text-white hover:text-[#7fb0ff] transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl bg-[#0066ff]/20 text-[#0066ff] flex items-center justify-center"
                    style={{ color: branding.accentColor || '#0066ff' }}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">Direct Line / WhatsApp</div>
                    <div className="text-sm font-bold font-mono">{contact.phone}</div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(contact.phone, 'phone')}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-neutral-300">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-neutral-300 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Headquarters</div>
                  <div className="text-sm font-semibold">{contact.location}</div>
                </div>
              </div>

              {/* Direct Founder Engagement Badge */}
              <div className="p-3.5 rounded-2xl bg-[#0066ff]/10 border border-[#0066ff]/30 text-xs text-neutral-300 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0066ff] shrink-0" />
                <span>Direct Founder Access: All briefs are reviewed personally by <strong>Eman Tariq (CEO)</strong> &amp; <strong>Zara Amin Khan (Co-Founder)</strong>.</span>
              </div>

              {/* Direct Social Channels with Icons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <a
                  href={content.socials?.instagram || 'https://www.instagram.com/themotivestudio1522/'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066ff] hover:bg-white/10 text-xs font-bold text-white transition-all cursor-pointer group"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-[#7fb0ff]" />
                    <span>Instagram</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7fb0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={content.socials?.linkedin || 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B6nDsZNWyQherCT0HW%2B%2FclA%3D%3D'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066ff] hover:bg-white/10 text-xs font-bold text-white transition-all cursor-pointer group"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#7fb0ff]" />
                    <span>LinkedIn</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7fb0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={content.socials?.facebook || 'https://www.facebook.com/profile.php?id=61594971998869'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066ff] hover:bg-white/10 text-xs font-bold text-white transition-all cursor-pointer group"
                >
                  <span className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-[#7fb0ff]" />
                    <span>Facebook</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7fb0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Right Column: High-Polish Form or Submitted Confirmation */}
          <ScrollReveal variant="fade-left" duration={750} delay={120}>
            <div className="bg-[#181818] border border-white/10 rounded-3xl p-7 sm:p-10 shadow-2xl relative">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    What can we help you create?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceOptions.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: svc })}
                        className={`text-xs font-medium py-2 px-3 rounded-lg border text-left truncate transition-colors cursor-pointer ${
                          formData.service === svc
                            ? 'border-[#0066ff] bg-[#0066ff]/20 text-white font-bold'
                            : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/25'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Your Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Studio Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Estimated Budget Bracket
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((bgt) => (
                      <button
                        key={bgt}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: bgt })}
                        className={`text-xs py-2 px-2 text-center rounded-lg border transition-colors cursor-pointer ${
                          formData.budget === bgt
                            ? 'border-[#0066ff] bg-[#0066ff]/20 text-white font-bold'
                            : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/20'
                        }`}
                      >
                        {bgt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Project Overview & Goals *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your brand, current challenges, desired timeline, or any specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl p-4 text-sm text-white placeholder-neutral-500 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#0066ff]/30 active:scale-98 disabled:opacity-50 cursor-pointer text-sm"
                  style={{ backgroundColor: branding.accentColor || '#0066ff' }}
                >
                  {isSubmitting ? (
                    <span>Sending Proposal Brief...</span>
                  ) : (
                    <>
                      <span>Send Project Brief</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-12 px-4 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <h3 className="font-display text-3xl font-bold text-white mb-3">
                  Brief Received!
                </h3>

                <p className="text-neutral-300 text-sm max-w-sm mx-auto leading-relaxed mb-6">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our principal creative directors have received your inquiry for <strong className="text-[#7fb0ff]">{formData.service}</strong>.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left text-xs max-w-xs mx-auto mb-8 space-y-2">
                  <div className="flex justify-between text-neutral-400">
                    <span>Contact:</span>
                    <span className="text-white font-mono">{formData.email}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Budget Scope:</span>
                    <span className="text-white">{formData.budget}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Response Time:</span>
                    <span className="text-emerald-400 font-semibold">&lt; 24 Hours</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full border border-white/20 hover:border-white text-xs font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
