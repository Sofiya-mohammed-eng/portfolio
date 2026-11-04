import React, { useState } from 'react';
import { portfolioContent, Project } from '../data/content';
import { PipelineVisualizer } from '../components/PipelineVisualizer';
import { ExternalLink, ChevronDown, ChevronUp, Github, Code2, ShieldAlert, Layers, CheckCircle } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('devsecops-pipeline-demo');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="space-y-2 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[#6B4EAE] uppercase tracking-wider">
          <span>02</span>
          <span aria-hidden="true">/</span>
          <span>Security Implementations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E2142] tracking-tight">
          Featured Projects
        </h1>
        <p className="text-base text-[#5E5470] max-w-2xl leading-relaxed">
          Open-source security engineering artifacts, multi-cloud infrastructure libraries, and end-to-end observable AI testbeds.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-8">
        {portfolioContent.projects.map((project: Project, idx: number) => {
          const isExpanded = expandedId === project.id;

          return (
            <article
              key={project.id}
              className={`rounded-2xl border transition-all duration-300 ${
                isExpanded
                  ? 'bg-[#FAF6F0] border-[#6B4EAE]/60 shadow-md'
                  : 'bg-[#FAF6F0]/90 border-[#D8C9B3] hover:border-[#6B4EAE]/40 hover:shadow-xs'
              } p-6 sm:p-8`}
            >
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#5E5470]">
                    <span className="font-mono font-bold text-[#6B4EAE]">0{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#2E2142]">{project.title}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.stack.join(' / ')}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#2E2142]">
                    {project.title}
                  </h2>

                  <p className="text-base text-[#5E5470] leading-relaxed max-w-3xl">
                    {project.summary}
                  </p>
                </div>

                {/* Primary Actions */}
                <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FAF6F0] hover:bg-[#EBE1D2] text-[#2E2142] border border-[#D8C9B3] text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#6B4EAE]"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3 h-3 text-[#5E5470]" />
                  </a>

                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-[#EBE1D2] hover:bg-[#D8C9B3] text-[#2E2142] text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#6B4EAE]"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Stack Badges/List (unboxed zero-pill style) */}
              <div className="mt-4 pt-4 border-t border-[#D8C9B3]/50 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5E5470]">
                <span className="font-medium text-[#2E2142]">Tech Stack:</span>
                {project.stack.map((tech, i) => (
                  <React.Fragment key={tech}>
                    {i > 0 && <span aria-hidden="true" className="text-[#D8C9B3]">/</span>}
                    <span className="font-mono text-[#2E2142]">{tech}</span>
                  </React.Fragment>
                ))}
              </div>

              {/* Expandable Detail View */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-[#D8C9B3] space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#6B4EAE] flex items-center gap-1.5">
                      <Code2 className="w-4 h-4" />
                      <span>Architecture & Deep Dive</span>
                    </h3>
                    <p className="text-sm text-[#2E2142] leading-relaxed bg-[#EBE1D2]/30 p-4 sm:p-5 rounded-xl border border-[#D8C9B3]/70">
                      {project.details}
                    </p>
                  </div>

                  {/* Project Specific Extra Content */}
                  {project.id === 'ai-agent-security-lab' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] space-y-2">
                        <div className="font-bold text-[#2E2142] flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-[#6B4EAE]" />
                          <span>Threat Model Mitigations</span>
                        </div>
                        <ul className="space-y-1.5 text-[#5E5470] list-disc list-inside">
                          <li>Sandboxed calculator execution via restricted AST parsing</li>
                          <li>Read-only bounded local knowledge vector lookups</li>
                          <li>Trace tagging for prompt injection pattern recognition</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] space-y-2">
                        <div className="font-bold text-[#2E2142] flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-[#6B4EAE]" />
                          <span>Real Testing Findings</span>
                        </div>
                        <ul className="space-y-1.5 text-[#5E5470] list-disc list-inside">
                          <li>End-to-end ddtrace captured 100% of tool-call latency</li>
                          <li>Documented honest failure case: hallucinated parameter handling</li>
                          <li>Verified prompt boundary escape prevention</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {project.id === 'terraform-cloud-library' && (
                    <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] space-y-3 text-xs">
                      <div className="font-bold text-[#2E2142] flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-[#6B4EAE]" />
                        <span>Completed Service Categories Across AWS, GCP & Azure</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[#5E5470]">
                        <div className="p-2 rounded bg-[#EBE1D2]/40 border border-[#D8C9B3]/60">Storage (S3 / GCS / Blob)</div>
                        <div className="p-2 rounded bg-[#EBE1D2]/40 border border-[#D8C9B3]/60">Networking & VPC Peering</div>
                        <div className="p-2 rounded bg-[#EBE1D2]/40 border border-[#D8C9B3]/60">Compute & VM Isolation</div>
                        <div className="p-2 rounded bg-[#EBE1D2]/40 border border-[#D8C9B3]/60">IAM Least-Privilege Roles</div>
                        <div className="p-2 rounded bg-[#EBE1D2]/40 border border-[#D8C9B3]/60">Databases & Encryption</div>
                        <div className="p-2 rounded bg-[#EBE1D2]/40 border border-[#D8C9B3]/60">Kubernetes (EKS / GKE / AKS)</div>
                        <div className="p-2 rounded bg-[#EBE1D2]/40 border border-[#D8C9B3]/60">Monitoring & CloudWatch</div>
                        <div className="p-2 rounded bg-[#EBE1D2]/40 border border-[#D8C9B3]/60">Strict Safety Rules Guide</div>
                      </div>
                    </div>
                  )}

                  {/* DevSecOps Pipeline Animated Interactive Visualizer */}
                  {project.isPipeline && (
                    <div className="pt-2">
                      <PipelineVisualizer />
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
