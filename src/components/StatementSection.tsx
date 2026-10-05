import React, { useState } from 'react';
import { Target, Zap, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const StatementSection: React.FC = () => {
  const principles = [
    {
      title: 'Execution Over Talk',
      detail: 'Strategy without pixel-perfect delivery and performance engineering is mere hallucination.'
    },
    {
      title: 'Design Drives Revenue',
      detail: 'Aesthetics elevate customer perception, compress sales cycles, and defend pricing power.'
    },
    {
      title: 'Zero Bloat Architecture',
      detail: 'Fast, accessible, and intuitive software engineered for durability and growth.'
    }
  ];

  const [activePrinciple, setActivePrinciple] = useState(0);

  return (
    <section className="bg-[#111111] text-white py-28 sm:py-36 relative overflow-hidden border-y border-white/10">
      {/* Background accent lines */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0066ff 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 text-center relative z-10">
        <ScrollReveal variant="fade-up" duration={600}>
          <div className="inline-block text-[#7fb0ff] text-xs font-mono font-bold tracking-[0.3em] uppercase mb-6">
            Studio Philosophy
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-[100px] font-black tracking-[-0.05em] leading-[0.94] mb-12">
            Ideas are easy.<br />
            <span className="text-[#0066ff]">Execution wins.</span>
          </h2>
        </ScrollReveal>

        {/* Interactive Principle Switcher */}
        <ScrollReveal variant="zoom-in" delay={200} duration={750}>
          <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mb-6">
              {principles.map((p, idx) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setActivePrinciple(idx)}
                  className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all duration-150 cursor-pointer ${
                    activePrinciple === idx
                      ? 'bg-[#0066ff] text-white shadow-md shadow-[#0066ff]/30'
                      : 'text-neutral-400 hover:text-white bg-white/5'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            <p className="text-neutral-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              "{principles[activePrinciple].detail}"
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 text-xs font-mono text-neutral-400">
              Directorial Creed · <span className="text-white font-bold">Eman Tariq (CEO)</span> &amp; <span className="text-white font-bold">Zara Amin Khan (Co-Founder)</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

