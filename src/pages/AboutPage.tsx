import React from 'react';
import { portfolioContent } from '../data/content';
import { ProfileImage } from '../components/ProfileImage';
import { MapPin, Mail, Github, Linkedin, Shield, CheckCircle, ArrowRight, Server, FileCheck, Brain } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header kicker */}
      <div className="space-y-2 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[#6B4EAE] uppercase tracking-wider">
          <span>01</span>
          <span aria-hidden="true">/</span>
          <span>Background & Focus</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E2142] tracking-tight">
          About Sofiya Mohammed
        </h1>
        <p className="text-base text-[#5E5470] max-w-2xl">
          DevSecOps Engineer & Cloud Security Specialist based in Addis Ababa, Ethiopia.
        </p>
      </div>

      {/* Main Bio Grid with Organic Blob Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Left Column: Portrait */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <ProfileImage size="lg" />
          <div className="mt-6 text-center space-y-2">
            <h3 className="font-bold text-lg text-[#2E2142]">
              {portfolioContent.personal.name}
            </h3>
            <p className="text-xs font-medium text-[#5E5470]">
              {portfolioContent.personal.role}
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#5E5470] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#6B4EAE]" />
              <span>{portfolioContent.personal.location}</span>
            </div>

            {/* Social links */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <a
                href={portfolioContent.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#EBE1D2] hover:bg-[#D8C9B3] text-[#2E2142] transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioContent.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#EBE1D2] hover:bg-[#D8C9B3] text-[#6B4EAE] transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioContent.personal.email}`}
                className="p-2 rounded-lg bg-[#EBE1D2] hover:bg-[#D8C9B3] text-[#6B4EAE] transition-colors"
                aria-label="Email address"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Exact Specified Bio Text & Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl bg-[#EBE1D2]/40 border border-[#D8C9B3] p-6 sm:p-8 space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-[#2E2142] leading-snug">
              "Building resilient systems, automating workflows, and integrating security throughout the lifecycle."
            </h2>

            {/* EXACT BIO TEXT FROM SPEC */}
            <p className="text-base text-[#2E2142] leading-relaxed">
              {portfolioContent.personal.aboutBio}
            </p>

            <div className="pt-4 border-t border-[#D8C9B3]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5E5470]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6B4EAE]" />
                <span className="font-medium text-[#2E2142]">Status:</span>
                <span>{portfolioContent.personal.availability}</span>
              </div>
            </div>
          </div>

          {/* Core Guiding Principles */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-[#2E2142]">
              Engineering Principles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2E2142]">
                  <Server className="w-4 h-4 text-[#6B4EAE]" />
                  <span>Shift-Left Enforcement</span>
                </div>
                <p className="text-xs text-[#5E5470] leading-relaxed">
                  Security isn't a post-production gateway; it starts at the pull request with automated SAST, secret leak prevention, and IaC linting.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2E2142]">
                  <Shield className="w-4 h-4 text-[#6B4EAE]" />
                  <span>Least-Privilege by Default</span>
                </div>
                <p className="text-xs text-[#5E5470] leading-relaxed">
                  Every IAM role, service account, and container environment must run under strict least privilege with continuous audit logging.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2E2142]">
                  <FileCheck className="w-4 h-4 text-[#6B4EAE]" />
                  <span>Reproducible Infrastructure</span>
                </div>
                <p className="text-xs text-[#5E5470] leading-relaxed">
                  All cloud topologies across AWS, GCP, and Azure written as deterministic, modular Terraform with automated fmt, init, and validation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2E2142]">
                  <Brain className="w-4 h-4 text-[#6B4EAE]" />
                  <span>Transparent AI Threat Modeling</span>
                </div>
                <p className="text-xs text-[#5E5470] leading-relaxed">
                  Sandboxed agent tools, prompt injection boundaries, and honest testing of LLM hallucinations instrumented with Datadog observability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="mt-8 pt-8 border-t border-[#D8C9B3]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-[#5E5470]">
          Interested in seeing these principles implemented in working code?
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#6B4EAE] text-white hover:bg-[#593E94] transition-colors"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('/skills')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#EBE1D2] text-[#2E2142] border border-[#D8C9B3] hover:bg-[#FAF6F0] transition-colors"
          >
            <span>Certifications & Skills</span>
          </button>
        </div>
      </div>
    </div>
  );
};
