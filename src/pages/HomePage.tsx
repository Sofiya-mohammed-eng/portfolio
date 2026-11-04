import React from 'react';
import { portfolioContent } from '../data/content';
import { ProfileImage } from '../components/ProfileImage';
import { ArrowRight, Shield, Terminal, Cloud, Lock, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="relative z-10 w-full">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#5E5470]">
              <span className="font-semibold text-[#6B4EAE]">{portfolioContent.personal.name}</span>
              <span aria-hidden="true">·</span>
              <span>{portfolioContent.personal.role}</span>
              <span aria-hidden="true">·</span>
              <span>{portfolioContent.personal.location}</span>
            </div>

            {/* Tagline Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2E2142] tracking-tight leading-[1.1] text-balance">
              {portfolioContent.personal.tagline}
            </h1>

            {/* Subline */}
            <p className="text-lg sm:text-xl text-[#5E5470] max-w-xl font-normal leading-relaxed">
              {portfolioContent.personal.subline}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('/projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6B4EAE] hover:bg-[#593E94] text-white font-medium text-sm transition-all shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B4EAE]"
              >
                <span>View projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EBE1D2] hover:bg-[#FAF6F0] text-[#2E2142] border border-[#D8C9B3] font-medium text-sm transition-all shadow-2xs focus-visible:outline-2 focus-visible:outline-[#6B4EAE]"
              >
                <span>Get in touch</span>
              </button>
            </div>

            {/* Quick security principles list */}
            <div className="pt-6 border-t border-[#D8C9B3]/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5E5470]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6B4EAE] shrink-0 mt-0.5" />
                <span>Zero Hardcoded Secrets & SAST Gateways</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6B4EAE] shrink-0 mt-0.5" />
                <span>Multi-Cloud Verified Terraform Modules</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6B4EAE] shrink-0 mt-0.5" />
                <span>Observability & Datadog LLM Security</span>
              </div>
            </div>
          </div>

          {/* Right Column: Organic Blob Photo & 3D Interactive Anchor */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative group">
              <ProfileImage size="lg" />

              {/* Interactive 3D callout marker */}
              <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6F0]/90 border border-[#D8C9B3] text-xs text-[#5E5470] shadow-2xs backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#6B4EAE]" />
                <span>Interactive 3D space: Move cursor to orbit faceted core</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Architecture Pillars */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#D8C9B3]/70">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono text-[#6B4EAE] uppercase tracking-wider mb-1">
              Core Engineering Focus
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2E2142]">
              Secure Engineering Disciplines
            </h2>
          </div>
          <p className="text-sm text-[#5E5470] max-w-md">
            Holistic cloud defense from code repository pull-requests to multi-cloud runtime containers and LLM applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="rounded-2xl bg-[#EBE1D2]/40 border border-[#D8C9B3] p-6 hover:bg-[#EBE1D2]/70 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] flex items-center justify-center text-[#6B4EAE]">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#2E2142]">
                DevSecOps & Automated CI/CD
              </h3>
              <p className="text-sm text-[#5E5470] leading-relaxed">
                Implementing shift-left security checks directly into GitHub Actions with CodeQL SAST, Gitleaks, Trivy container scanning, and automated Syft SBOM generation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#D8C9B3]/50 flex items-center justify-between text-xs text-[#5E5470]">
              <span>6 Parallel Checks</span>
              <button
                onClick={() => onNavigate('/projects')}
                className="text-[#6B4EAE] font-semibold hover:underline"
              >
                Inspect Pipeline →
              </button>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-2xl bg-[#EBE1D2]/40 border border-[#D8C9B3] p-6 hover:bg-[#EBE1D2]/70 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] flex items-center justify-center text-[#6B4EAE]">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#2E2142]">
                Multi-Cloud & Infrastructure as Code
              </h3>
              <p className="text-sm text-[#5E5470] leading-relaxed">
                Reference implementations across AWS, GCP, and Azure with idempotent Terraform modules for IAM least-privilege, network isolation, Kubernetes, and encrypted storage.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#D8C9B3]/50 flex items-center justify-between text-xs text-[#5E5470]">
              <span>AWS · GCP · Azure</span>
              <button
                onClick={() => onNavigate('/projects')}
                className="text-[#6B4EAE] font-semibold hover:underline"
              >
                Explore Modules →
              </button>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-2xl bg-[#EBE1D2]/40 border border-[#D8C9B3] p-6 hover:bg-[#EBE1D2]/70 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] flex items-center justify-center text-[#6B4EAE]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#2E2142]">
                AI & Agent Security Lab
              </h3>
              <p className="text-sm text-[#5E5470] leading-relaxed">
                Sandboxed tool execution, prompt injection defense, and end-to-end tracing with Datadog LLM Observability to uncover real threat models and failure cases.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#D8C9B3]/50 flex items-center justify-between text-xs text-[#5E5470]">
              <span>OWASP Top 10 for LLM</span>
              <button
                onClick={() => onNavigate('/projects')}
                className="text-[#6B4EAE] font-semibold hover:underline"
              >
                View Threat Model →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono text-[#6B4EAE] uppercase tracking-wider mb-1">
              Production Code
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2E2142]">
              Featured Projects
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/projects')}
            className="text-xs sm:text-sm font-semibold text-[#6B4EAE] hover:underline flex items-center gap-1"
          >
            <span>All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {portfolioContent.projects.map((project, idx) => (
            <div
              key={project.id}
              className="rounded-2xl bg-[#FAF6F0] border border-[#D8C9B3] p-6 hover:border-[#6B4EAE]/60 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#5E5470]">
                  <span className="text-[#6B4EAE]">0{idx + 1}</span>
                  <span aria-hidden="true">/</span>
                  <span>{project.stack.join(' · ')}</span>
                </div>
                <h3 className="text-lg font-bold text-[#2E2142]">
                  {project.title}
                </h3>
                <p className="text-sm text-[#5E5470] leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                <button
                  onClick={() => onNavigate('/projects')}
                  className="px-4 py-2 rounded-lg bg-[#EBE1D2] hover:bg-[#FAF6F0] text-[#2E2142] border border-[#D8C9B3] text-xs font-semibold transition-colors"
                >
                  Inspect Architecture
                </button>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#5E5470] hover:text-[#6B4EAE] flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Call to Action Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-[#EBE1D2] via-[#FAF6F0] to-[#EBE1D2] border border-[#D8C9B3] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#6B4EAE] text-white flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2E2142]">
            Ready to secure your cloud environments?
          </h2>
          <p className="text-sm sm:text-base text-[#5E5470] max-w-xl mx-auto leading-relaxed">
            {portfolioContent.personal.availability}
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 rounded-xl bg-[#6B4EAE] hover:bg-[#593E94] text-white text-sm font-semibold transition-colors shadow-2xs"
            >
              Get in Touch
            </button>
            <button
              onClick={() => onNavigate('/case-studies')}
              className="px-6 py-3 rounded-xl bg-[#FAF6F0] hover:bg-white text-[#2E2142] border border-[#D8C9B3] text-sm font-semibold transition-colors shadow-2xs"
            >
              Review Case Studies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
