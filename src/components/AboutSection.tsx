import React from 'react';
import { Sparkles, ShieldCheck, Mail, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { LEADERSHIP_DATA } from '../data/studioData';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  const { content } = useStudioContent();
  const { about, branding } = content;

  const pillars = [
    {
      num: '01',
      title: 'Creative Direction',
      desc: 'Bespoke aesthetic systems engineered to command prestige and market positioning.'
    },
    {
      num: '02',
      title: 'Digital Experience',
      desc: 'Intuitive, sub-second latency user journeys designed to eliminate cognitive friction.'
    },
    {
      num: '03',
      title: 'Growth Mindset',
      desc: 'Relentless focus on commercial metrics: conversions, pipeline, and retained customer value.'
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#f7f5f0] text-[#111111]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Top Split: Manifesto & 3 Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pb-20 border-b border-black/10">
          {/* Left Column: Big Statement */}
          <ScrollReveal variant="fade-right" duration={750}>
            <div>
              <div className="text-[#0066ff] text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.25em] mb-3">
                {about.label}
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.02] text-[#111111] mb-5">
                {about.headline}<br />
                <span
                  className="text-[#0066ff]"
                  style={{ color: branding.accentColor || '#0066ff' }}
                >
                  {about.subheadline}
                </span>
              </h2>

              <div className="p-5 rounded-2xl bg-white border border-black/10 mt-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#0066ff]" />
                  <span className="font-bold text-xs sm:text-sm text-neutral-900">Direct Senior-Level Collaboration</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {about.pillNotice}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Narrative & 3 Pillars */}
          <div className="space-y-6">
            <ScrollReveal variant="fade-left" duration={750} delay={100}>
              <div className="space-y-3.5 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                <p>{about.p1}</p>
                <p>{about.p2}</p>
              </div>
            </ScrollReveal>

            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t-2 border-[#111111]">
              {pillars.map((pillar, idx) => (
                <ScrollReveal
                  key={pillar.num}
                  variant="fade-up"
                  delay={150 + idx * 100}
                  duration={650}
                >
                  <div className="space-y-2">
                    <div className="font-mono text-2xl font-black text-[#111111] flex items-center justify-between">
                      <span>{pillar.num}</span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: branding.accentColor || '#0066ff' }}
                      />
                    </div>
                    <strong className="block text-sm font-bold text-neutral-900 tracking-tight">
                      {pillar.title}
                    </strong>
                    <p className="text-xs text-neutral-600 leading-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Executive Leadership & Founders Section */}
        <div className="pt-20">
          <ScrollReveal variant="fade-up" duration={700}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 text-[#0066ff] text-xs font-mono font-bold tracking-[0.25em] uppercase mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Executive Leadership</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">
                  Guided by Founders.<br />
                  Engineered with Obsession.
                </h3>
              </div>
              <p className="text-neutral-600 text-xs sm:text-sm max-w-md leading-relaxed">
                At The Motive Studio, our founders stay actively immersed in client deliverables, ensuring high strategic rigor and world-class craft across every project.
              </p>
            </div>
          </ScrollReveal>

          {/* Founders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LEADERSHIP_DATA.map((leader, idx) => (
              <ScrollReveal
                key={leader.id}
                variant="fade-up"
                delay={idx * 150}
                duration={750}
              >
                <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                  {/* Subtle decorative background gradient */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-[#0066ff]/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125" />

                  <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                      {/* Initials Avatar Monogram */}
                      <div className="w-16 h-16 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-display font-black text-xl shadow-md group-hover:bg-[#0066ff] transition-colors duration-300">
                        {leader.initials}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#0066ff]/10 text-[#0066ff] text-[11px] font-mono font-extrabold tracking-wider uppercase">
                            {leader.role}
                          </span>
                        </div>
                        <h4 className="font-display text-2xl font-black text-[#111111] mt-1 group-hover:text-[#0066ff] transition-colors">
                          {leader.name}
                        </h4>
                        <div className="text-xs font-semibold text-neutral-500">
                          {leader.title}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed mb-6 relative z-10">
                    {leader.bio}
                  </p>

                  {/* Core Responsibilities */}
                  <div className="space-y-2 mb-6 pt-5 border-t border-black/5 relative z-10">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                      Key Directorial Focus:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {leader.responsibilities.map((resp) => (
                        <div key={resp} className="flex items-center gap-1.5 text-xs text-neutral-800 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0066ff] shrink-0" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Founder Quote */}
                  <div className="p-4 rounded-2xl bg-[#f7f5f0] border border-black/5 text-xs italic text-neutral-600 leading-relaxed relative z-10">
                    "{leader.quote}"
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

