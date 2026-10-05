import React from 'react';
import { ARTICLES_DATA, ArticleItem } from '../data/studioData';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface BlogSectionProps {
  onOpenArticle: (article: ArticleItem) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenArticle }) => {
  return (
    <section id="blog" className="py-24 sm:py-32 bg-[#f7f5f0] text-[#111111] border-b border-black/10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-black/10">
            <div>
              <div className="text-[#0066ff] text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] mb-3">
                Insights
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-[0.98] text-[#111111]">
                Ideas worth<br />
                sharing.
              </h2>
            </div>

            <p className="max-w-md text-neutral-600 text-sm sm:text-base leading-relaxed">
              Perspectives on brand building, UI/UX architecture, conversion optimization, and modern digital engineering.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {ARTICLES_DATA.map((article, index) => (
            <ScrollReveal
              key={article.id}
              variant="fade-up"
              delay={index * 120}
              duration={700}
              className="h-full"
            >
              <article
                onClick={() => onOpenArticle(article)}
                className="group bg-white rounded-3xl overflow-hidden border border-black/10 transition-all duration-300 hover:-translate-y-2 hover:border-[#0066ff]/50 hover:shadow-xl cursor-pointer flex flex-col justify-between h-full"
              >
                <div>
                  {/* Header Visual Plate */}
                  <div className="h-52 bg-gradient-to-br from-[#181818] via-[#111111] to-[#0052cc]/30 p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between items-center text-xs font-mono text-[#8bb5ff]">
                      <span>{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>

                    <div className="font-display font-extrabold text-sm tracking-widest text-white/40 uppercase">
                      THE MOTIVE STUDIO
                    </div>

                    {/* Corner hover glow */}
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#0066ff]/40 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                  </div>

                  {/* Article Body */}
                  <div className="p-7">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                      <span className="font-bold text-[#0066ff]">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight mb-3 group-hover:text-[#0066ff] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Read Action Footer */}
                <div className="px-7 pb-6 pt-2 flex items-center justify-between border-t border-black/5 text-xs font-bold text-neutral-900 group-hover:text-[#0066ff]">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Read full article
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

