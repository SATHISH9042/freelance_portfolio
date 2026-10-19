import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, BookOpen, CheckCircle2, Terminal, ExternalLink, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { SaffronLeafPreview } from './project-previews/SaffronLeafPreview';
import { FinanceTrackerPreview } from './project-previews/FinanceTrackerPreview';
import { CollegeChatbotPreview } from './project-previews/CollegeChatbotPreview';
import { CustomerSupportPreview } from './project-previews/CustomerSupportPreview';
import { RestaurantWebsitePreview } from './project-previews/RestaurantWebsitePreview';
import { CaseStudyModal } from './CaseStudyModal';

interface ProjectsProps {
  onOpenAllProjects?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenAllProjects }) => {
  const { playClickSound, playPopSound } = useTheme();
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'Frontend & UI/UX', 'AI & LLMs'];

  const filteredProjects = PORTFOLIO_DATA.projects.filter(
    (p) => filterCategory === 'All' || p.category === filterCategory
  );

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return PORTFOLIO_DATA.projects.length;
    return PORTFOLIO_DATA.projects.filter((p) => p.category === cat).length;
  };

  // Show a maximum of 4 projects in the main section per user request
  const displayedProjects = filteredProjects.slice(0, 4);

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
      case 'restaurant-website':
        return <RestaurantWebsitePreview />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-500 font-semibold">
                Editorial Case Studies
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight">
              Selected Projects
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-xl mt-2 font-light leading-relaxed">
              High-impact digital products crafted with full-stack engineering resilience, intelligent AI integrations, and conversion-focused UX psychology.
            </p>
          </div>

          {/* Right Header Area: All Projects Button & Filter Pills */}
          <div className="flex flex-col items-start md:items-end gap-3.5">
            {/* Dedicated Action Button Above Filters to Open All Projects Page */}
            {onOpenAllProjects && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenAllProjects();
                }}
                className="px-4 py-2 rounded-full text-xs font-bold bg-neutral-900 text-white hover:bg-black transition-all flex items-center gap-2 group shadow-sm hover:ring-2 hover:ring-black/20 cursor-pointer"
              >
                <span>View All Projects Archive</span>
                <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono-code">
                  {PORTFOLIO_DATA.projects.length} Total
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}

            {/* Category Filter Pills with Live Project Counts */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const count = getCategoryCount(cat);
                const isActive = filterCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      playClickSound();
                      setFilterCategory(cat);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-black text-white font-bold shadow-md'
                        : 'bg-white border border-black/10 text-neutral-600 hover:text-black hover:border-black/30'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Filter Indicator & Count (mentioning subtopic count and overall count e.g. "2 of 5 Projects") */}
        <div className="mb-12 flex items-center justify-between text-xs font-mono-code text-neutral-500 pb-3 border-b border-black/10">
          <span>
            {filterCategory === 'All' ? (
              <>
                Displaying <strong className="text-black">{displayedProjects.length} of {PORTFOLIO_DATA.projects.length}</strong> Featured Projects
              </>
            ) : (
              <>
                Displaying <strong className="text-black">{displayedProjects.length} of {PORTFOLIO_DATA.projects.length}</strong> Projects &bull; <span className="text-black font-semibold">{filterCategory}</span> ({displayedProjects.length} {displayedProjects.length === 1 ? 'project' : 'projects'})
              </>
            )}
          </span>
          <span className="text-neutral-400 hidden sm:inline">
            Curated featured selection &bull; Max 4 displayed
          </span>
        </div>

        {/* Project Case Studies List (max 4 on main page) */}
        <div className="space-y-24 md:space-y-32">
          {displayedProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const projectNumber = `0${index + 1}`;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
              >
                {/* Visual Preview / Interactive Device Mockup (7 cols) */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative group">
                    {/* Layered browser window */}
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="rounded-2xl bg-white border border-black/10 p-2 sm:p-3 shadow-xl shadow-black/[0.04] transition-all hover:border-black/25"
                    >
                      {/* Browser Chrome Header */}
                      <div className="px-3 py-2 flex items-center justify-between border-b border-black/5 mb-2.5 bg-neutral-50/80 rounded-t-xl">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 shadow-xs inline-block" title="Close" />
                          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 shadow-xs inline-block" title="Minimize" />
                          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 shadow-xs inline-block" title="Maximize" />
                        </div>
                        <div className="px-3 py-0.5 rounded-md bg-white border border-black/5 text-[10px] font-mono-code text-neutral-600 max-w-xs truncate shadow-2xs font-medium">
                          {project.liveUrl || project.blogUrl || `https://${project.id}.dev`}
                        </div>
                        <span className="text-[10px] font-mono-code text-neutral-400 hidden sm:inline">
                          Interactive Preview
                        </span>
                      </div>

                      {/* Embedded Interactive Mockup Component */}
                      <div className="w-full min-h-[380px] flex items-center justify-center">
                        {renderMockup(project.id)}
                      </div>
                    </motion.div>

                    {/* Interactive hint tag */}
                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono-code text-neutral-400 px-1">
                      <span className="flex items-center gap-1.5 text-neutral-600">
                        <Terminal className="w-3.5 h-3.5 text-black" />
                        <span>Try clicking and interacting with the UI directly above</span>
                      </span>
                      <span className="text-neutral-400">Live Client Simulation</span>
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
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code font-bold text-sm sm:text-base text-black bg-neutral-100 border border-black/10 px-2.5 py-0.5 rounded-md">
                          {index + 1} of {displayedProjects.length}
                        </span>
                        <span className="text-[11px] font-mono-code text-neutral-500 font-medium">
                          {filterCategory === 'All' ? project.category : filterCategory}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono-code bg-neutral-100 border border-black/10 text-neutral-800 font-semibold">
                        {project.badge}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-black tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm font-light text-neutral-600 mb-6 leading-relaxed">
                      {project.subtitle}
                    </p>

                    {/* Problem & Objective Micro-Callout */}
                    <div className="p-4 rounded-xl bg-neutral-50 border border-black/5 mb-6 space-y-3">
                      <div>
                        <span className="text-[10px] font-mono-code uppercase tracking-wider text-neutral-900 block mb-0.5 font-bold">
                          Problem Solved
                        </span>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-black/5">
                        <span className="text-[10px] font-mono-code uppercase tracking-wider text-black block mb-0.5 font-bold">
                          Objective &amp; Result
                        </span>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {project.objective}
                        </p>
                      </div>
                    </div>

                    {/* Key Implemented Features List */}
                    <div className="mb-6 space-y-2">
                      <span className="text-[11px] font-mono-code uppercase text-neutral-400 block mb-1 font-semibold">
                        Key Features &amp; Capabilities
                      </span>
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-black" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actual Contribution */}
                    <div className="mb-6 p-3 rounded-lg bg-white border border-black/10 text-xs text-neutral-700">
                      <span className="font-mono-code text-[10px] text-neutral-900 block mb-1 uppercase font-bold">
                        My Direct Engineering Contribution
                      </span>
                      <p className="leading-relaxed text-neutral-600">{project.myContribution}</p>
                    </div>

                    {/* Technology Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech.name}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono-code bg-neutral-100 border border-black/5 text-neutral-800"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/10">
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    )}

                    {project.blogUrl && (
                      <motion.a
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.blogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <span>Read Medium Article</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playPopSound();
                        setSelectedCaseStudy(project);
                      }}
                      className="px-5 py-3 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-black border border-black/10 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Case Study Dossier</span>
                    </motion.button>

                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-full text-xs font-semibold bg-white hover:bg-neutral-50 border border-black/15 text-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
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

        {/* Bottom CTA to View All Projects Page */}
        {onOpenAllProjects && (
          <div className="mt-20 pt-10 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-neutral-50 p-6 sm:p-8 rounded-2xl">
            <div>
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-neutral-500 font-bold block mb-1">
                Full Portfolio Catalog
              </span>
              <h4 className="font-display font-bold text-lg sm:text-xl text-black">
                Looking for more project case studies?
              </h4>
              <p className="text-xs text-neutral-600 mt-1 max-w-xl">
                Explore the complete archive of {PORTFOLIO_DATA.projects.length} full-stack applications, AI workflows, and commercial websites with live deployments and source code.
              </p>
            </div>
            <button
              onClick={() => {
                playClickSound();
                onOpenAllProjects();
              }}
              className="px-6 py-3 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
            >
              <span>Explore All {PORTFOLIO_DATA.projects.length} Projects in Full Archive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Case Study Full Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};
