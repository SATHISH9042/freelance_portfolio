import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Target, Wrench, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const { playClickSound } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-black/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 mr-1">
                <button
                  onClick={() => {
                    playClickSound();
                    onClose();
                  }}
                  className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 shadow-xs hover:opacity-80 transition-opacity cursor-pointer"
                  title="Close modal"
                />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 shadow-xs inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 shadow-xs inline-block" />
              </div>
              <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-600 font-semibold">
                Case Study Dossier • {project.category}
              </span>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-neutral-200/70 hover:bg-neutral-300 text-neutral-700 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-neutral-800">
            {/* Title & Subtitle */}
            <div>
              <div className="inline-block px-2.5 py-1 rounded-full text-xs font-mono-code mb-3 bg-black/5 border border-black/10 text-neutral-800 font-medium">
                {project.badge}
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-black">
                {project.title}
              </h2>
              <p className="text-base text-neutral-600 mt-2 font-normal">
                {project.subtitle}
              </p>
            </div>

            {/* Problem & Objective Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-neutral-50 border border-black/10 space-y-2.5">
                <div className="flex items-center gap-2 text-black text-xs font-mono-code font-bold">
                  <AlertCircle className="w-4 h-4 text-black" />
                  <span>The Problem Context</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-50 border border-black/10 space-y-2.5">
                <div className="flex items-center gap-2 text-black text-xs font-mono-code font-bold">
                  <Target className="w-4 h-4 text-black" />
                  <span>Engineering Objective</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                  {project.objective}
                </p>
              </div>
            </div>

            {/* Architecture & Implemented Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-display font-bold text-black">
                <Layers className="w-4 h-4 text-black" />
                <span>Implemented Engineering Features</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-neutral-50 border border-black/5 flex items-start gap-2.5 text-xs text-neutral-700"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-black" />
                    <span className="leading-relaxed font-normal">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Actual Contribution */}
            <div className="p-5 rounded-xl bg-neutral-100 border border-black/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-code font-bold text-black">
                <Wrench className="w-4 h-4 text-black" />
                <span>My Specific Contribution &amp; Ownership</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                {project.myContribution}
              </p>
            </div>

            {/* Technology Stack Badges */}
            <div className="space-y-3">
              <span className="text-xs font-mono-code uppercase text-neutral-500 font-semibold block">
                Technology Stack Used
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono-code bg-neutral-100 border border-black/10 text-neutral-900 font-medium"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="px-6 py-4 border-t border-black/10 bg-neutral-50 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono-code text-neutral-500">
              Verified Project Dossier • Sathish Rao Portfolio
            </span>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-white hover:bg-neutral-100 border border-black/15 text-black transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>View Source</span>
                </a>
              )}
              {project.blogUrl && (
                <a
                  href={project.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-black text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Read Medium Article</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-black text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Open Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
