import React, { useState } from 'react';
import { PROCESS_DATA } from '../data/studioData';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('01');

  return (
    <section id="process" className="py-24 sm:py-32 bg-white text-[#111111] border-b border-black/10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="mb-14 pb-8 border-b border-black/10">
            <div className="text-[#0066ff] text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] mb-3">
              Our Process
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-[0.98] text-[#111111]">
              Simple process.<br />
              Serious results.
            </h2>
          </div>
        </ScrollReveal>

        {/* Process List */}
        <div className="divide-y divide-black/10 border-t border-black/10">
          {PROCESS_DATA.map((step, index) => {
            const isOpen = activeStep === step.number;
            return (
              <ScrollReveal
                key={step.number}
                variant="fade-up"
                delay={index * 90}
                duration={650}
              >
                <div
                  className="py-6 sm:py-8 transition-colors duration-150 hover:bg-[#f7f5f0]/50 px-2 sm:px-4 rounded-xl cursor-pointer"
                  onClick={() => setActiveStep(isOpen ? '' : step.number)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Step Num & Title */}
                    <div className="flex items-center gap-6 sm:gap-10">
                      <span className="font-mono text-xl sm:text-2xl font-black text-[#0066ff] tabular-nums">
                        {step.number}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                        {step.title}
                      </h3>
                    </div>

                    {/* Summary */}
                    <p className="text-neutral-600 text-sm sm:text-base max-w-xl leading-relaxed sm:px-4">
                      {step.description}
                    </p>

                    {/* Expand Indicator */}
                    <div className="self-end sm:self-center flex items-center gap-2 text-xs font-semibold text-neutral-500">
                      <span className="hidden md:inline font-mono">{step.duration}</span>
                      <div className={`w-8 h-8 rounded-full border border-black/10 flex items-center justify-center transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#111111] text-white' : 'bg-white text-black'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details Drawer */}
                  {isOpen && (
                    <div className="mt-6 pt-6 border-t border-black/5 pl-12 sm:pl-16 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#0066ff] mb-2">
                          Strategic Focus
                        </div>
                        <p className="text-sm text-neutral-700 font-medium">
                          {step.tagline}
                        </p>
                      </div>

                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                          Deliverables & Checkpoints
                        </div>
                        <ul className="space-y-1.5">
                          {step.activities.map((act) => (
                            <li key={act} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0066ff] shrink-0" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

