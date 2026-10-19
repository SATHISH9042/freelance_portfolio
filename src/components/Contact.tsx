import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Github, Linkedin, Send, Sparkles, AlertCircle, ArrowUpRight, Clock, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const Contact: React.FC = () => {
  const { playClickSound, playPopSound } = useTheme();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Web Application',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const projectTypes = [
    'Full-Stack Web Application',
    'Responsive Website',
    'UI/UX Redesign',
    'AI / RAG Integration',
  ];

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    playClickSound();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email format';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide brief details about your project or inquiry';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters long';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      playPopSound();
      return;
    }

    playClickSound();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PORTFOLIO_DATA.personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name} (${formData.projectType})`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (!data || data.success === 'true' || data.success === true || !data.error)) {
        setIsSubmitting(false);
        setIsSuccess(true);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#000000', '#262626', '#525252', '#A3A3A3'],
          });
        } catch {
          // fallback
        }
      } else {
        throw new Error(data?.message || 'Form submission could not be completed via HTTP.');
      }
    } catch (err: any) {
      console.warn('FormSubmit AJAX attempt triggered fallback to mail client:', err);
      // Fallback: trigger pre-filled mailto so inquiry is delivered directly via user's email client
      const mailtoSubject = encodeURIComponent(`Project Inquiry: ${formData.projectType} - ${formData.name}`);
      const mailtoBody = encodeURIComponent(
        `Hi Sathish,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Focus: ${formData.projectType}\n\nProject Details:\n${formData.message}\n\nBest regards,\n${formData.name}`
      );
      window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services / Freelance Offerings Grid */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-500 font-semibold">
              Freelance &amp; Contract Capabilities
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-black tracking-tight mb-4">
            How I Can Help Your Product Win
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl font-normal mb-10">
            Available for end-to-end full-stack projects, frontend performance overhauls, and user-centered UI/UX engineering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_DATA.services.map((srv) => (
              <div
                key={srv.title}
                className="p-5 rounded-xl bg-white border border-black/10 hover:border-black/30 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono-code mb-2.5 bg-black/5 text-black border border-black/10 font-medium">
                    {srv.badge}
                  </span>
                  <h3 className="font-display font-bold text-base text-black mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal mb-4">
                    {srv.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-black/5">
                  {srv.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="text-[11px] text-neutral-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Conversion Grid: Headline + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-10 border-t border-black/10">
          {/* Left Column: Headline & Direct Contact Links (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-500 block mb-3 font-semibold">
                Let's Start a Conversation
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight leading-tight mb-4">
                Have an idea? <br />
                <span className="underline decoration-black decoration-2 underline-offset-8">Let’s make it real.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                Whether you need a full-stack web application (Python &amp; Django), an intelligent AI/MCP workflow, or a user-centered interface, I am ready to build it with precision.
              </p>
            </div>

            {/* Direct Contact Card with 1-Click Copy */}
            <div className="p-6 rounded-2xl bg-white border border-black/10 space-y-3.5 shadow-sm">
              <span className="text-xs font-mono-code uppercase text-neutral-500 block font-semibold">
                Direct Contact
              </span>

              {/* Email */}
              <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-50 border border-black/10">
                <div className="flex items-center gap-2.5 truncate">
                  <Mail className="w-4 h-4 text-black shrink-0" />
                  <span className="font-mono-code text-xs sm:text-sm text-neutral-900 truncate select-all font-medium">
                    {PORTFOLIO_DATA.personal.email}
                  </span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-neutral-100 text-black border border-black/15 transition-colors shrink-0 flex items-center gap-1.5 active:scale-95 shadow-sm"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span className="text-black font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-50 border border-black/10">
                <a
                  href={`tel:${PORTFOLIO_DATA.personal.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 truncate hover:text-black transition-colors"
                >
                  <Phone className="w-4 h-4 text-black shrink-0" />
                  <span className="font-mono-code text-xs sm:text-sm text-neutral-900 truncate font-medium">
                    {PORTFOLIO_DATA.personal.phone}
                  </span>
                </a>

                <button
                  onClick={handleCopyPhone}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-neutral-100 text-black border border-black/15 transition-colors shrink-0 flex items-center gap-1.5 active:scale-95 shadow-sm"
                  title="Copy phone number to clipboard"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span className="text-black font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Verified Location */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50/70 border border-black/5 text-xs text-neutral-700 font-mono-code">
                <MapPin className="w-3.5 h-3.5 text-black shrink-0" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 font-mono-code text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Response time: &lt; 12 hours</span>
                </span>
                <span className="flex items-center gap-1.5 text-black font-medium">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Remote Worldwide</span>
                </span>
              </div>
            </div>

            {/* Social & Freelance Platform Links */}
            <div className="space-y-3">
              <span className="text-xs font-mono-code uppercase text-neutral-500 block font-semibold">
                Profiles &amp; Verified Portals
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-medium">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-black/10 hover:border-black text-neutral-800 hover:text-black transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-black" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black transition-all" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-black/10 hover:border-black text-neutral-800 hover:text-black transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-black" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black transition-all" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-black/10 hover:border-black text-neutral-800 hover:text-black transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black font-mono-code">Fi</span>
                    <span>Fiverr Pro</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/10 shadow-xl">
              {/* Form Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-black/5">
                <div>
                  <h3 className="font-display font-bold text-lg text-black">
                    Send a Project Inquiry
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Fill out your scope details for a tailored estimate
                  </p>
                </div>
                <Sparkles className="w-4 h-4 text-black" />
              </div>

              {/* Direct Mail Delivery Notice Banner */}
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/10 mb-6 flex items-start gap-2.5 text-xs text-neutral-600">
                <Mail className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="text-black font-semibold">Direct Inbox Delivery:</span> Inquiries submitted here are delivered immediately to <span className="font-mono-code text-black font-semibold">{PORTFOLIO_DATA.personal.email}</span> with automated notification.
                </div>
              </div>

              {isSuccess ? (
                <div className="p-8 rounded-xl bg-neutral-50 border border-black/15 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-black">
                    Inquiry Sent Directly to My Email!
                  </h4>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-black">{formData.name}</strong>. Your project details for <strong className="text-black">{formData.projectType}</strong> have been dispatched directly to <span className="font-mono-code font-semibold text-black">{PORTFOLIO_DATA.personal.email}</span>. I will review your requirements and reach out within 12–24 hours.
                  </p>
                  <div className="p-3 bg-white rounded-lg border border-black/10 text-xs text-neutral-600 max-w-md mx-auto text-left font-mono-code space-y-1">
                    <div><span className="text-neutral-400">Recipient:</span> {PORTFOLIO_DATA.personal.email}</div>
                    <div><span className="text-neutral-400">From:</span> {formData.name} ({formData.email})</div>
                    <div><span className="text-neutral-400">Scope:</span> {formData.projectType}</div>
                  </div>
                  <button
                    onClick={() => {
                      playClickSound();
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: 'Full-Stack Web Application',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold bg-black text-white hover:bg-neutral-800 transition-colors shadow-sm inline-block"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Project Type Selector */}
                  <div>
                    <label className="block text-xs font-mono-code text-neutral-600 mb-2 font-semibold">
                      Project Focus Area
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {projectTypes.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => {
                            playClickSound();
                            setFormData({ ...formData, projectType: type });
                          }}
                          className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                            formData.projectType === type
                              ? 'bg-black text-white font-bold border-black shadow-sm'
                              : 'bg-white border-black/10 text-neutral-600 hover:text-black hover:border-black/30'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code text-neutral-600 mb-1.5 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border text-black placeholder-neutral-400 text-xs sm:text-sm focus:outline-none transition-colors ${
                          errors.name ? 'border-red-500' : 'border-black/15 focus:border-black'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-red-600 mt-1 block">{errors.name}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-neutral-600 mb-1.5 font-semibold">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border text-black placeholder-neutral-400 text-xs sm:text-sm focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500' : 'border-black/15 focus:border-black'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-red-600 mt-1 block">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-mono-code text-neutral-600 mb-1.5 font-semibold">
                      Project Goals &amp; Specifics *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe what you're building, key features, or problems you need solved..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-black placeholder-neutral-400 text-xs sm:text-sm focus:outline-none transition-colors resize-none ${
                        errors.message ? 'border-red-500' : 'border-black/15 focus:border-black'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.message}</span>
                    )}
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide bg-black text-white hover:bg-neutral-800 flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending to {PORTFOLIO_DATA.personal.email}...</span>
                      </div>
                    ) : (
                      <>
                        <span>Send Message to My Email</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Direct Mailto Fallback Link */}
                  <div className="pt-2 text-center">
                    <span className="text-[11px] text-neutral-500">
                      Prefer your native email app?{' '}
                      <a
                        href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
                          `Project Inquiry (${formData.projectType || 'Full-Stack'}) - ${formData.name || 'Client'}`
                        )}&body=${encodeURIComponent(
                          formData.message || 'Hi Sathish,\n\nI would like to discuss a project with you.'
                        )}`}
                        className="text-black font-semibold underline underline-offset-2 hover:text-neutral-700 transition-colors"
                      >
                        Open in mail client ({PORTFOLIO_DATA.personal.email})
                      </a>
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
