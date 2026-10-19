import React, { useState } from 'react';
import { ShieldAlert, Cpu, HeartHandshake, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface PersonaScenario {
  id: string;
  label: string;
  userMessage: string;
  sentiment: 'Frustrated / High Churn Risk' | 'Technical / Analytical' | 'Inquiring / Receptive';
  sentimentColor: string;
  adaptiveTone: string;
  agentResponse: string;
  escalationRecommended: boolean;
}

const SCENARIOS: PersonaScenario[] = [
  {
    id: 'frustrated',
    label: '😤 Frustrated VIP Customer',
    userMessage: 'This is the second time my subscription was double-billed! I need this refunded immediately or I am canceling all my enterprise seats.',
    sentiment: 'Frustrated / High Churn Risk',
    sentimentColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    adaptiveTone: 'Empathetic De-escalation Protocol',
    agentResponse: 'I sincerely apologize for the duplicate charge on your account. I have immediately locked the duplicate invoice and queued an expedited refund of $240 to your primary payment method. To ensure this is resolved seamlessly, I have also flagged your ticket for direct review by our Senior Billing Lead.',
    escalationRecommended: true,
  },
  {
    id: 'technical',
    label: '💻 Technical Developer',
    userMessage: 'Our webhook listener is getting 429 Too Many Requests on the /v1/events endpoint during batch syncs at 00:00 UTC.',
    sentiment: 'Technical / Analytical',
    sentimentColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    adaptiveTone: 'Concise Engineering / Code-First',
    agentResponse: 'The /v1/events endpoint enforces a 120 req/min rate limit per API key. For bulk telemetry syncs, please pass the `batch_size: 50` payload parameter or implement an exponential backoff with jitter. Here is the recommended Retry-After header handler.',
    escalationRecommended: false,
  },
  {
    id: 'newbie',
    label: '👋 First-Time Inquirer',
    userMessage: 'Hello! I am looking to set up an online storefront for my ceramic art. Is coding knowledge required to launch?',
    sentiment: 'Inquiring / Receptive',
    sentimentColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    adaptiveTone: 'Warm Consultative / Supportive',
    agentResponse: 'Welcome! No programming experience is needed at all. Our visual store builder allows you to drag-and-drop your gallery, set prices, and connect Stripe in under 15 minutes. Would you like a 3-minute starter walkthrough tailored for artisan creators?',
    escalationRecommended: false,
  },
];

export const CustomerSupportPreview: React.FC = () => {
  const { playClickSound, playPopSound } = useTheme();
  const [activeScenario, setActiveScenario] = useState<PersonaScenario>(SCENARIOS[0]);
  const [escalated, setEscalated] = useState(false);

  const handleSelectScenario = (scenario: PersonaScenario) => {
    playClickSound();
    setActiveScenario(scenario);
    setEscalated(false);
  };

  const handleTriggerEscalation = () => {
    playPopSound();
    setEscalated(true);
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
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span className="font-display font-bold text-xs tracking-wide uppercase text-black">
            Voice Agent &bull; MCP Outbound
          </span>
          <span className="text-[10px] text-neutral-700 bg-black/5 px-2 py-0.5 rounded border border-black/10 hidden sm:inline-flex items-center gap-1 font-medium">
            <span>ElevenLabs + Twilio Workflow</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[10px] font-mono-code text-neutral-500">Escalation Engine: Active</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1 overflow-y-auto max-h-[360px] space-y-3.5">
        {/* Scenario Selectors */}
        <div>
          <span className="block text-[10px] font-mono-code text-neutral-500 mb-1.5 font-semibold">
            Select Customer Persona &amp; Mood:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario)}
                className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                  activeScenario.id === scenario.id
                    ? 'bg-black text-white font-medium border-black shadow-sm'
                    : 'bg-neutral-50 border-black/10 text-neutral-600 hover:text-black'
                }`}
              >
                {scenario.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Sentiment & Tone Telemetry Bar */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-code">
          <div className="p-2.5 rounded-lg bg-neutral-50 border border-black/10">
            <span className="block text-[9px] text-neutral-500 font-semibold">Detected Sentiment</span>
            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] border mt-1 font-medium ${activeScenario.sentimentColor}`}>
              {activeScenario.sentiment}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-neutral-50 border border-black/10">
            <span className="block text-[9px] text-neutral-500 font-semibold">Calibrated Voice Protocol</span>
            <span className="text-black font-semibold block mt-1 text-[10px]">
              {activeScenario.adaptiveTone}
            </span>
          </div>
        </div>

        {/* Chat Stream Preview */}
        <div className="space-y-2">
          {/* Incoming Customer Message */}
          <div className="p-2.5 rounded-lg bg-neutral-100 border border-black/10 text-xs text-neutral-800">
            <span className="block text-[9px] font-mono-code text-neutral-500 mb-1 font-semibold">Customer Inquiry:</span>
            <p className="italic font-normal">"{activeScenario.userMessage}"</p>
          </div>

          {/* Adaptive Agent Response */}
          <div className="p-3 rounded-lg bg-white border border-black/15 text-xs text-neutral-900 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-black flex items-center gap-1 font-semibold">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Persona-Calibrated Synthesis</span>
              </span>
              <span className="text-[9px] font-mono-code text-neutral-700 bg-black/5 px-1.5 py-0.5 rounded font-medium">Confidence 98.4%</span>
            </div>
            <p className="leading-relaxed text-xs text-neutral-700">
              {activeScenario.agentResponse}
            </p>
          </div>
        </div>

        {/* Escalation Notification Banner */}
        {escalated ? (
          <div className="p-3 rounded-lg bg-neutral-50 border border-black/15 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-black" />
              <div>
                <span className="font-semibold text-black block">Tier-2 Human Escalation Triggered</span>
                <span className="text-[10px] text-neutral-500">Ticket routed to Senior Billing Specialist with full conversation transcript.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2.5 rounded-lg bg-neutral-50 border border-black/10 flex items-center justify-between">
            <div className="text-[11px] text-neutral-600 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-black" />
              <span>Human Guardrail: Instant handoff protocol available</span>
            </div>
            <button
              onClick={handleTriggerEscalation}
              className="px-2.5 py-1 rounded text-[10px] font-mono-code bg-black text-white hover:bg-neutral-800 transition-colors shadow-sm font-medium"
            >
              Test Escalate
            </button>
          </div>
        )}
      </div>

      {/* Mini App Footer */}
      <div className="px-4 py-2 bg-neutral-50 border-t border-black/5 flex items-center justify-between text-[10px] font-mono-code text-neutral-500">
        <span>Prompt Orchestration &amp; Middleware</span>
        <span>Deterministic Fallback Routing</span>
      </div>
    </div>
  );
};
