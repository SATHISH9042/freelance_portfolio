import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Brain, Wrench, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const Skills: React.FC = () => {
  const { accentHex, playClickSound } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Frontend Engineering': <Code2 className="w-4 h-4 text-emerald-400" />,
    'Backend & APIs': <Server className="w-4 h-4 text-blue-400" />,
    'Databases & Storage': <Database className="w-4 h-4 text-amber-400" />,
    'AI & Machine Learning': <Brain className="w-4 h-4 text-purple-400" />,
    'Tools & Workflow': <Wrench className="w-4 h-4 text-slate-300" />,
  };

  const categories = ['All', ...PORTFOLIO_DATA.skills.map((c) => c.title)];

  const filteredCategories = PORTFOLIO_DATA.skills.filter(
    (c) => selectedCategory === 'All' || c.title === selectedCategory
  );

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: accentHex }}
              />
              <span className="text-xs font-mono-code uppercase tracking-widest text-slate-400">
                Verified Capabilities
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Skills &amp; Technology Stack
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-2 font-light">
              Technologies I confidently engineer with daily. Grounded in architectural utility—never arbitrary proficiency percentages.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-100 text-midnight-950 font-semibold shadow-md'
                    : 'bg-midnight-900 border border-surface-border text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.replace(' Engineering', '').replace(' & Storage', '').replace(' & Machine Learning', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group, gIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gIdx * 0.1 }}
              className="p-6 rounded-2xl bg-midnight-900/80 border border-surface-border hover:border-white/20 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-border">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-midnight-950 border border-surface-border">
                      {categoryIcons[group.title] || <Code2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white">
                        {group.title}
                      </h3>
                      <span className="text-[10px] font-mono-code text-slate-500">
                        {group.skills.length} core tools
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-5 leading-relaxed font-light">
                  {group.description}
                </p>

                {/* Individual Skill Badges with Architectural Purpose */}
                <div className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-midnight-950/60 border border-surface-border/70 hover:border-white/20 transition-all flex items-start gap-2.5 group"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                        style={{ backgroundColor: skill.highlight ? accentHex : '#4B5563' }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono-code font-semibold text-xs text-slate-200 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="text-[9px] font-mono-code text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                              Core
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {skill.purpose}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-3 border-t border-surface-border/60 flex items-center justify-between text-[10px] font-mono-code text-slate-500">
                <span>Production Tested</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Confidently Maintained</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
