import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle2, XCircle, MousePointer, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const UxLab: React.FC = () => {
  const { accentHex, playClickSound, playPopSound } = useTheme();
  const [activePrincipleId, setActivePrincipleId] = useState<string>('hicks-law');
  const [activeStates, setActiveStates] = useState<Record<string, 'before' | 'after'>>({
    'hicks-law': 'after',
    'fittss-law': 'after',
    'jakobs-law': 'after',
    'gestalt-principles': 'after',
    'visual-hierarchy': 'after',
  });

  const [fittsClickTime, setFittsClickTime] = useState<number | null>(null);
  const [fittsStartTime, setFittsStartTime] = useState<number | null>(null);

  const activePrinciple = PORTFOLIO_DATA.uxPrinciples.find((p) => p.id === activePrincipleId)!;
  const currentState = activeStates[activePrincipleId];

  const handleToggleState = (mode: 'before' | 'after') => {
    playPopSound();
    setActiveStates((prev) => ({ ...prev, [activePrincipleId]: mode }));
  };

  const handleSelectPrinciple = (id: string) => {
    playClickSound();
    setActivePrincipleId(id);
  };

  // Fitts law interactive timer
  const handleFittsClick = () => {
    playClickSound();
    if (fittsStartTime) {
      const elapsed = Date.now() - fittsStartTime;
      setFittsClickTime(elapsed);
      setFittsStartTime(null);
    } else {
      setFittsStartTime(Date.now());
      setFittsClickTime(null);
    }
  };

  return (
    <section id="ux-lab" className="py-24 md:py-32 relative bg-midnight-950/60 border-t border-b border-surface-border">
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-lime-glow/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code mb-4">
            <Brain className="w-3.5 h-3.5" style={{ color: accentHex }} />
            <span>Interactive Usability Laboratory</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Design Beyond Aesthetics: UX Psychology
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Beautiful interfaces fail when they ignore cognitive science. Toggle between the unoptimized friction state and the conversion-engineered solution to see how each law transforms user behavior.
          </p>
        </div>

        {/* Principle Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {PORTFOLIO_DATA.uxPrinciples.map((principle) => {
            const isSelected = activePrincipleId === principle.id;
            return (
              <button
                key={principle.id}
                onClick={() => handleSelectPrinciple(principle.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-slate-100 text-midnight-950 font-bold shadow-lg scale-105'
                    : 'bg-midnight-900 border border-surface-border text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {principle.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Lab Showcase Card */}
        <div className="rounded-2xl bg-midnight-900/90 border border-surface-border shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Top Bar with Before / After Switcher */}
          <div className="px-6 py-4 border-b border-surface-border bg-midnight-950/80 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-widest block">
                {activePrinciple.lawOrigin}
              </span>
              <h3 className="font-display font-bold text-lg text-white">
                {activePrinciple.name}: {activePrinciple.tagline}
              </h3>
            </div>

            {/* Toggle Controls */}
            <div className="flex items-center p-1 rounded-xl bg-midnight-900 border border-surface-border">
              <button
                onClick={() => handleToggleState('before')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                  currentState === 'before'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Before (Friction)</span>
              </button>

              <button
                onClick={() => handleToggleState('after')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                  currentState === 'after'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>After (Optimized)</span>
              </button>
            </div>
          </div>

          {/* Interactive Demonstration Area */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Canvas Demonstration (7 cols) */}
            <div className="lg:col-span-7 bg-midnight-950/80 p-5 sm:p-6 rounded-xl border border-surface-border min-h-[360px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {/* 1. Hick's Law Demo */}
                {activePrincipleId === 'hicks-law' && (
                  <motion.div
                    key={`hicks-${currentState}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {currentState === 'before' ? (
                      <div>
                        <div className="flex items-center justify-between mb-3 text-xs text-rose-400 font-mono-code">
                          <span>Overwhelmed Decision Paradox</span>
                          <span>Decision Latency: ~14.2s (Paralysis)</span>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-[10px]">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className="p-2 rounded bg-midnight-900 border border-surface-border text-slate-400 text-center hover:border-rose-400/50"
                            >
                              <div className="font-bold text-slate-300">Plan Option {i + 1}</div>
                              <div className="text-[9px] text-slate-500 mt-1">$1{i}/mo • 14 perks</div>
                              <button className="mt-1.5 w-full py-0.5 rounded bg-white/5 text-[9px] text-slate-300">
                                Select Plan
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-3 text-xs text-emerald-400 font-mono-code">
                          <span>Progressive Disclosure &amp; Curation</span>
                          <span>Decision Latency: ~2.8s (-80%)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-4 rounded-xl bg-midnight-900/90 border border-surface-border text-center">
                            <span className="text-[10px] font-mono-code text-slate-400 uppercase">Starter</span>
                            <div className="font-display font-bold text-xl text-white mt-1">$19</div>
                            <p className="text-[11px] text-slate-400 mt-1">Core MVP essentials for indie founders</p>
                            <button className="w-full mt-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-200">
                              Choose Starter
                            </button>
                          </div>

                          <div
                            className="p-4 rounded-xl bg-midnight-900 border text-center relative shadow-lg"
                            style={{ borderColor: accentHex }}
                          >
                            <span
                              className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-mono-code font-bold uppercase"
                              style={{ backgroundColor: accentHex, color: '#06080C' }}
                            >
                              Most Popular
                            </span>
                            <span className="text-[10px] font-mono-code text-slate-300 uppercase">Growth Pro</span>
                            <div className="font-display font-bold text-xl text-white mt-1">$49</div>
                            <p className="text-[11px] text-slate-300 mt-1">Full-stack web application with automation</p>
                            <button
                              className="w-full mt-3 py-1.5 rounded-lg text-xs font-bold text-midnight-950 transition-all shadow-sm"
                              style={{ backgroundColor: accentHex }}
                            >
                              Get Started
                            </button>
                          </div>

                          <div className="p-4 rounded-xl bg-midnight-900/90 border border-surface-border text-center">
                            <span className="text-[10px] font-mono-code text-slate-400 uppercase">Enterprise</span>
                            <div className="font-display font-bold text-xl text-white mt-1">Custom</div>
                            <p className="text-[11px] text-slate-400 mt-1">Dedicated architecture and SLA support</p>
                            <button className="w-full mt-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-200">
                              Contact Sales
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2. Fitts's Law Demo */}
                {activePrincipleId === 'fittss-law' && (
                  <motion.div
                    key={`fitts-${currentState}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {currentState === 'before' ? (
                      <div className="h-64 relative border border-dashed border-rose-500/30 rounded-xl p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-xs font-mono-code text-rose-400">
                          <span>Awkward Reach: Tiny Corner Link</span>
                          <span>High Mis-tap Risk on Mobile</span>
                        </div>

                        {/* Tiny hard-to-click target tucked in top corner */}
                        <div className="absolute top-12 left-4">
                          <button
                            onClick={handleFittsClick}
                            className="text-[10px] text-slate-400 underline hover:text-rose-400 px-1 py-0.5 border border-dashed border-slate-700"
                          >
                            Click to Checkout (14px target)
                          </button>
                        </div>

                        <div className="text-center text-xs text-slate-500 mt-auto">
                          Users on touchscreens miss this target 28% of the time.
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 relative border border-emerald-500/30 rounded-xl p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-xs font-mono-code text-emerald-400">
                          <span>Natural Thumb-Zone Target (48x48px+)</span>
                          <span>Zero Accidental Misses</span>
                        </div>

                        {/* Large, prominent, thumb-anchored CTA */}
                        <div className="flex flex-col items-center justify-center my-auto">
                          <button
                            onClick={handleFittsClick}
                            className="w-full max-w-xs py-3.5 px-6 rounded-2xl font-bold text-sm text-midnight-950 flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
                            style={{
                              backgroundColor: accentHex,
                              boxShadow: `0 8px 25px -4px ${accentHex}50`,
                            }}
                          >
                            <MousePointer className="w-4 h-4" />
                            <span>Complete Order &bull; $49.00</span>
                          </button>
                          <span className="text-[11px] font-mono-code text-slate-400 mt-2">
                            Anchored in bottom 1/3 viewport: 100% thumb accessibility
                          </span>
                        </div>

                        {fittsClickTime && (
                          <div className="text-center text-xs font-mono-code text-emerald-400">
                            Recorded Reaction Time: {fittsClickTime}ms (Sub-second tap)
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 3. Jakob's Law Demo */}
                {activePrincipleId === 'jakobs-law' && (
                  <motion.div
                    key={`jakob-${currentState}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {currentState === 'before' ? (
                      <div className="p-5 rounded-xl bg-midnight-900 border border-rose-500/30 space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono-code text-rose-400">
                          <span>Reinvented / Unintuitive Navigation</span>
                          <span>Confusion &amp; Exit Rate: High</span>
                        </div>
                        <div className="p-4 rounded-lg bg-midnight-950 border border-dashed border-slate-700 text-center space-y-2">
                          <div className="text-xs text-slate-400">
                            Menu hidden inside ambiguous icon; search buried in footer legal credits.
                          </div>
                          <div className="inline-block p-2 rounded-full bg-slate-800 text-slate-400 text-xs">
                            ✳️ (Mystery Icon for Checkout)
                          </div>
                          <p className="text-[11px] text-slate-500">
                            "Where is the shopping cart? How do I search products?"
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 rounded-xl bg-midnight-900 border border-emerald-500/30 space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono-code text-emerald-400">
                          <span>Honoring User Mental Models</span>
                          <span>Zero Cognitive Training Required</span>
                        </div>
                        <div className="p-3 rounded-lg bg-midnight-950 border border-surface-border flex items-center justify-between">
                          <div className="font-display font-bold text-xs text-white">BrandStore</div>
                          <div className="flex items-center gap-4 text-xs text-slate-300">
                            <span>Products</span>
                            <span>Pricing</span>
                            <span>Docs</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded bg-midnight-900 border border-surface-border text-[11px] text-slate-400">
                              🔍 Search...
                            </span>
                            <span className="px-2.5 py-1 rounded bg-white/10 text-xs text-slate-100 font-mono-code">
                              🛒 Cart (2)
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Standard header placement allows visitors to leverage habits learned across 10,000+ top websites without friction.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 4. Gestalt Principles Demo */}
                {activePrincipleId === 'gestalt-principles' && (
                  <motion.div
                    key={`gestalt-${currentState}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {currentState === 'before' ? (
                      <div className="p-5 rounded-xl bg-midnight-900 border border-rose-500/30 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono-code text-rose-400">
                          <span>Scattered Ungrouped Form Fields</span>
                          <span>Completion Errors: +42%</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <input
                            disabled
                            placeholder="Full Name"
                            className="p-2 rounded bg-midnight-950 border border-slate-700 text-slate-400"
                          />
                          <input
                            disabled
                            placeholder="Credit Card Number"
                            className="p-2 rounded bg-midnight-950 border border-slate-700 text-slate-400"
                          />
                          <input
                            disabled
                            placeholder="Shipping Address"
                            className="p-2 rounded bg-midnight-950 border border-slate-700 text-slate-400"
                          />
                          <input
                            disabled
                            placeholder="CVV Code"
                            className="p-2 rounded bg-midnight-950 border border-slate-700 text-slate-400"
                          />
                        </div>
                        <span className="text-[10px] text-slate-500 block">
                          Without grouping or proximity, shipping and payment information blend into chaos.
                        </span>
                      </div>
                    ) : (
                      <div className="p-5 rounded-xl bg-midnight-900 border border-emerald-500/30 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono-code text-emerald-400">
                          <span>Chunked Common Region &amp; Proximity</span>
                          <span>Form Completion Velocity: +35%</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {/* Chunk 1: Shipping */}
                          <div className="p-3 rounded-lg bg-midnight-950/80 border border-surface-border space-y-2">
                            <span className="font-mono-code text-[10px] text-slate-400 uppercase font-semibold">
                              1. Delivery Address
                            </span>
                            <div className="space-y-1.5">
                              <div className="p-1.5 rounded bg-midnight-900 border border-surface-border text-slate-300 text-[11px]">
                                Sathish Rao
                              </div>
                              <div className="p-1.5 rounded bg-midnight-900 border border-surface-border text-slate-300 text-[11px]">
                                42 Innovation Way, Tech Park
                              </div>
                            </div>
                          </div>

                          {/* Chunk 2: Payment */}
                          <div className="p-3 rounded-lg bg-midnight-950/80 border border-surface-border space-y-2">
                            <span className="font-mono-code text-[10px] text-slate-400 uppercase font-semibold">
                              2. Secure Payment
                            </span>
                            <div className="space-y-1.5">
                              <div className="p-1.5 rounded bg-midnight-900 border border-surface-border text-slate-300 text-[11px]">
                                &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242
                              </div>
                              <div className="p-1.5 rounded bg-midnight-900 border border-surface-border text-slate-300 text-[11px]">
                                Exp: 12/28 &bull; CVC: &bull;&bull;&bull;
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 5. Visual Hierarchy Demo */}
                {activePrincipleId === 'visual-hierarchy' && (
                  <motion.div
                    key={`hierarchy-${currentState}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {currentState === 'before' ? (
                      <div className="p-5 rounded-xl bg-midnight-900 border border-rose-500/30 space-y-2 text-slate-400 text-xs">
                        <div className="flex items-center justify-between text-xs font-mono-code text-rose-400 mb-2">
                          <span>Uniform / Flat Typography</span>
                          <span>Zero Focal Guidance</span>
                        </div>
                        <p className="font-normal text-xs text-slate-400">
                          Deploy your next web application in minutes with our fast continuous delivery platform.
                        </p>
                        <p className="font-normal text-xs text-slate-400">
                          Built for developers who value performance and uptime. Free tier available.
                        </p>
                        <div className="pt-2">
                          <button className="px-3 py-1 rounded bg-slate-800 text-slate-400 text-xs">
                            Click here to register
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 rounded-xl bg-midnight-900 border border-emerald-500/30 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono-code text-emerald-400 mb-1">
                          <span>Disciplined 3-Level Editorial Hierarchy</span>
                          <span>Immediate Hook &amp; High CTA Clickthrough</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono-code uppercase tracking-wider text-slate-400 block mb-1">
                            Level 1 &bull; Dominant Hook
                          </span>
                          <h4 className="font-display font-black text-2xl text-white">
                            Ship code faster with zero friction.
                          </h4>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono-code uppercase tracking-wider text-slate-400 block mb-0.5">
                            Level 2 &bull; Contextual Anchor
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Continuous delivery and cloud microservices engineered for MERN stack applications.
                          </p>
                        </div>
                        <div className="pt-2">
                          <button
                            className="px-5 py-2.5 rounded-full text-xs font-bold text-midnight-950 transition-all shadow-md"
                            style={{ backgroundColor: accentHex }}
                          >
                            Deploy Free MVP &rarr;
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Cognitive Explanation & Conversion Impact (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block mb-1">
                  Psychological Definition
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activePrinciple.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-midnight-950/80 border border-surface-border space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-code font-semibold text-slate-100">
                  <Zap className="w-3.5 h-3.5" style={{ color: accentHex }} />
                  <span>Impact on Real Conversion Rates</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activePrinciple.impactOnConversion}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                <div className="text-[11px] font-mono-code uppercase text-slate-400 font-bold">
                  Key Takeaway for Clients
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  "{activePrinciple.keyTakeaway}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
