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
  const { accentHex, playClickSound } = useTheme();

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
          className="fixed inset-0 bg-midnight-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-midnight-900 border border-surface-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between bg-midnight-950/80">
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: project.accentColor || accentHex }}
              />
              <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
                Case Study Dossier • {project.category}
              </span>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-200">
            {/* Title & Subtitle */}
            <div>
              <div className="inline-block px-2.5 py-1 rounded-full text-xs font-mono-code mb-3 bg-white/5 border border-white/10 text-slate-300">
                {project.badge}
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                {project.title}
              </h2>
              <p className="text-base text-slate-300 mt-2 font-light">
                {project.subtitle}
              </p>
            </div>

            {/* Problem & Objective Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-midnight-950/60 border border-surface-border space-y-2.5">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono-code font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Problem Context</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-midnight-950/60 border border-surface-border space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-code font-semibold">
                  <Target className="w-4 h-4" />
                  <span>Engineering Objective</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.objective}
                </p>
              </div>
            </div>

            {/* Architecture & Implemented Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-display font-bold text-slate-100">
                <Layers className="w-4 h-4" style={{ color: accentHex }} />
                <span>Implemented Engineering Features</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-midnight-950/40 border border-surface-border flex items-start gap-2.5 text-xs text-slate-300"
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: project.accentColor || accentHex }}
                    />
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Actual Contribution */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-code font-semibold text-slate-200">
                <Wrench className="w-4 h-4" style={{ color: accentHex }} />
                <span>My Specific Contribution &amp; Ownership</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.myContribution}
              </p>
            </div>

            {/* Technology Stack Badges */}
            <div className="space-y-3">
              <span className="text-xs font-mono-code uppercase text-slate-400 block">
                Technology Stack Used
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono-code bg-midnight-950 border border-surface-border text-slate-200"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="px-6 py-4 border-t border-surface-border bg-midnight-950/90 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono-code text-slate-500">
              Verified Project Dossier • Sathish Rao Portfolio
            </span>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-midnight-800 hover:bg-white/10 border border-surface-border text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span>View Source</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-midnight-950 transition-colors flex items-center gap-1.5"
                  style={{ backgroundColor: accentHex }}
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
