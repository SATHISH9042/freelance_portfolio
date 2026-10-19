import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, BookOpen, CheckCircle2, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { SaffronLeafPreview } from './project-previews/SaffronLeafPreview';
import { FinanceTrackerPreview } from './project-previews/FinanceTrackerPreview';
import { CollegeChatbotPreview } from './project-previews/CollegeChatbotPreview';
import { CustomerSupportPreview } from './project-previews/CustomerSupportPreview';
import { CaseStudyModal } from './CaseStudyModal';

export const Projects: React.FC = () => {
  const { accentHex, playClickSound, playPopSound } = useTheme();
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'Frontend & UI/UX', 'AI & LLMs'];

  const filteredProjects = PORTFOLIO_DATA.projects.filter(
    (p) => filterCategory === 'All' || p.category === filterCategory
  );

  const renderMockup = (projectId: string) => {
    switch (projectId) {
      case 'saffron-leaf':
        return <SaffronLeafPreview />;
      case 'finance-tracker':
        return <FinanceTrackerPreview />;
      case 'college-chatbot':
        return <CollegeChatbotPreview />;
      case 'customer-support-agent':
        return <CustomerSupportPreview />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative bg-grain">
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
                Editorial Case Studies
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Selected Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-2 font-light">
              High-impact digital products crafted with MERN stack resilience, intelligent AI integrations, and conversion-focused UX psychology.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setFilterCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all ${
                  filterCategory === cat
                    ? 'bg-slate-100 text-midnight-950 font-semibold shadow-md'
                    : 'bg-midnight-900 border border-surface-border text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Case Studies List */}
        <div className="space-y-24 md:space-y-32">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const projectNumber = `0${index + 1}`;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                {/* Visual Preview / Interactive Device Mockup (7 cols) */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative group">
                    {/* Layered browser window with dynamic theme hover glow */}
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="rounded-2xl bg-midnight-900/90 border border-surface-border p-2 sm:p-3 shadow-2xl transition-all duration-300 hover:border-white/25"
                      style={{
                        boxShadow: `0 20px 40px -15px ${accentHex}15`,
                      }}
                    >
                      {/* Browser Chrome Header */}
                      <div className="px-3 py-2 flex items-center justify-between border-b border-surface-border/80 mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="px-3 py-0.5 rounded-md bg-midnight-950 border border-surface-border text-[10px] font-mono-code text-slate-400 max-w-xs truncate">
                          https://{project.id}.portfolio.app
                        </div>
                        <span className="text-[10px] font-mono-code text-slate-500 hidden sm:inline">
                          Interactive Preview
                        </span>
                      </div>

                      {/* Embedded Interactive Mockup Component */}
                      <div className="w-full min-h-[380px] flex items-center justify-center">
                        {renderMockup(project.id)}
                      </div>
                    </motion.div>

                    {/* Interactive hint tag */}
                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono-code text-slate-500 px-1">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Terminal className="w-3.5 h-3.5" style={{ color: accentHex }} />
                        <span>Try clicking and interacting with the UI directly above</span>
                      </span>
                      <span className="text-slate-500">Live Client Simulation</span>
                    </div>
                  </div>
                </div>

                {/* Editorial Case Study Content (5 cols) */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div>
                    {/* Numeral and Category */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono-code font-bold text-2xl text-slate-600">
                        {projectNumber}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono-code bg-white/5 border border-white/10 text-slate-300">
                        {project.badge}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm font-light text-slate-300 mb-6 leading-relaxed">
                      {project.subtitle}
                    </p>

                    {/* Problem & Objective Micro-Callout */}
                    <div className="p-4 rounded-xl bg-midnight-900/60 border border-surface-border mb-6 space-y-3">
                      <div>
                        <span className="text-[10px] font-mono-code uppercase tracking-wider text-rose-400 block mb-0.5">
                          Problem Solved
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-surface-border/60">
                        <span className="text-[10px] font-mono-code uppercase tracking-wider text-emerald-400 block mb-0.5">
                          Objective &amp; Result
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {project.objective}
                        </p>
                      </div>
                    </div>

                    {/* Key Implemented Features List */}
                    <div className="mb-6 space-y-2">
                      <span className="text-[11px] font-mono-code uppercase text-slate-400 block mb-1">
                        Key Features &amp; Capabilities
                      </span>
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: project.accentColor || accentHex }}
                          />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actual Contribution */}
                    <div className="mb-6 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                      <span className="font-mono-code text-[10px] text-slate-400 block mb-1 uppercase font-semibold">
                        My Direct Engineering Contribution
                      </span>
                      <p className="leading-relaxed">{project.myContribution}</p>
                    </div>

                    {/* Technology Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech.name}
                          className="px-2.5 py-1 rounded text-[11px] font-mono-code bg-midnight-900 border border-surface-border text-slate-300"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-surface-border">
                    <motion.button
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playPopSound();
                        setSelectedCaseStudy(project);
                      }}
                      className="px-5 py-2.5 rounded-full text-xs font-bold text-midnight-950 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                      style={{ backgroundColor: accentHex }}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Case Study Dossier</span>
                    </motion.button>

                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-full text-xs font-medium bg-midnight-900 hover:bg-white/10 border border-surface-border hover:border-white/20 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Case Study Full Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};
