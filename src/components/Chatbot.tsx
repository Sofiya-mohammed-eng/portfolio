import React, { useState, useRef, useEffect } from 'react';
import { portfolioContent } from '../data/content';
import { MessageSquare, X, Send, Bot, User, Sparkles, Shield, RotateCcw } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  'Tell me about the DevSecOps pipeline',
  "What are Sofiya's certifications?",
  'Explain the AI Agent Security Lab',
  'How can I get in touch with Sofiya?',
];

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm Sofiya's portfolio assistant. Ask me anything about Sofiya's DevSecOps experience, cloud security architecture, certifications, or open-source projects!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: data.reply || "I'm happy to help answer any questions about Sofiya's DevSecOps portfolio.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      // Graceful instant knowledge fallback
      let fallbackAnswer = `Sofiya is a DevSecOps & Cloud Security Engineer based in Addis Ababa, Ethiopia. She specializes in automated CI/CD security pipelines (with 6 parallel checks), multi-cloud Terraform, and AI system defense.`;
      
      const lower = text.toLowerCase();
      if (lower.includes('certif')) {
        fallbackAnswer = `Sofiya holds three industry certifications: CompTIA Security+ (2026), AWS Certified Security – Specialty (2026), and Junior Cybersecurity Analyst from Cisco Networking Academy (2025). Check out the /skills page for details!`;
      } else if (lower.includes('pipeline') || lower.includes('cicd') || lower.includes('devsecops')) {
        fallbackAnswer = `Sofiya's DevSecOps CI/CD pipeline implements 6 parallel gates: (1) ESLint & Jest Unit Tests, (2) CodeQL SAST, (3) Gitleaks secret detection, (4) Trivy dependency scan, (5) Checkov IaC scan on the Dockerfile, and (6) Docker multi-stage build with Syft SBOM generation!`;
      } else if (lower.includes('agent') || lower.includes('ai') || lower.includes('datadog')) {
        fallbackAnswer = `The AI Agent Security Lab is a tool-calling AI agent instrumented with Datadog LLM Observability (ddtrace). It features sandboxed calculator tools, local knowledge lookups, threat models, and documented findings including hallucination prevention!`;
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) {
        fallbackAnswer = `You can contact Sofiya directly via email at ${portfolioContent.personal.email}, connect on LinkedIn (sofiya-mohammed-hassen-420139244), or visit the /contact page for a prefilled inquiry form!`;
      }

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: fallbackAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Chat history reset. How can I help you explore Sofiya's portfolio?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 left-5 sm:left-auto sm:right-24 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-[#6B4EAE] ${
            isOpen
              ? 'bg-[#2E2142] text-white'
              : 'bg-[#6B4EAE] hover:bg-[#593E94] text-white hover:scale-105'
          }`}
          aria-label={isOpen ? 'Close portfolio chatbot' : 'Open portfolio chatbot'}
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4" />
              <span>Close Assistant</span>
            </>
          ) : (
            <>
              <Bot className="w-4 h-4" />
              <span>Ask Sofiya's AI</span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-[400px] z-50 bg-[#FAF6F0] border border-[#D8C9B3] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] max-h-[82vh] animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-[#EBE1D2] border-b border-[#D8C9B3] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#6B4EAE] text-white flex items-center justify-center shadow-2xs">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2E2142] leading-tight font-heading">
                  Security Portfolio Assistant
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-[#5E5470]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Powered by Gemini · DevSecOps Grounded</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-[#5E5470] hover:text-[#2E2142] rounded-md hover:bg-[#FAF6F0]/60 transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#5E5470] hover:text-[#2E2142] rounded-md hover:bg-[#FAF6F0]/60 transition-colors"
                aria-label="Close assistant dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-md bg-[#6B4EAE] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#6B4EAE] text-white rounded-br-xs'
                      : 'bg-[#EBE1D2]/70 text-[#2E2142] border border-[#D8C9B3]/70 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      msg.role === 'user' ? 'text-white/70' : 'text-[#5E5470]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-md bg-[#2E2142] text-[#FAF6F0] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-[#5E5470]">
                <div className="w-7 h-7 rounded-md bg-[#6B4EAE] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#EBE1D2]/60 px-3 py-2 rounded-xl border border-[#D8C9B3]/60 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#6B4EAE] animate-spin" />
                  <span>Consulting security knowledge base...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-[#D8C9B3]/50 bg-[#EBE1D2]/30 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-[#FAF6F0] hover:bg-white text-[#2E2142] border border-[#D8C9B3] transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#FAF6F0] border-t border-[#D8C9B3] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about Sofiya's skills or projects..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white border border-[#D8C9B3] text-[#2E2142] placeholder-[#5E5470]/60 focus:border-[#6B4EAE] focus:outline-none focus:ring-1 focus:ring-[#6B4EAE]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-xl bg-[#6B4EAE] hover:bg-[#593E94] disabled:opacity-40 text-white transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
