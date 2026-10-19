import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Calendar, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const Experience: React.FC = () => {
  const { playClickSound } = useTheme();
  const [filterType, setFilterType] = useState<string>('All');

  const filterTabs = ['All', 'Experience', 'Education', 'Certification'];

  const filteredTimeline = PORTFOLIO_DATA.timeline.filter(
    (item) => filterType === 'All' || item.type === filterType
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-black" />;
      case 'Experience':
        return <Briefcase className="w-4 h-4 text-black" />;
      case 'Certification':
        return <Award className="w-4 h-4 text-black" />;
      default:
        return <Briefcase className="w-4 h-4 text-black" />;
    }
  };

  return (
    <section id="experience" className="py-24 md:py-32 relative bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-500 font-semibold">
                Verified Career Milestones
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight">
              Experience &amp; Education
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-xl mt-2 font-normal">
              Formal engineering education, industry internship training, and verified full-stack &amp; AI certifications.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  playClickSound();
                  setFilterType(tab);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all ${
                  filterType === tab
                    ? 'bg-black text-white font-semibold shadow-sm'
                    : 'bg-white border border-black/10 text-neutral-600 hover:text-black hover:border-black/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-black/15 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {filteredTimeline.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-7 h-7 rounded-full bg-white border-2 border-black flex items-center justify-center transition-colors group-hover:bg-neutral-100 shadow-sm">
                {getIcon(item.type)}
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all shadow-sm hover:shadow-md space-y-4">
                {/* Header: Role, Org, Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/5">
                  <div>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-black/5 border border-black/10 text-neutral-800 uppercase tracking-wide font-medium">
                      {item.type}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-black mt-1.5">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mt-1">
                      <span className="text-neutral-900 font-semibold">{item.organization}</span>
                      <span className="flex items-center gap-1 font-mono-code">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono-code text-neutral-700 self-start sm:self-auto bg-neutral-100 px-3 py-1 rounded-lg border border-black/5">
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Bulleted Points */}
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 font-normal">
                  {item.description.map((desc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2 bg-black" />
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills Applied Tags */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono-code text-neutral-400 uppercase mr-1">
                    Applied:
                  </span>
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-neutral-100 border border-black/5 text-neutral-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
