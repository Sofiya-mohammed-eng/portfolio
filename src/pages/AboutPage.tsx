import React from 'react';
import { portfolioContent } from '../data/content';
import { ProfileImage } from '../components/ProfileImage';
import { MapPin, Mail, Github, Linkedin, Shield, ArrowRight, Server, FileCheck, Brain } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header kicker */}
      <div className="space-y-2 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[#6B4EAE] dark:text-[#A78BFA] uppercase tracking-wider">
          <span>01</span>
          <span aria-hidden="true">/</span>
          <span>Background & Focus</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E2142] dark:text-[#EBE1D2] tracking-tight">
          About Sofiya Mohammed
        </h1>
        <p className="text-base text-[#5E5470] dark:text-[#BDB0CC] max-w-2xl">
          DevSecOps Engineer & Cloud Security Specialist based in Addis Ababa, Ethiopia.
        </p>
      </div>

      {/* Main Bio Grid with matching circular profile framing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Left Column: Portrait with matching circle framing */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <ProfileImage size="md" />
          <div className="mt-6 text-center space-y-2">
            <h3 className="font-bold text-lg text-[#2E2142] dark:text-[#EBE1D2]">
              {portfolioContent.personal.name}
            </h3>
            <p className="text-xs font-medium text-[#5E5470] dark:text-[#BDB0CC]">
              {portfolioContent.personal.role}
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#5E5470] dark:text-[#BDB0CC] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#6B4EAE] dark:text-[#A78BFA]" />
              <span>{portfolioContent.personal.location}</span>
            </div>

            {/* Social links */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <a
                href={portfolioContent.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#EBE1D2] dark:bg-[#2A1F3D] hover:bg-[#D8C9B3] dark:hover:bg-[#3D2F57] text-[#2E2142] dark:text-[#EBE1D2] transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioContent.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#EBE1D2] dark:bg-[#2A1F3D] hover:bg-[#D8C9B3] dark:hover:bg-[#3D2F57] text-[#6B4EAE] dark:text-[#A78BFA] transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioContent.personal.email}`}
                className="p-2 rounded-lg bg-[#EBE1D2] dark:bg-[#2A1F3D] hover:bg-[#D8C9B3] dark:hover:bg-[#3D2F57] text-[#6B4EAE] dark:text-[#A78BFA] transition-colors"
                aria-label="Email address"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Exact Specified Bio Text & Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl bg-[#EBE1D2]/40 dark:bg-[#2A1F3D]/60 border border-[#D8C9B3] dark:border-[#3D2F57] p-6 sm:p-8 space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-[#2E2142] dark:text-[#EBE1D2] leading-snug">
              "Building resilient systems, automating workflows, and integrating security throughout the lifecycle."
            </h2>

            {/* EXACT BIO TEXT FROM SPEC */}
            <p className="text-base text-[#2E2142] dark:text-[#EBE1D2] leading-relaxed">
              {portfolioContent.personal.aboutBio}
            </p>

            <div className="pt-4 border-t border-[#D8C9B3]/60 dark:border-[#3D2F57] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5E5470] dark:text-[#BDB0CC]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6B4EAE] dark:bg-[#A78BFA]" />
                <span className="font-medium text-[#2E2142] dark:text-[#EBE1D2]">Status:</span>
                <span>{portfolioContent.personal.availability}</span>
              </div>
            </div>
          </div>

          {/* Core Guiding Principles */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-[#2E2142] dark:text-[#EBE1D2]">
              Engineering Principles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#2A1F3D]/80 border border-[#D8C9B3] dark:border-[#3D2F57] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2E2142] dark:text-[#EBE1D2]">
                  <Server className="w-4 h-4 text-[#6B4EAE] dark:text-[#A78BFA]" />
                  <span>Shift-Left Enforcement</span>
                </div>
                <p className="text-xs text-[#5E5470] dark:text-[#BDB0CC] leading-relaxed">
                  Security isn't a post-production gateway; it starts at the pull request with automated SAST, secret leak prevention, and IaC linting.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#2A1F3D]/80 border border-[#D8C9B3] dark:border-[#3D2F57] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2E2142] dark:text-[#EBE1D2]">
                  <Shield className="w-4 h-4 text-[#6B4EAE] dark:text-[#A78BFA]" />
                  <span>Least-Privilege by Default</span>
                </div>
                <p className="text-xs text-[#5E5470] dark:text-[#BDB0CC] leading-relaxed">
                  Every IAM role, service account, and container environment must run under strict least privilege with continuous audit logging.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#2A1F3D]/80 border border-[#D8C9B3] dark:border-[#3D2F57] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2E2142] dark:text-[#EBE1D2]">
                  <FileCheck className="w-4 h-4 text-[#6B4EAE] dark:text-[#A78BFA]" />
                  <span>Reproducible Infrastructure</span>
                </div>
                <p className="text-xs text-[#5E5470] dark:text-[#BDB0CC] leading-relaxed">
                  All cloud topologies across AWS, GCP, and Azure written as deterministic, modular Terraform with automated fmt, init, and validation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#2A1F3D]/80 border border-[#D8C9B3] dark:border-[#3D2F57] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2E2142] dark:text-[#EBE1D2]">
                  <Brain className="w-4 h-4 text-[#6B4EAE] dark:text-[#A78BFA]" />
                  <span>Transparent AI Threat Modeling</span>
                </div>
                <p className="text-xs text-[#5E5470] dark:text-[#BDB0CC] leading-relaxed">
                  Sandboxed agent tools, prompt injection boundaries, and honest testing of LLM hallucinations instrumented with Datadog observability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="mt-8 pt-8 border-t border-[#D8C9B3]/70 dark:border-[#3D2F57] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-[#5E5470] dark:text-[#BDB0CC]">
          Interested in seeing these principles implemented in working code?
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#6B4EAE] dark:bg-[#A78BFA] text-white dark:text-[#1B1326] hover:bg-[#593E94] dark:hover:bg-[#926be6] transition-colors"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('/skills')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#EBE1D2] dark:bg-[#2A1F3D] text-[#2E2142] dark:text-[#EBE1D2] border border-[#D8C9B3] dark:border-[#3D2F57] hover:bg-[#FAF6F0] dark:hover:bg-[#3D2F57] transition-colors"
          >
            <span>Certifications & Skills</span>
          </button>
        </div>
      </div>
    </div>
  );
};
