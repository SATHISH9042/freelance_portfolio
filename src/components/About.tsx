import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Compass, MessageSquare, BookOpen, Sparkles, CheckCircle2, User } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const About: React.FC = () => {
  const { accentHex } = useTheme();

  const valueIcons: Record<string, React.ReactNode> = {
    'Clean, Maintainable Code': <Code className="w-5 h-5" />,
    'Responsive & Accessible Interfaces': <Smartphone className="w-5 h-5" />,
    'Intuitive User Journeys': <Compass className="w-5 h-5" />,
    'Clear Communication & Reliable Delivery': <MessageSquare className="w-5 h-5" />,
    'Continuous Learning & AI Integration': <BookOpen className="w-5 h-5" />,
  };

  return (
    <section id="about" className="py-24 md:py-32 relative bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentHex }}
            />
            <span className="text-xs font-mono-code uppercase tracking-widest text-slate-400">
              Engineering Mindset
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            About Me &amp; Philosophy
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 font-light">
            Grounded in software discipline, empathetic product design, and continuous technical refinement.
          </p>
        </div>

        {/* Narrative & Principles Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Authentic Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-midnight-900/80 border border-surface-border shadow-xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-surface-border">
                <div className="w-10 h-10 rounded-xl bg-midnight-950 border border-surface-border flex items-center justify-center text-slate-300">
                  <User className="w-5 h-5" style={{ color: accentHex }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    {PORTFOLIO_DATA.personal.name}
                  </h3>
                  <span className="text-xs font-mono-code text-slate-400">
                    Full-Stack MERN &amp; UX Craftsman
                  </span>
                </div>
              </div>

              {PORTFOLIO_DATA.personal.fullBio.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-sm text-slate-300 leading-relaxed font-light">
                  {paragraph}
                </p>
              ))}

              <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span>Location: {PORTFOLIO_DATA.personal.location}</span>
                <span className="text-emerald-400">Verified Identity</span>
              </div>
            </div>

            {/* Client Guarantee Callout */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="font-mono-code text-[11px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: accentHex }} />
                <span>What Working Together Looks Like</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Iterative weekly deliverables with live staging links</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Clean Git pull requests with semantic commit messages</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Comprehensive documentation and handover walk-throughs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Core Engineering Values (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block mb-2">
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
                  className="p-5 rounded-xl bg-midnight-900/60 border border-surface-border hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-midnight-950 border border-surface-border flex items-center justify-center text-slate-300 mb-3" style={{ color: accentHex }}>
                      {valueIcons[val.title] || <Code className="w-4 h-4" />}
                    </div>
                    <h4 className="font-display font-bold text-sm text-white mb-1.5">
                      {val.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
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
