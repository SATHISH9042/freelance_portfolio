import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Compass, MessageSquare, BookOpen, Sparkles, CheckCircle2, User } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const About: React.FC = () => {
  const valueIcons: Record<string, React.ReactNode> = {
    'Clean, Maintainable Code': <Code className="w-5 h-5 text-black" />,
    'Responsive & Accessible Interfaces': <Smartphone className="w-5 h-5 text-black" />,
    'Intuitive User Journeys': <Compass className="w-5 h-5 text-black" />,
    'Clear Communication & Reliable Delivery': <MessageSquare className="w-5 h-5 text-black" />,
    'Continuous Learning & AI Integration': <BookOpen className="w-5 h-5 text-black" />,
  };

  return (
    <section id="about" className="py-24 md:py-32 relative bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-500 font-semibold">
              Engineering Mindset
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight">
            About Me &amp; Philosophy
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-2 font-normal">
            Grounded in software discipline, empathetic product design, and continuous technical refinement.
          </p>
        </div>

        {/* Narrative & Principles Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Authentic Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/10 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-black/5">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-black/5 flex items-center justify-center text-black">
                  <User className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-black">
                    {PORTFOLIO_DATA.personal.name}
                  </h3>
                  <span className="text-xs font-mono-code text-neutral-500">
                    Full-Stack &amp; AI Engineer
                  </span>
                </div>
              </div>

              {PORTFOLIO_DATA.personal.fullBio.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-sm text-neutral-700 leading-relaxed font-normal">
                  {paragraph}
                </p>
              ))}

              <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs font-mono-code text-neutral-500">
                <span>Location: {PORTFOLIO_DATA.personal.location}</span>
                <span className="text-black font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                  Verified Developer
                </span>
              </div>
            </div>

            {/* Client Guarantee Callout */}
            <div className="p-6 rounded-2xl bg-neutral-50 border border-black/10 space-y-3">
              <span className="font-mono-code text-[11px] text-neutral-900 uppercase font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>What Working Together Looks Like</span>
              </span>
              <ul className="space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>Iterative weekly deliverables with live staging links</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>Clean Git pull requests with semantic commit messages</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>Comprehensive documentation and handover walk-throughs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Core Engineering Values (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
              Core Principles I Uphold
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTFOLIO_DATA.personal.values.map((val, idx) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-5 rounded-xl bg-white border border-black/10 hover:border-black/30 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 border border-black/5 flex items-center justify-center text-black mb-3">
                      {valueIcons[val.title] || <Code className="w-4 h-4 text-black" />}
                    </div>
                    <h4 className="font-display font-bold text-sm text-black mb-1.5">
                      {val.title}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {val.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

