import React, { useState } from 'react';
import { portfolioContent } from '../data/content';
import { Mail, Copy, Check, Send, Github, Linkedin, MapPin, Shield, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioContent.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`
    );
    const mailtoBody = encodeURIComponent(
      `Hello Sofiya,\n\n${formData.message}\n\n---\nFrom: ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${portfolioContent.personal.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="space-y-3 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[#6B4EAE] uppercase tracking-wider">
          <span>05</span>
          <span aria-hidden="true">/</span>
          <span>Initiate Communication</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E2142] tracking-tight">
          {portfolioContent.contact.heading}
        </h1>
        <p className="text-base text-[#5E5470] max-w-2xl leading-relaxed">
          {portfolioContent.contact.text}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact Info & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Email Card with Copy Button */}
          <div className="p-6 rounded-2xl bg-[#EBE1D2]/50 border border-[#D8C9B3] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#6B4EAE] font-semibold uppercase tracking-wider">
                Direct Email
              </span>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF6F0] hover:bg-white text-xs font-semibold text-[#2E2142] border border-[#D8C9B3] transition-colors focus-visible:outline-2 focus-visible:outline-[#6B4EAE]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#6B4EAE]" />
                    <span>Copy email</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={`mailto:${portfolioContent.personal.email}`}
              className="text-lg sm:text-xl font-bold text-[#2E2142] hover:text-[#6B4EAE] transition-colors block break-all font-mono"
            >
              {portfolioContent.personal.email}
            </a>

            <p className="text-xs text-[#5E5470] leading-relaxed">
              Feel free to reach out directly via your preferred email client or copy the address above.
            </p>
          </div>

          {/* Social Profiles & Details */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D8C9B3] space-y-4">
            <span className="text-xs font-mono text-[#5E5470] uppercase tracking-wider block">
              Professional Profiles & Location
            </span>

            <div className="space-y-3 text-sm">
              <a
                href={portfolioContent.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#EBE1D2]/40 hover:bg-[#EBE1D2]/80 border border-[#D8C9B3]/60 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-[#6B4EAE]" />
                  <span className="font-medium text-[#2E2142]">LinkedIn Profile</span>
                </div>
                <span className="text-xs text-[#6B4EAE] group-hover:underline">Connect →</span>
              </a>

              <a
                href={portfolioContent.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#EBE1D2]/40 hover:bg-[#EBE1D2]/80 border border-[#D8C9B3]/60 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-[#2E2142]" />
                  <span className="font-medium text-[#2E2142]">GitHub Repositories</span>
                </div>
                <span className="text-xs text-[#6B4EAE] group-hover:underline">Explore →</span>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3]/60 text-[#5E5470]">
                <MapPin className="w-4 h-4 text-[#6B4EAE] shrink-0" />
                <span>{portfolioContent.personal.location}</span>
              </div>
            </div>
          </div>

          {/* Availability note */}
          <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] text-xs text-[#5E5470] flex items-start gap-3">
            <Shield className="w-4 h-4 text-[#6B4EAE] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Available for full-time cloud security engineering roles, DevSecOps infrastructure contracts, and security architecture reviews.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-[#FAF6F0] border border-[#D8C9B3] space-y-5 shadow-2xs"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-[#D8C9B3]/60 text-xs font-semibold uppercase tracking-wider text-[#6B4EAE]">
              <MessageSquare className="w-4 h-4" />
              <span>Send a Message (Prefilled Email Client)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-[#2E2142]"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] text-sm text-[#2E2142] placeholder-[#5E5470]/50 focus:border-[#6B4EAE] focus:outline-none focus:ring-1 focus:ring-[#6B4EAE] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-[#2E2142]"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] text-sm text-[#2E2142] placeholder-[#5E5470]/50 focus:border-[#6B4EAE] focus:outline-none focus:ring-1 focus:ring-[#6B4EAE] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="subject"
                className="block text-xs font-semibold text-[#2E2142]"
              >
                Subject / Project Scope
              </label>
              <input
                id="subject"
                type="text"
                required
                placeholder="Cloud Security Review / DevSecOps Pipeline / Collaboration"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] text-sm text-[#2E2142] placeholder-[#5E5470]/50 focus:border-[#6B4EAE] focus:outline-none focus:ring-1 focus:ring-[#6B4EAE] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-[#2E2142]"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                placeholder="Describe your organization, requirements, or what you would like to collaborate on..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] text-sm text-[#2E2142] placeholder-[#5E5470]/50 focus:border-[#6B4EAE] focus:outline-none focus:ring-1 focus:ring-[#6B4EAE] transition-all resize-y"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#6B4EAE] hover:bg-[#593E94] text-white text-sm font-semibold transition-all shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B4EAE]"
              >
                <Send className="w-4 h-4" />
                <span>Launch Email Client</span>
              </button>
              <p className="mt-2 text-[11px] text-[#5E5470]">
                Clicking opens your default email application prefilled with your message. No credentials or server required.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
