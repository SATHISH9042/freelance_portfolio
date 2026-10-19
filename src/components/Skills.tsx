import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Brain, Wrench, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const Skills: React.FC = () => {
  const { playClickSound } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Frontend Engineering': <Code2 className="w-4 h-4 text-black" />,
    'Backend & APIs': <Server className="w-4 h-4 text-black" />,
    'Databases & Storage': <Database className="w-4 h-4 text-black" />,
    'AI & Machine Learning': <Brain className="w-4 h-4 text-black" />,
    'Tools & Workflow': <Wrench className="w-4 h-4 text-black" />,
  };

  const categories = ['All', ...PORTFOLIO_DATA.skills.map((c) => c.title)];

  const filteredCategories = PORTFOLIO_DATA.skills.filter(
    (c) => selectedCategory === 'All' || c.title === selectedCategory
  );

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-500 font-semibold">
                Verified Capabilities
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight">
              Skills &amp; Technology Stack
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-xl mt-2 font-normal">
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
                    ? 'bg-black text-white font-semibold shadow-sm'
                    : 'bg-white border border-black/10 text-neutral-600 hover:text-black hover:border-black/30'
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
              transition={{ duration: 0.5, delay: gIdx * 0.08 }}
              className="p-6 rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-neutral-100 border border-black/5">
                      {categoryIcons[group.title] || <Code2 className="w-4 h-4 text-black" />}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-black">
                        {group.title}
                      </h3>
                      <span className="text-[10px] font-mono-code text-neutral-500">
                        {group.skills.length} core tools
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 mb-5 leading-relaxed font-normal">
                  {group.description}
                </p>

                {/* Individual Skill Badges with Architectural Purpose */}
                <div className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-neutral-50 border border-black/5 hover:border-black/20 transition-all flex items-start gap-2.5 group"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                          skill.highlight ? 'bg-black' : 'bg-neutral-400'
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono-code font-semibold text-xs text-neutral-900 group-hover:text-black transition-colors">
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="text-[9px] font-mono-code text-neutral-800 bg-black/5 px-1.5 py-0.5 rounded font-medium">
                              Core
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                          {skill.purpose}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-3 border-t border-black/5 flex items-center justify-between text-[10px] font-mono-code text-neutral-500">
                <span>Production Tested</span>
                <span className="flex items-center gap-1 text-black font-medium">
                  <CheckCircle2 className="w-3 h-3 text-black" />
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
