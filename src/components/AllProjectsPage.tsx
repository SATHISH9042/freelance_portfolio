import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Github, BookOpen, ExternalLink, Terminal, Filter, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { CaseStudyModal } from './CaseStudyModal';
import { CollegeChatbotPreview } from './project-previews/CollegeChatbotPreview';
import { CustomerSupportPreview } from './project-previews/CustomerSupportPreview';
import { FinanceTrackerPreview } from './project-previews/FinanceTrackerPreview';
import { SaffronLeafPreview } from './project-previews/SaffronLeafPreview';
import { RestaurantWebsitePreview } from './project-previews/RestaurantWebsitePreview';

interface AllProjectsPageProps {
  onBackToHome: () => void;
}

export const AllProjectsPage: React.FC<AllProjectsPageProps> = ({ onBackToHome }) => {
  const { playClickSound, playPopSound } = useTheme();
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Full-Stack', 'Frontend & UI/UX', 'AI & LLMs'];

  const filteredProjects = PORTFOLIO_DATA.projects.filter((project) => {
    const matchesCategory = filterCategory === 'All' || project.category === filterCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.subtitle.toLowerCase().includes(query) ||
      project.summary.toLowerCase().includes(query) ||
      project.techStack.some((t) => t.name.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return PORTFOLIO_DATA.projects.length;
    return PORTFOLIO_DATA.projects.filter((p) => p.category === cat).length;
  };

  const renderMockup = (projectId: string) => {
    switch (projectId) {
      case 'college-chatbot':
        return <CollegeChatbotPreview />;
      case 'customer-support-agent':
        return <CustomerSupportPreview />;
      case 'saffron-leaf':
        return <SaffronLeafPreview />;
      case 'finance-tracker':
        return <FinanceTrackerPreview />;
      case 'restaurant-website':
        return <RestaurantWebsitePreview />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => {
              playClickSound();
              onBackToHome();
            }}
            className="px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-black hover:text-white text-black text-xs font-mono-code transition-all flex items-center gap-2 group cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span className="font-display font-bold text-xs tracking-wider uppercase text-black">
              {PORTFOLIO_DATA.personal.name} &bull; All Projects
            </span>
          </div>

          <a
            href="#contact"
            onClick={() => {
              playClickSound();
              onBackToHome();
              setTimeout(() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-black text-white hover:bg-neutral-800 transition-colors shadow-sm"
          >
            Contact Me
          </a>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Page Title & Intro */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-500 font-semibold">
              Complete Portfolio &bull; All Works Archive
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-black tracking-tight mb-4">
            All Projects &amp; Case Studies
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
            A comprehensive catalog of full-stack web applications, AI &amp; MCP workflows, interaction design systems, and responsive commercial websites. Every project is built with clean architecture, tested usability, and verifiable source code.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mb-14 p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          {/* Category Filter Pills with Live Counts */}
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
                      ? 'bg-black text-white font-bold shadow-sm'
                      : 'bg-white border border-black/10 text-neutral-600 hover:text-black hover:border-black/30'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-neutral-200 text-neutral-800 font-semibold'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects by tech, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-black/15 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        {/* Projects Count Display (mentioning subtopic count and overall count: e.g. "2 of 5 Projects") */}
        <div className="mb-8 flex items-center justify-between text-xs font-mono-code text-neutral-500 pb-3 border-b border-black/10">
          <span>
            {filterCategory === 'All' ? (
              <>
                Displaying all <strong className="text-black">{filteredProjects.length} of {PORTFOLIO_DATA.projects.length}</strong> Total Projects
              </>
            ) : (
              <>
                Displaying <strong className="text-black">{filteredProjects.length} of {PORTFOLIO_DATA.projects.length}</strong> Projects &bull; <span className="text-black font-semibold">{filterCategory}</span> ({filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'})
              </>
            )}
          </span>
          <span className="hidden sm:inline">
            Each preview includes live interactive simulations &amp; verified links
          </span>
        </div>

        {/* Projects List */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-neutral-50 border border-black/10 space-y-3">
            <Filter className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className="font-display font-bold text-base text-black">No matching projects found</h3>
            <p className="text-xs text-neutral-500">
              Try adjusting your search query or switching category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('All');
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-black text-white hover:bg-neutral-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-24">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <article
                  key={project.id}
                  id={project.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pt-6"
                >
                  {/* Visual Preview / Interactive Device Mockup (7 cols) */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative group">
                      {/* Layered macOS window container */}
                      <div className="rounded-2xl bg-white border border-black/10 p-2 sm:p-3 shadow-xl shadow-black/[0.04] transition-all hover:border-black/25">
                        {/* Browser Chrome Header with authentic Mac closing dots */}
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
                      </div>

                      {/* Interactive hint tag */}
                      <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono-code text-neutral-400 px-1">
                        <span className="flex items-center gap-1.5 text-neutral-600">
                          <Terminal className="w-3.5 h-3.5 text-black" />
                          <span>Interactive simulation &bull; Try clicking inside the mockup</span>
                        </span>
                        <span className="text-neutral-400">Verified Work</span>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Case Study Content (5 cols) */}
                  <div className={`lg:col-span-5 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      {/* Numeral and Category: Displays "{index + 1} of {filteredProjects.length}" */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-code font-bold text-sm sm:text-base text-black bg-neutral-100 border border-black/10 px-2.5 py-0.5 rounded-md">
                            {index + 1} of {filteredProjects.length}
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
                      <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-black tracking-tight mb-2">
                        {project.title}
                      </h2>
                      <p className="text-sm font-light text-neutral-600 mb-6 leading-relaxed">
                        {project.subtitle}
                      </p>

                      {/* Problem & Objective Callout */}
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

                      {/* Key Features */}
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
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.blogUrl && (
                        <a
                          href={project.blogUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <span>Read Medium Article</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        onClick={() => {
                          playPopSound();
                          setSelectedCaseStudy(project);
                        }}
                        className="px-5 py-3 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-black border border-black/10 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Case Study Dossier</span>
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 rounded-full text-xs font-semibold bg-white hover:bg-neutral-50 border border-black/15 text-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Back to Home CTA at bottom */}
        <div className="mt-24 pt-12 border-t border-black/10 text-center space-y-4">
          <h3 className="font-display font-bold text-2xl text-black">
            Ready to bring your product concept to life?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
            Available for full-stack engineering, Python/Django APIs, responsive web development, and AI agent automation.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                playClickSound();
                onBackToHome();
              }}
              className="px-6 py-3 rounded-full text-xs font-bold bg-white hover:bg-neutral-100 border border-black/20 text-black transition-colors flex items-center gap-2 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </button>
            <a
              href="#contact"
              onClick={() => {
                playClickSound();
                onBackToHome();
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-6 py-3 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-colors shadow-md"
            >
              Start a Conversation &rarr;
            </a>
          </div>
        </div>
      </main>

      {/* Case Study Full Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </div>
  );
};
