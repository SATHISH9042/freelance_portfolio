import React, { useState } from 'react';
import { Bot, Send, BookOpen, Sparkles, Database } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface QAPair {
  question: string;
  answer: string;
  sourceDoc: string;
  section: string;
  confidence: number;
}

const KNOWLEDGE_BASE: Record<string, QAPair> = {
  admission: {
    question: 'What are the eligibility criteria for B.Tech Computer Science?',
    answer: 'Candidates must possess at least 45% aggregate marks in 10+2 with Physics and Mathematics as compulsory subjects, alongside Chemistry/Biotechnology/Computer Science. Valid TNEA or PMIST entrance score applies for engineering admissions.',
    sourceDoc: 'PMIST Academic Regulations & Handbook 2024-25',
    section: 'Clause 3.1: Academic Eligibility',
    confidence: 0.96,
  },
  hostel: {
    question: 'What is the hostel fee structure and curfew policy?',
    answer: 'Annual hostel accommodation fee ranges from ₹65,000 to ₹85,000 depending on single/shared occupancy, including high-speed Wi-Fi and mess charges. Resident student curfew is 8:30 PM on weekdays, extendable for verified academic labs with warden authorization.',
    sourceDoc: 'Campus Life & Hostel Regulations',
    section: 'Section 7: Curfew & Maintenance Dues',
    confidence: 0.93,
  },
  reval: {
    question: 'How do I apply for semester exam revaluation?',
    answer: 'Revaluation applications open within 10 days of results declaration on the university portal. A non-refundable processing fee of ₹400 per subject applies. If marks vary by more than 15%, a third independent evaluator is assigned automatically.',
    sourceDoc: 'Examinations & Evaluation Manual',
    section: 'Article 12: Grade Verification Protocol',
    confidence: 0.98,
  },
};

export const CollegeChatbotPreview: React.FC = () => {
  const { playClickSound, playPopSound } = useTheme();
  const [selectedKey, setSelectedKey] = useState<string>('admission');
  const [customInput, setCustomInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeQA, setActiveQA] = useState<QAPair>(KNOWLEDGE_BASE['admission']);

  const handleSelectPreset = (key: string) => {
    playClickSound();
    setSelectedKey(key);
    setIsSearching(true);
    setTimeout(() => {
      setActiveQA(KNOWLEDGE_BASE[key]);
      setIsSearching(false);
    }, 400);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    playPopSound();
    setIsSearching(true);
    const qLower = customInput.toLowerCase();
    let matchKey = 'admission';
    if (qLower.includes('hostel') || qLower.includes('room') || qLower.includes('fee')) {
      matchKey = 'hostel';
    } else if (qLower.includes('exam') || qLower.includes('mark') || qLower.includes('reval')) {
      matchKey = 'reval';
    }

    setTimeout(() => {
      setActiveQA({
        question: customInput,
        answer: KNOWLEDGE_BASE[matchKey].answer,
        sourceDoc: KNOWLEDGE_BASE[matchKey].sourceDoc,
        section: KNOWLEDGE_BASE[matchKey].section,
        confidence: KNOWLEDGE_BASE[matchKey].confidence,
      });
      setIsSearching(false);
      setCustomInput('');
    }, 500);
  };

  return (
    <div className="w-full bg-white rounded-xl border border-black/10 overflow-hidden text-neutral-900 flex flex-col h-full shadow-sm">
      {/* Mini App Bar */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-black/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* macOS window control dots */}
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 shadow-xs inline-block" title="Close" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 shadow-xs inline-block" title="Minimize" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 shadow-xs inline-block" title="Maximize" />
          </div>
          <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center font-bold text-xs shadow-sm">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="font-display font-bold text-xs tracking-wide uppercase text-black">
            UniGuide RAG Engine
          </span>
          <span className="text-[10px] text-neutral-700 bg-black/5 px-2 py-0.5 rounded border border-black/10 hidden sm:inline-flex items-center gap-1 font-medium">
            <Database className="w-3 h-3 text-black" />
            <span>Vector Index: 450 Academic Documents</span>
          </span>
        </div>

        <div className="text-[10px] font-mono-code text-neutral-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
          <span className="text-black font-medium">Embeddings Ready</span>
        </div>
      </div>

      {/* Main Conversation & Citation Feed */}
      <div className="p-4 flex-1 overflow-y-auto max-h-[360px] space-y-3">
        {/* Presets */}
        <div>
          <span className="block text-[10px] font-mono-code text-neutral-500 mb-1.5 font-semibold">
            Test Preset Inquiries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleSelectPreset('admission')}
              className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                selectedKey === 'admission'
                  ? 'bg-black text-white font-medium border-black shadow-sm'
                  : 'bg-neutral-50 border-black/10 text-neutral-600 hover:text-black'
              }`}
            >
              🎓 B.Tech Eligibility
            </button>
            <button
              onClick={() => handleSelectPreset('hostel')}
              className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                selectedKey === 'hostel'
                  ? 'bg-black text-white font-medium border-black shadow-sm'
                  : 'bg-neutral-50 border-black/10 text-neutral-600 hover:text-black'
              }`}
            >
              🏢 Hostel Fees &amp; Curfew
            </button>
            <button
              onClick={() => handleSelectPreset('reval')}
              className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                selectedKey === 'reval'
                  ? 'bg-black text-white font-medium border-black shadow-sm'
                  : 'bg-neutral-50 border-black/10 text-neutral-600 hover:text-black'
              }`}
            >
              📝 Exam Revaluation
            </button>
          </div>
        </div>

        {/* Query & Answer Bubble */}
        <div className="space-y-2.5 pt-1">
          {/* User Question */}
          <div className="flex items-start justify-end gap-2">
            <div className="p-2.5 rounded-lg bg-neutral-900 text-white max-w-[85%] text-xs shadow-sm">
              {activeQA.question}
            </div>
          </div>

          {/* Assistant Synthesized Answer */}
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <div className="p-3 rounded-lg bg-neutral-50 border border-black/10 max-w-[90%] text-xs space-y-2.5">
              {isSearching ? (
                <div className="flex items-center gap-2 text-neutral-700 py-1">
                  <div className="w-2 h-2 rounded-full bg-black animate-ping"></div>
                  <span className="font-mono-code text-[11px]">Searching vector chunks &amp; verifying citations...</span>
                </div>
              ) : (
                <>
                  <p className="text-neutral-800 leading-relaxed text-xs">
                    {activeQA.answer}
                  </p>

                  {/* Verified Citation Box */}
                  <div className="p-2 rounded bg-white border border-black/10 text-[10px] space-y-1 shadow-sm">
                    <div className="flex items-center justify-between text-neutral-600 font-mono-code">
                      <span className="flex items-center gap-1 text-black font-semibold">
                        <BookOpen className="w-3 h-3" />
                        <span>Verified Grounding Source</span>
                      </span>
                      <span className="text-neutral-900 font-bold">
                        Similarity: {(activeQA.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-black font-semibold">{activeQA.sourceDoc}</div>
                    <div className="text-neutral-500 text-[9px]">{activeQA.section}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Input Form */}
      <form
        onSubmit={handleAskQuestion}
        className="p-2.5 bg-neutral-50 border-t border-black/10 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask a question (e.g. scholarship deadlines)..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-black/15 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-black hover:bg-neutral-800 text-white transition-colors shadow-sm"
          title="Submit question to RAG pipeline"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
