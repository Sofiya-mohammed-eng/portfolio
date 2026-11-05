import React, { useState, useRef, useEffect } from 'react';
import { portfolioContent } from '../data/content';
import { MessageSquare, X, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const SUGGESTED_CHIPS = [
  'What does Sofiya do?',
  'Tell me about her projects',
  'What certifications does she have?',
  'How can I contact her?',
];

// Helper to render markdown links and raw URLs safely as clickable anchor tags
function renderFormattedText(text: string) {
  // Replace markdown links [label](url) and bare URLs
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)|(https?:\/\/[^\s)]+)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // Markdown link [label](url)
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold text-[#6B4EAE] dark:text-[#A78BFA] hover:opacity-80 break-all"
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      // Bare URL
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold text-[#6B4EAE] dark:text-[#A78BFA] hover:opacity-80 break-all"
        >
          {match[3]}
        </a>
      );
    }
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm Sophie, Sofiya's portfolio assistant. Ask me about her projects, skills, certifications, case studies, or how to reach her.",
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
    const rawText = (textToSend || input).trim();
    if (!rawText || isLoading) return;

    // Client-side input validation and cap (500 chars)
    const text = rawText.slice(0, 500);

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Send the last ~10 messages for context
      const contextMessages = newMessages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content.slice(0, 500),
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          messages: contextMessages,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        let errorText = '';
        const errorCode = data?.error;

        if (response.status === 400 || errorCode === 'bad_request') {
          errorText = data?.message || 'Please keep your message concise (under 500 characters) or start a new conversation.';
        } else if (response.status === 429 || errorCode === 'rate_limited') {
          errorText = "I'm receiving too many messages right now. Please wait a minute before trying again.";
        } else if (response.status === 500 || errorCode === 'missing_api_key') {
          errorText = `The AI service is currently being configured on the server. Please reach out directly to Sofiya at ${portfolioContent.personal.email} in the meantime!`;
        } else if (response.status === 502 || errorCode === 'model_error') {
          errorText = `I ran into a temporary issue with the AI service. Please try asking again in a moment, or email Sofiya directly at ${portfolioContent.personal.email}.`;
        } else if (data?.message) {
          errorText = data.message;
        } else {
          errorText = `I'm having trouble connecting to the server (${response.status}). For immediate inquiries, please email Sofiya directly at ${portfolioContent.personal.email}.`;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now() + 1}`,
            role: 'assistant',
            content: errorText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        return;
      }

      const replyText =
        data?.reply ||
        "I'm here to answer questions about Sofiya's DevSecOps projects, cloud security, and background. Feel free to ask!";

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      // Graceful error message without crashing (network or unknown error)
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: `I'm having trouble connecting to the server right now. For any immediate inquiries, please email Sofiya directly at ${portfolioContent.personal.email} or connect on [LinkedIn](${portfolioContent.personal.linkedin}).`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          "Hi! I'm Sophie, Sofiya's portfolio assistant. Ask me about her projects, skills, certifications, case studies, or how to reach her.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button: bottom-right corner */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-[#6B4EAE] ${
            isOpen
              ? 'bg-[#2E2142] dark:bg-[#2A1F3D] text-white border border-[#D8C9B3] dark:border-[#3D2F57]'
              : 'bg-[#6B4EAE] dark:bg-[#A78BFA] hover:bg-[#593E94] dark:hover:bg-[#926be6] text-white dark:text-[#1B1326] hover:scale-105'
          }`}
          aria-label={isOpen ? 'Close Ask Sophie' : 'Ask Sophie'}
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4" />
              <span>Close Sophie</span>
            </>
          ) : (
            <>
              <Bot className="w-4 h-4" />
              <span>Ask Sophie</span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 left-4 sm:left-auto sm:w-[410px] z-50 bg-[#FAF6F0] dark:bg-[#1B1326] border border-[#D8C9B3] dark:border-[#3D2F57] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] max-h-[82vh] animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-[#EBE1D2] dark:bg-[#2A1F3D] border-b border-[#D8C9B3] dark:border-[#3D2F57] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#6B4EAE] dark:bg-[#A78BFA] text-white dark:text-[#1B1326] flex items-center justify-center shadow-2xs font-bold text-xs">
                S
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2E2142] dark:text-[#EBE1D2] leading-tight font-heading">
                  Ask Sophie
                </h3>
                <p className="text-[11px] text-[#5E5470] dark:text-[#BDB0CC]">
                  Ask anything about Sofiya's portfolio
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#2E2142] dark:hover:text-[#EBE1D2] rounded-md hover:bg-[#FAF6F0]/60 dark:hover:bg-[#1B1326]/60 transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#2E2142] dark:hover:text-[#EBE1D2] rounded-md hover:bg-[#FAF6F0]/60 dark:hover:bg-[#1B1326]/60 transition-colors"
                aria-label="Close Ask Sophie"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF6F0] dark:bg-[#1B1326]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-md bg-[#6B4EAE] dark:bg-[#A78BFA] text-white dark:text-[#1B1326] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    S
                  </div>
                )}

                <div
                  className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#6B4EAE] dark:bg-[#A78BFA] text-white dark:text-[#1B1326] rounded-br-xs'
                      : 'bg-[#EBE1D2]/70 dark:bg-[#2A1F3D] text-[#2E2142] dark:text-[#EBE1D2] border border-[#D8C9B3]/70 dark:border-[#3D2F57] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {renderFormattedText(msg.content)}
                  </p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      msg.role === 'user'
                        ? 'text-white/70 dark:text-[#1B1326]/70'
                        : 'text-[#5E5470] dark:text-[#BDB0CC]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-md bg-[#2E2142] dark:bg-[#3D2F57] text-[#FAF6F0] dark:text-[#EBE1D2] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-[#5E5470] dark:text-[#BDB0CC]">
                <div className="w-7 h-7 rounded-md bg-[#6B4EAE] dark:bg-[#A78BFA] text-white dark:text-[#1B1326] flex items-center justify-center shrink-0 font-bold text-xs">
                  S
                </div>
                <div className="bg-[#EBE1D2]/60 dark:bg-[#2A1F3D] px-3 py-2 rounded-xl border border-[#D8C9B3]/60 dark:border-[#3D2F57] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#6B4EAE] dark:text-[#A78BFA] animate-spin" />
                  <span>Sophie is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Question Chips */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-[#D8C9B3]/50 dark:border-[#3D2F57] bg-[#EBE1D2]/30 dark:bg-[#2A1F3D]/50 flex flex-wrap gap-1.5">
              {SUGGESTED_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-[#FAF6F0] dark:bg-[#1B1326] hover:bg-white dark:hover:bg-[#2A1F3D] text-[#2E2142] dark:text-[#EBE1D2] border border-[#D8C9B3] dark:border-[#3D2F57] transition-colors text-left"
                >
                  {chip}
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
            className="p-3 bg-[#FAF6F0] dark:bg-[#1B1326] border-t border-[#D8C9B3] dark:border-[#3D2F57] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              maxLength={500}
              placeholder="Ask Sophie about projects, skills, or contact..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-[#2A1F3D] border border-[#D8C9B3] dark:border-[#3D2F57] text-[#2E2142] dark:text-[#EBE1D2] placeholder-[#5E5470]/60 dark:placeholder-[#BDB0CC]/60 focus:border-[#6B4EAE] dark:focus:border-[#A78BFA] focus:outline-none focus:ring-1 focus:ring-[#6B4EAE]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-xl bg-[#6B4EAE] dark:bg-[#A78BFA] hover:bg-[#593E94] dark:hover:bg-[#926be6] disabled:opacity-40 text-white dark:text-[#1B1326] transition-colors"
              aria-label="Send message to Sophie"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
