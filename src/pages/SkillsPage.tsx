import React, { useState } from 'react';
import { portfolioContent } from '../data/content';
import { Award, ShieldCheck, Terminal, Cpu, Wrench, CheckCircle, Calendar, Building2 } from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const { domains, tools } = portfolioContent.skills;
  const certifications = portfolioContent.certifications;

  const domainIcons: Record<string, typeof Terminal> = {
    'DevSecOps & Cloud Engineering': Terminal,
    'Cybersecurity & Security Operations': ShieldCheck,
    'AI Security & Emerging Technologies': Cpu,
  };

  const filteredDomains =
    activeTab === 'all'
      ? domains
      : domains.filter((d) => d.title.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="space-y-2 mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-[#6B4EAE] dark:text-[#A78BFA] uppercase tracking-wider">
          <span>03</span>
          <span aria-hidden="true">/</span>
          <span>Core Competencies & Credentials</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E2142] dark:text-[#EBE1D2] tracking-tight">
          Skills & Certifications
        </h1>
        <p className="text-base text-[#5E5470] dark:text-[#BDB0CC] max-w-2xl leading-relaxed">
          Comprehensive technical proficiencies across cloud infrastructure security, automated pipeline controls, AI threat modeling, and industry-standard security certifications.
        </p>
      </div>

      {/* Interactive Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#EBE1D2]/60 dark:bg-[#2A1F3D] border border-[#D8C9B3] dark:border-[#3D2F57] max-w-fit mb-10 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-[#FAF6F0] dark:bg-[#1B1326] text-[#6B4EAE] dark:text-[#A78BFA] shadow-2xs'
              : 'text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#2E2142] dark:hover:text-[#EBE1D2]'
          }`}
        >
          All Domains
        </button>
        <button
          onClick={() => setActiveTab('DevSecOps')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'DevSecOps'
              ? 'bg-[#FAF6F0] dark:bg-[#1B1326] text-[#6B4EAE] dark:text-[#A78BFA] shadow-2xs'
              : 'text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#2E2142] dark:hover:text-[#EBE1D2]'
          }`}
        >
          DevSecOps & Cloud
        </button>
        <button
          onClick={() => setActiveTab('Cybersecurity')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'Cybersecurity'
              ? 'bg-[#FAF6F0] dark:bg-[#1B1326] text-[#6B4EAE] dark:text-[#A78BFA] shadow-2xs'
              : 'text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#2E2142] dark:hover:text-[#EBE1D2]'
          }`}
        >
          Security Operations
        </button>
        <button
          onClick={() => setActiveTab('AI')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'AI'
              ? 'bg-[#FAF6F0] dark:bg-[#1B1326] text-[#6B4EAE] dark:text-[#A78BFA] shadow-2xs'
              : 'text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#2E2142] dark:hover:text-[#EBE1D2]'
          }`}
        >
          AI Security & LLMs
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'tools'
              ? 'bg-[#FAF6F0] dark:bg-[#1B1326] text-[#6B4EAE] dark:text-[#A78BFA] shadow-2xs'
              : 'text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#2E2142] dark:hover:text-[#EBE1D2]'
          }`}
        >
          Tools Stack
        </button>
      </div>

      {/* Main Skills Domain Sections */}
      {activeTab !== 'tools' && (
        <div className="space-y-8 mb-16">
          {filteredDomains.map((domain) => {
            const Icon = domainIcons[domain.title] || Terminal;

            return (
              <section
                key={domain.title}
                className="rounded-2xl bg-[#FAF6F0] dark:bg-[#2A1F3D]/80 border border-[#D8C9B3] dark:border-[#3D2F57] p-6 sm:p-8 hover:border-[#6B4EAE]/40 dark:hover:border-[#A78BFA]/40 transition-all"
              >
                <div className="flex items-center gap-3 pb-5 border-b border-[#D8C9B3]/70 dark:border-[#3D2F57]">
                  <div className="w-9 h-9 rounded-lg bg-[#EBE1D2] dark:bg-[#1B1326] border border-[#D8C9B3] dark:border-[#3D2F57] flex items-center justify-center text-[#6B4EAE] dark:text-[#A78BFA]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2E2142] dark:text-[#EBE1D2]">
                      {domain.title}
                    </h2>
                    <span className="text-xs text-[#5E5470] dark:text-[#BDB0CC]">
                      {domain.skills.length} core competencies
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-6">
                  {domain.skills.map((skill) => (
                    <div
                      key={skill}
                      className="p-3.5 rounded-xl bg-[#EBE1D2]/35 dark:bg-[#1B1326]/60 border border-[#D8C9B3]/60 dark:border-[#3D2F57] flex items-start gap-2.5 hover:bg-[#EBE1D2]/70 dark:hover:bg-[#1B1326] transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 text-[#6B4EAE] dark:text-[#A78BFA] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[#2E2142] dark:text-[#EBE1D2]">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Tools Section */}
      {(activeTab === 'all' || activeTab === 'tools') && (
        <section className="mb-16 rounded-2xl bg-[#EBE1D2]/30 dark:bg-[#2A1F3D]/50 border border-[#D8C9B3] dark:border-[#3D2F57] p-6 sm:p-8">
          <div className="flex items-center gap-3 pb-5 border-b border-[#D8C9B3]/70 dark:border-[#3D2F57]">
            <div className="w-9 h-9 rounded-lg bg-[#FAF6F0] dark:bg-[#1B1326] border border-[#D8C9B3] dark:border-[#3D2F57] flex items-center justify-center text-[#6B4EAE] dark:text-[#A78BFA]">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2E2142] dark:text-[#EBE1D2]">
                Tools & Technology Ecosystem
              </h2>
              <span className="text-xs text-[#5E5470] dark:text-[#BDB0CC]">
                Categorized infrastructure, security, monitoring, and developer tooling
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {tools.map((group) => (
              <div
                key={group.category}
                className="p-5 rounded-xl bg-[#FAF6F0] dark:bg-[#1B1326]/80 border border-[#D8C9B3] dark:border-[#3D2F57] space-y-3"
              >
                <div className="text-xs font-mono font-bold text-[#6B4EAE] dark:text-[#A78BFA] uppercase tracking-wider">
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded bg-[#EBE1D2]/60 dark:bg-[#2A1F3D] text-[#2E2142] dark:text-[#EBE1D2] font-mono border border-[#D8C9B3]/50 dark:border-[#3D2F57]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      <section className="pt-8 border-t border-[#D8C9B3]/80 dark:border-[#3D2F57]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono text-[#6B4EAE] dark:text-[#A78BFA] uppercase tracking-wider mb-1">
              Industry Validated
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2E2142] dark:text-[#EBE1D2]">
              Professional Certifications
            </h2>
          </div>
          <span className="text-xs text-[#5E5470] dark:text-[#BDB0CC]">
            Configured centrally in /data/content.ts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl bg-[#FAF6F0] dark:bg-[#2A1F3D]/80 border border-[#D8C9B3] dark:border-[#3D2F57] p-6 flex flex-col justify-between hover:border-[#6B4EAE]/60 dark:hover:border-[#A78BFA]/60 hover:shadow-xs transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EBE1D2] dark:bg-[#1B1326] border border-[#D8C9B3] dark:border-[#3D2F57] flex items-center justify-center text-[#6B4EAE] dark:text-[#A78BFA]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#6B4EAE] dark:text-[#A78BFA] bg-[#C9B8EA]/20 dark:bg-[#A78BFA]/20 px-2.5 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="tabular-nums font-semibold">{cert.year}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#2E2142] dark:text-[#EBE1D2] leading-snug">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-[#5E5470] dark:text-[#BDB0CC]">
                  <Building2 className="w-3.5 h-3.5 text-[#6B4EAE] dark:text-[#A78BFA]" />
                  <span>{cert.issuer}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D8C9B3]/50 dark:border-[#3D2F57] flex items-center justify-between text-xs text-[#5E5470] dark:text-[#BDB0CC]">
                <span>Status: Active</span>
                <span className="font-semibold text-[#6B4EAE] dark:text-[#A78BFA]">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
