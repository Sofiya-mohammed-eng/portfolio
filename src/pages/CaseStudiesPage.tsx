import React from 'react';
import { portfolioContent, CaseStudy } from '../data/content';
import { AlertCircle, FileSpreadsheet, CheckCircle2, Info, Building, Lock } from 'lucide-react';

export const CaseStudiesPage: React.FC = () => {
  const caseStudies = portfolioContent.caseStudies;

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="space-y-3 mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-[#6B4EAE] dark:text-[#A78BFA] uppercase tracking-wider">
          <span>04</span>
          <span aria-hidden="true">/</span>
          <span>Security Audit & Assessment Engagements</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E2142] dark:text-[#EBE1D2] tracking-tight">
          Security Case Studies
        </h1>

        {/* Mandatory Transparency Disclaimer */}
        <div className="mt-4 p-4 rounded-xl bg-[#EBE1D2]/50 dark:bg-[#2A1F3D]/60 border border-[#D8C9B3] dark:border-[#3D2F57] flex items-start gap-3 text-xs text-[#5E5470] dark:text-[#BDB0CC] max-w-3xl">
          <Info className="w-4 h-4 text-[#6B4EAE] dark:text-[#A78BFA] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#2E2142] dark:text-[#EBE1D2]">Engagement Notice:</strong> Internal security assessment and remediation engagements, not independently certified audits; client details anonymized.
          </p>
        </div>
      </div>

      {/* Structured Case Studies List */}
      <div className="space-y-8">
        {caseStudies.map((study: CaseStudy, idx: number) => (
          <article
            key={study.id}
            className="rounded-2xl bg-[#FAF6F0] dark:bg-[#2A1F3D]/80 border border-[#D8C9B3] dark:border-[#3D2F57] p-6 sm:p-8 space-y-6 hover:border-[#6B4EAE]/50 dark:hover:border-[#A78BFA]/50 transition-all shadow-2xs"
          >
            {/* Header with Title and Framework Badges */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-6 border-b border-[#D8C9B3]/70 dark:border-[#3D2F57]">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#5E5470] dark:text-[#BDB0CC]">
                  <span className="font-mono font-bold text-[#6B4EAE] dark:text-[#A78BFA]">0{idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    <span>Industry: {study.industry}</span>
                  </span>
                  {study.metricsBadge && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono font-semibold text-[#6B4EAE] dark:text-[#A78BFA] bg-[#C9B8EA]/30 dark:bg-[#A78BFA]/20 px-2 py-0.5 rounded">
                        {study.metricsBadge}
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#2E2142] dark:text-[#EBE1D2]">
                  {study.title}
                </h2>
              </div>

              {/* Framework Badges */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {study.frameworks.map((fw) => (
                  <span
                    key={fw}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#EBE1D2] dark:bg-[#1B1326] text-[#2E2142] dark:text-[#EBE1D2] border border-[#D8C9B3] dark:border-[#3D2F57]"
                  >
                    <Lock className="w-3 h-3 text-[#6B4EAE] dark:text-[#A78BFA]" />
                    <span>{fw}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 4-Part Structured Grid: Scope, Frameworks, Findings, Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Part 1: Scope */}
              <div className="p-5 rounded-xl bg-[#EBE1D2]/30 dark:bg-[#1B1326]/60 border border-[#D8C9B3]/60 dark:border-[#3D2F57] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6B4EAE] dark:text-[#A78BFA] flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Assessment Scope</span>
                </div>
                <p className="text-sm text-[#2E2142] dark:text-[#EBE1D2] leading-relaxed">
                  {study.scope}
                </p>
              </div>

              {/* Part 2: Findings */}
              <div className="p-5 rounded-xl bg-[#EBE1D2]/30 dark:bg-[#1B1326]/60 border border-[#D8C9B3]/60 dark:border-[#3D2F57] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6B4EAE] dark:text-[#A78BFA] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Key Findings Identified</span>
                </div>
                <ul className="space-y-1.5 text-sm text-[#2E2142] dark:text-[#EBE1D2]">
                  {study.findings.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#6B4EAE] dark:text-[#A78BFA] font-bold">›</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Part 3: Outcome */}
            <div className="p-5 rounded-xl bg-[#FAF6F0] dark:bg-[#1B1326]/70 border border-[#D8C9B3] dark:border-[#3D2F57] space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#6B4EAE] dark:text-[#A78BFA] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Remediation & Outcome</span>
              </div>
              <p className="text-sm text-[#2E2142] dark:text-[#EBE1D2] leading-relaxed">
                {study.outcome}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Mandatory Note at Bottom */}
      <div className="mt-12 p-6 rounded-2xl bg-[#EBE1D2]/40 dark:bg-[#2A1F3D]/50 border border-dashed border-[#D8C9B3] dark:border-[#3D2F57] text-center space-y-2">
        <p className="text-sm font-medium text-[#2E2142] dark:text-[#EBE1D2]">
          "Architecture diagrams, before-and-after configurations, and redacted reports coming soon."
        </p>
        <p className="text-xs text-[#5E5470] dark:text-[#BDB0CC]">
          Comprehensive technical walkthroughs, sanitized Terraform diffs, and remediation artifacts will be published following non-disclosure review.
        </p>
      </div>
    </div>
  );
};
