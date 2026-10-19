import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code2, Eye, Sparkles, CheckCircle2, Terminal, Layers, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const { accentHex, playClickSound, playPopSound } = useTheme();
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [demoLikeCount, setDemoLikeCount] = useState(148);
  const [hasLiked, setHasLiked] = useState(false);

  // Auto-switch preview every 10s if user is passive
  useEffect(() => {
    const timer = setInterval(() => {
      // passive subtle glow
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleTab = (tab: 'preview' | 'code') => {
    playPopSound();
    setActiveTab(tab);
  };

  const handleLikeInteraction = () => {
    playClickSound();
    if (!hasLiked) {
      setDemoLikeCount((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setDemoLikeCount((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const scrollToSection = (id: string) => {
    playClickSound();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const codeSnippet = `// Production-Grade React & UX Engineering
import { motion } from "framer-motion";
import { useConversionOptimization } from "@/hooks";

export const HeroExperience = ({ title, cta }) => {
  const { metrics, trackEngagement } = useConversionOptimization({
    target: "visitor-to-client",
    frictionless: true
  });

  return (
    <article className="responsive-container rounded-2xl border-white/10">
      <header className="flex justify-between items-center">
        <h1 className="text-display font-bold">{title}</h1>
        <Badge status="available" ping={true} />
      </header>
      <div className="cta-action-zone">
        <Button onClick={trackEngagement} variant="primary">
          {cta.label}
        </Button>
      </div>
    </article>
  );
};`;

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:py-32 flex flex-col justify-center overflow-hidden bg-grain"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-lime-glow/20 via-cobalt-glow/20 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-cobalt-glow/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Meta Bar: Name, Role, Availability */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-mono-code text-slate-400"
        >
          <div className="flex items-center gap-3">
            <span className="text-slate-100 font-semibold">{PORTFOLIO_DATA.personal.name}</span>
            <span className="text-slate-600">/</span>
            <span>{PORTFOLIO_DATA.personal.role}</span>
          </div>

          {PORTFOLIO_DATA.personal.isAvailable && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for freelance contracts</span>
            </div>
          )}
        </motion.div>

        {/* Main Grid: Editorial Headline + Portrait & Interactive Morph Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Staggered Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] font-extrabold tracking-tight text-white mb-6"
            >
              I build digital experiences that{' '}
              <span className="relative inline-block">
                <span
                  className="relative z-10 transition-colors duration-300"
                  style={{ color: accentHex }}
                >
                  feel effortless.
                </span>
                <span
                  className="absolute bottom-1 left-0 w-full h-[6px] -z-0 opacity-40 rounded-full"
                  style={{ backgroundColor: accentHex }}
                />
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-8"
            >
              {PORTFOLIO_DATA.personal.shortBio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all shadow-lg active:scale-95 flex items-center gap-2 group"
                style={{
                  backgroundColor: accentHex,
                  color: '#06080C',
                  boxShadow: `0 8px 30px -4px ${accentHex}40`,
                }}
              >
                <span>Let’s Build Something</span>
                <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
              </button>

              <button
                onClick={() => scrollToSection('projects')}
                className="px-7 py-3.5 rounded-full font-medium text-sm text-slate-200 bg-midnight-900/80 hover:bg-white/10 border border-surface-border hover:border-white/20 transition-all flex items-center gap-2"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 text-slate-400 group-hover:translate-y-0.5" />
              </button>
            </motion.div>

            {/* Micro stats / Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-surface-border text-xs text-slate-400"
            >
              <div>
                <div className="font-mono-code font-bold text-base sm:text-lg text-slate-100">MERN Stack</div>
                <div className="text-[11px] text-slate-500">React • Node • Express • Mongo</div>
              </div>
              <div>
                <div className="font-mono-code font-bold text-base sm:text-lg text-slate-100">UX Discipline</div>
                <div className="text-[11px] text-slate-500">Hick's &amp; Fitts's Principles</div>
              </div>
              <div>
                <div className="font-mono-code font-bold text-base sm:text-lg text-slate-100">Modern AI</div>
                <div className="text-[11px] text-slate-500">RAG • LangChain • Prompt Eng</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Code-to-Interface Transformer & Portrait (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Portrait Header Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-4 rounded-2xl bg-midnight-900/90 border border-surface-border shadow-xl backdrop-blur-md flex items-center gap-4"
            >
              {/* Professional portrait area (easily replaceable by user in portfolioData.ts) */}
              <div className="relative group">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-tr from-midnight-800 to-midnight-700 border-2 border-surface-border flex items-center justify-center text-slate-400 shadow-inner">
                  {/* SVG Artistic Avatar with customizable placeholder */}
                  <svg
                    className="w-12 h-12 text-slate-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                {/* Live ping badge */}
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-midnight-900"></span>
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-slate-100 text-sm">
                    {PORTFOLIO_DATA.personal.name}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-white/5 border border-white/10 text-slate-300">
                    Active
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{PORTFOLIO_DATA.personal.location}</p>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono-code text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: accentHex }} />
                  <span>Clean Architecture &amp; Thoughtful UX</span>
                </div>
              </div>
            </motion.div>

            {/* Interactive Code-to-UI Morphing Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl bg-midnight-900/90 border border-surface-border shadow-2xl overflow-hidden backdrop-blur-md"
            >
              {/* Window Header */}
              <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between bg-midnight-950/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono-code text-slate-400 ml-2">
                    {activeTab === 'preview' ? 'live-rendered-ui.tsx' : 'HeroExperience.tsx'}
                  </span>
                </div>

                {/* Tab Switcher: Code vs Rendered */}
                <div className="flex items-center p-0.5 rounded-lg bg-midnight-800 border border-white/5 text-[11px] font-mono-code">
                  <button
                    onClick={() => handleToggleTab('preview')}
                    className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-midnight-950 text-white font-medium shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Live UI</span>
                  </button>

                  <button
                    onClick={() => handleToggleTab('code')}
                    className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                      activeTab === 'code'
                        ? 'bg-midnight-950 text-white font-medium shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Code2 className="w-3 h-3" />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              {/* Window Body: Interactive Preview vs Syntax Code */}
              <div className="p-4 sm:p-5 min-h-[290px] flex flex-col justify-center bg-midnight-900/50">
                {activeTab === 'preview' ? (
                  <motion.div
                    key="preview-tab"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 rounded-xl bg-midnight-950/80 border border-surface-border space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: accentHex }}
                        />
                        <span className="text-xs font-mono-code text-slate-300">
                          Conversion-Engineered Component
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Zero Layout Shift
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-slate-100 text-lg sm:text-xl">
                        Seamless Interaction Pattern
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        High-contrast touch targets with instant micro-feedback designed to reduce bounce rate.
                      </p>
                    </div>

                    {/* Interactive Widget Demonstration */}
                    <div className="pt-2 flex items-center justify-between border-t border-surface-border">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleLikeInteraction}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 active:scale-95 ${
                            hasLiked
                              ? 'bg-white/10 border-white/30 text-white'
                              : 'bg-midnight-900 border-surface-border text-slate-300 hover:border-white/20'
                          }`}
                        >
                          <span role="img" aria-label="sparkle">✨</span>
                          <span>{demoLikeCount} Engagements</span>
                        </button>
                      </div>

                      <div className="text-[11px] font-mono-code text-slate-400 flex items-center gap-1">
                        <Terminal className="w-3 h-3" />
                        <span>Latency &lt; 16ms</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="code-tab"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-x-auto text-[11px] font-mono-code text-slate-300 leading-relaxed max-h-[260px]"
                  >
                    <pre className="p-2">
                      <code>{codeSnippet}</code>
                    </pre>
                  </motion.div>
                )}
              </div>

              {/* Window Footer Status */}
              <div className="px-4 py-2 border-t border-surface-border/60 bg-midnight-950/80 flex items-center justify-between text-[10px] font-mono-code text-slate-500">
                <span className="flex items-center gap-1">
                  <Laptop className="w-3 h-3" />
                  <span>Responsive Desktop / Tablet / Mobile</span>
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  <span>Interactive Transformation</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          onClick={() => scrollToSection('projects')}
        >
          <span className="text-[11px] font-mono-code uppercase tracking-wider">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4" style={{ color: accentHex }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
