import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle2, XCircle, MousePointer, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const UxLab: React.FC = () => {
  const { playClickSound, playPopSound } = useTheme();
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
    <section id="ux-lab" className="py-24 md:py-32 relative bg-neutral-50/60 border-t border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-mono-code mb-4 shadow-sm text-neutral-800">
            <Brain className="w-3.5 h-3.5 text-black" />
            <span>Interactive Usability Laboratory</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight">
            Design Beyond Aesthetics: UX Psychology
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-3 leading-relaxed">
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
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white border border-black/10 text-neutral-600 hover:text-black hover:border-black/30'
                }`}
              >
                {principle.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Lab Showcase Card */}
        <div className="rounded-2xl bg-white border border-black/10 shadow-2xl shadow-black/[0.04] overflow-hidden">
          {/* Top Bar with Before / After Switcher */}
          <div className="px-6 py-4 border-b border-black/10 bg-neutral-50/80 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono-code text-neutral-400 uppercase tracking-widest block font-bold">
                {activePrinciple.lawOrigin}
              </span>
              <h3 className="font-display font-bold text-lg text-black mt-0.5">
                {activePrinciple.name}: {activePrinciple.tagline}
              </h3>
            </div>

            {/* Toggle Controls */}
            <div className="flex items-center p-1 rounded-xl bg-white border border-black/10 shadow-sm">
              <button
                onClick={() => handleToggleState('before')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentState === 'before'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 font-bold shadow-sm'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Before (Friction)</span>
              </button>

              <button
                onClick={() => handleToggleState('after')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentState === 'after'
                    ? 'bg-black text-white font-bold shadow-sm'
                    : 'text-neutral-500 hover:text-black'
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
            <div className="lg:col-span-7 bg-neutral-50/80 p-5 sm:p-6 rounded-xl border border-black/10 min-h-[360px] flex flex-col justify-center">
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
                        <div className="flex items-center justify-between mb-3 text-xs text-rose-600 font-mono-code font-bold">
                          <span>Overwhelmed Decision Paradox</span>
                          <span>Decision Latency: ~14.2s (Paralysis)</span>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-[10px]">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className="p-2 rounded bg-white border border-black/10 text-neutral-600 text-center shadow-sm"
                            >
                              <div className="font-bold text-black">Option {i + 1}</div>
                              <div className="text-[9px] text-neutral-400 mt-1">$1{i}/mo &bull; 14 perks</div>
                              <button className="mt-1.5 w-full py-0.5 rounded bg-neutral-100 text-[9px] text-neutral-700">
                                Select Plan
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-3 text-xs text-black font-mono-code font-bold">
                          <span>Progressive Disclosure &amp; Curation</span>
                          <span>Decision Latency: ~2.8s (-80%)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-4 rounded-xl bg-white border border-black/10 text-center shadow-sm">
                            <span className="text-[10px] font-mono-code text-neutral-500 uppercase font-bold">Starter</span>
                            <div className="font-display font-bold text-xl text-black mt-1">$19</div>
                            <p className="text-[11px] text-neutral-500 mt-1">Core MVP essentials for indie founders</p>
                            <button className="w-full mt-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-black">
                              Choose Starter
                            </button>
                          </div>

                          <div className="p-4 rounded-xl bg-white border-2 border-black text-center relative shadow-lg">
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-mono-code font-bold uppercase bg-black text-white shadow-sm">
                              Most Popular
                            </span>
                            <span className="text-[10px] font-mono-code text-neutral-700 uppercase font-bold">Growth Pro</span>
                            <div className="font-display font-bold text-xl text-black mt-1">$49</div>
                            <p className="text-[11px] text-neutral-600 mt-1">Full-stack web app with automation</p>
                            <button className="w-full mt-3 py-1.5 rounded-lg text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all shadow-md">
                              Get Started
                            </button>
                          </div>

                          <div className="p-4 rounded-xl bg-white border border-black/10 text-center shadow-sm">
                            <span className="text-[10px] font-mono-code text-neutral-500 uppercase font-bold">Enterprise</span>
                            <div className="font-display font-bold text-xl text-black mt-1">Custom</div>
                            <p className="text-[11px] text-neutral-500 mt-1">Dedicated architecture and SLA support</p>
                            <button className="w-full mt-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-black">
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
                      <div className="h-64 relative border border-dashed border-rose-300 rounded-xl p-4 flex flex-col justify-between bg-white">
                        <div className="flex items-center justify-between text-xs font-mono-code text-rose-600 font-bold">
                          <span>Awkward Reach: Tiny Corner Link</span>
                          <span>High Mis-tap Risk on Mobile</span>
                        </div>

                        <div className="absolute top-12 left-4">
                          <button
                            onClick={handleFittsClick}
                            className="text-[10px] text-neutral-600 underline hover:text-black px-1.5 py-0.5 border border-dashed border-neutral-400 cursor-pointer"
                          >
                            Click to Checkout (14px target)
                          </button>
                        </div>

                        <div className="text-center text-xs text-neutral-500 mt-auto">
                          Users on touchscreens miss this target 28% of the time.
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 relative border border-black/20 rounded-xl p-4 flex flex-col justify-between bg-white shadow-sm">
                        <div className="flex items-center justify-between text-xs font-mono-code text-black font-bold">
                          <span>Natural Thumb-Zone Target (48x48px+)</span>
                          <span>Zero Accidental Misses</span>
                        </div>

                        <div className="flex flex-col items-center justify-center my-auto">
                          <button
                            onClick={handleFittsClick}
                            className="w-full max-w-xs py-4 px-6 rounded-2xl font-bold text-sm bg-black text-white hover:bg-neutral-800 flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl cursor-pointer"
                          >
                            <MousePointer className="w-4 h-4" />
                            <span>Complete Order &bull; $49.00</span>
                          </button>
                          <span className="text-[11px] font-mono-code text-neutral-500 mt-2">
                            Anchored in bottom 1/3 viewport: 100% thumb accessibility
                          </span>
                        </div>

                        {fittsClickTime && (
                          <div className="text-center text-xs font-mono-code text-black font-bold">
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
                      <div className="p-5 rounded-xl bg-white border border-rose-300 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between text-xs font-mono-code text-rose-600 font-bold">
                          <span>Reinvented / Unintuitive Navigation</span>
                          <span>Confusion &amp; Exit Rate: High</span>
                        </div>
                        <div className="p-4 rounded-lg bg-neutral-50 border border-dashed border-neutral-300 text-center space-y-2">
                          <div className="text-xs text-neutral-600">
                            Menu hidden inside ambiguous icon; search buried in footer legal credits.
                          </div>
                          <div className="inline-block p-2 rounded-full bg-neutral-200 text-black text-xs font-mono-code">
                            ✳️ (Mystery Icon for Checkout)
                          </div>
                          <p className="text-[11px] text-neutral-500">
                            "Where is the shopping cart? How do I search products?"
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 rounded-xl bg-white border border-black/15 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between text-xs font-mono-code text-black font-bold">
                          <span>Honoring User Mental Models</span>
                          <span>Zero Cognitive Training Required</span>
                        </div>
                        <div className="p-3 rounded-lg bg-neutral-50 border border-black/10 flex items-center justify-between">
                          <div className="font-display font-bold text-xs text-black">BrandStore</div>
                          <div className="flex items-center gap-4 text-xs text-neutral-600 font-medium">
                            <span>Products</span>
                            <span>Pricing</span>
                            <span>Docs</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded bg-white border border-black/10 text-[11px] text-neutral-500">
                              🔍 Search...
                            </span>
                            <span className="px-2.5 py-1 rounded bg-black text-xs text-white font-mono-code font-bold">
                              🛒 Cart (2)
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">
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
                      <div className="p-5 rounded-xl bg-white border border-rose-300 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between text-xs font-mono-code text-rose-600 font-bold">
                          <span>Scattered Ungrouped Form Fields</span>
                          <span>Completion Errors: +42%</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <input disabled placeholder="Full Name" className="p-2 rounded bg-neutral-50 border border-neutral-300 text-neutral-600" />
                          <input disabled placeholder="Credit Card Number" className="p-2 rounded bg-neutral-50 border border-neutral-300 text-neutral-600" />
                          <input disabled placeholder="Shipping Address" className="p-2 rounded bg-neutral-50 border border-neutral-300 text-neutral-600" />
                          <input disabled placeholder="CVV Code" className="p-2 rounded bg-neutral-50 border border-neutral-300 text-neutral-600" />
                        </div>
                        <span className="text-[10px] text-neutral-500 block">
                          Without grouping or proximity, shipping and payment information blend into chaos.
                        </span>
                      </div>
                    ) : (
                      <div className="p-5 rounded-xl bg-white border border-black/15 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between text-xs font-mono-code text-black font-bold">
                          <span>Chunked Common Region &amp; Proximity</span>
                          <span>Form Completion Velocity: +35%</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {/* Chunk 1: Shipping */}
                          <div className="p-3 rounded-lg bg-neutral-50 border border-black/10 space-y-2">
                            <span className="font-mono-code text-[10px] text-neutral-900 uppercase font-bold">
                              1. Delivery Address
                            </span>
                            <div className="space-y-1.5">
                              <div className="p-1.5 rounded bg-white border border-black/10 text-neutral-800 text-[11px]">
                                Sathish Rao
                              </div>
                              <div className="p-1.5 rounded bg-white border border-black/10 text-neutral-800 text-[11px]">
                                42 Innovation Way, Tech Park
                              </div>
                            </div>
                          </div>

                          {/* Chunk 2: Payment */}
                          <div className="p-3 rounded-lg bg-neutral-50 border border-black/10 space-y-2">
                            <span className="font-mono-code text-[10px] text-neutral-900 uppercase font-bold">
                              2. Secure Payment
                            </span>
                            <div className="space-y-1.5">
                              <div className="p-1.5 rounded bg-white border border-black/10 text-neutral-800 text-[11px]">
                                &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242
                              </div>
                              <div className="p-1.5 rounded bg-white border border-black/10 text-neutral-800 text-[11px]">
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
                      <div className="p-5 rounded-xl bg-white border border-rose-300 space-y-2 text-neutral-600 text-xs shadow-sm">
                        <div className="flex items-center justify-between text-xs font-mono-code text-rose-600 mb-2 font-bold">
                          <span>Uniform / Flat Typography</span>
                          <span>Zero Focal Guidance</span>
                        </div>
                        <p className="font-normal text-xs text-neutral-600">
                          Deploy your next web application in minutes with our fast continuous delivery platform.
                        </p>
                        <p className="font-normal text-xs text-neutral-600">
                          Built for developers who value performance and uptime. Free tier available.
                        </p>
                        <div className="pt-2">
                          <button className="px-3 py-1 rounded bg-neutral-100 text-neutral-600 text-xs">
                            Click here to register
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 rounded-xl bg-white border border-black/15 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between text-xs font-mono-code text-black mb-1 font-bold">
                          <span>Disciplined 3-Level Editorial Hierarchy</span>
                          <span>Immediate Hook &amp; High CTA Clickthrough</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono-code uppercase tracking-wider text-neutral-500 block mb-1 font-bold">
                            Level 1 &bull; Dominant Hook
                          </span>
                          <h4 className="font-display font-black text-2xl text-black">
                            Ship code faster with zero friction.
                          </h4>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono-code uppercase tracking-wider text-neutral-500 block mb-0.5 font-bold">
                            Level 2 &bull; Contextual Anchor
                          </span>
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            Continuous delivery and cloud microservices engineered for modern full-stack web applications.
                          </p>
                        </div>
                        <div className="pt-2">
                          <button className="px-5 py-2.5 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all shadow-md">
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
                <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-400 block mb-1 font-bold">
                  Psychological Definition
                </span>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {activePrinciple.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-black/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-code font-bold text-black">
                  <Zap className="w-3.5 h-3.5 text-black" />
                  <span>Impact on Real Conversion Rates</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {activePrinciple.impactOnConversion}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/10 space-y-1.5 shadow-sm">
                <div className="text-[11px] font-mono-code uppercase text-neutral-900 font-bold">
                  Key Takeaway for Clients
                </div>
                <p className="text-xs text-neutral-800 font-medium">
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
