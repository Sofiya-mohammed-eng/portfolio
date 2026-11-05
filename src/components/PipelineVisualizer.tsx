import React, { useState, useEffect } from 'react';
import { portfolioContent } from '../data/content';
import { CheckCircle2, Play, Pause, RotateCcw, ShieldCheck, FileCode, KeyRound, Boxes, Container, Sparkles } from 'lucide-react';

const stageIcons = [
  FileCode,
  ShieldCheck,
  KeyRound,
  Boxes,
  ShieldCheck,
  Container,
];

export const PipelineVisualizer: React.FC = () => {
  const stages = portfolioContent.pipelineStages;
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Auto-cycle through the stages to simulate pipeline run
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setActiveStageId((prev) => (prev >= stages.length ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, [isRunning, stages.length]);

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[0];

  return (
    <div className="mt-8 rounded-2xl bg-[#EBE1D2]/50 dark:bg-[#1B1326]/70 border border-[#D8C9B3] dark:border-[#3D2F57] p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#D8C9B3]/70 dark:border-[#3D2F57]">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#5E5470] dark:text-[#BDB0CC]">
            <span className="font-mono text-[#6B4EAE] dark:text-[#A78BFA]">03</span>
            <span aria-hidden="true">/</span>
            <span>Interactive DevSecOps Architecture</span>
            <span aria-hidden="true">·</span>
            <span>6 Parallel Security Gates</span>
          </div>
          <h4 className="text-xl font-bold text-[#2E2142] dark:text-[#EBE1D2] mt-1">
            Automated Shift-Left CI/CD Pipeline
          </h4>
        </div>

        {/* Play / Pause / Reset controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FAF6F0] dark:bg-[#2A1F3D] hover:bg-white dark:hover:bg-[#3D2F57] text-[#2E2142] dark:text-[#EBE1D2] border border-[#D8C9B3] dark:border-[#3D2F57] transition-colors shadow-2xs"
            aria-label={isRunning ? "Pause pipeline simulation" : "Play pipeline simulation"}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#6B4EAE] dark:text-[#A78BFA]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#6B4EAE] dark:text-[#A78BFA]" />
                <span>Run Flow</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setActiveStageId(1);
              setIsRunning(true);
            }}
            className="p-1.5 text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#2E2142] dark:hover:text-[#EBE1D2] rounded-lg bg-[#FAF6F0] dark:bg-[#2A1F3D] hover:bg-white dark:hover:bg-[#3D2F57] border border-[#D8C9B3] dark:border-[#3D2F57] transition-colors"
            title="Reset to Stage 1"
            aria-label="Reset to Stage 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Connected Nodes Diagram */}
      <div className="py-6 overflow-x-auto">
        <div className="min-w-[620px] flex items-center justify-between relative px-2">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-[#D8C9B3] dark:bg-[#3D2F57] z-0" />
          {/* Active progress indicator line */}
          <div
            className="absolute top-1/2 left-6 -translate-y-1/2 h-0.5 bg-[#6B4EAE] dark:bg-[#A78BFA] transition-all duration-500 ease-out z-0"
            style={{
              width: `${((activeStageId - 1) / (stages.length - 1)) * 92}%`,
            }}
          />

          {stages.map((stage, idx) => {
            const Icon = stageIcons[idx] || ShieldCheck;
            const isActive = stage.id === activeStageId;
            const isPassed = stage.id < activeStageId;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStageId(stage.id);
                  setIsRunning(false);
                }}
                className="relative z-10 flex flex-col items-center group focus-visible:outline-2 focus-visible:outline-[#6B4EAE]"
              >
                {/* Node Circle */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#6B4EAE] dark:bg-[#A78BFA] text-white dark:text-[#1B1326] shadow-md ring-4 ring-[#C9B8EA]/60 dark:ring-[#A78BFA]/30 scale-110'
                      : isPassed
                      ? 'bg-[#FAF6F0] dark:bg-[#2A1F3D] text-[#6B4EAE] dark:text-[#A78BFA] border-2 border-[#6B4EAE] dark:border-[#A78BFA]'
                      : 'bg-[#FAF6F0] dark:bg-[#2A1F3D] text-[#5E5470] dark:text-[#BDB0CC] border border-[#D8C9B3] dark:border-[#3D2F57] group-hover:border-[#6B4EAE]/60'
                  }`}
                >
                  {isPassed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#6B4EAE] dark:text-[#A78BFA]" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Stage number & label */}
                <div className="mt-2 text-center">
                  <span className="block text-[11px] font-mono text-[#5E5470] dark:text-[#BDB0CC]">
                    0{stage.id}
                  </span>
                  <span
                    className={`block text-xs font-semibold max-w-[85px] leading-tight truncate transition-colors ${
                      isActive ? 'text-[#6B4EAE] dark:text-[#A78BFA]' : 'text-[#2E2142] dark:text-[#EBE1D2]'
                    }`}
                  >
                    {stage.tool.split('&')[0].trim()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Card */}
      <div className="mt-4 rounded-xl bg-[#FAF6F0] dark:bg-[#2A1F3D] border border-[#D8C9B3] dark:border-[#3D2F57] p-4 sm:p-5 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D8C9B3]/50 dark:border-[#3D2F57]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-[#6B4EAE] dark:text-[#A78BFA] bg-[#C9B8EA]/30 dark:bg-[#A78BFA]/20 px-2 py-0.5 rounded">
              GATE 0{activeStage.id}
            </span>
            <h5 className="font-bold text-[#2E2142] dark:text-[#EBE1D2] text-base">
              {activeStage.name}
            </h5>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#5E5470] dark:text-[#BDB0CC]">
            <span>Category: {activeStage.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-[#2E2142] dark:text-[#EBE1D2]">Tool: {activeStage.tool}</span>
          </div>
        </div>

        <p className="mt-3 text-sm text-[#5E5470] dark:text-[#BDB0CC] leading-relaxed">
          {activeStage.description}
        </p>

        <div className="mt-4 pt-3 border-t border-[#D8C9B3]/40 dark:border-[#3D2F57] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5E5470] dark:text-[#BDB0CC]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#6B4EAE] dark:text-[#A78BFA]" />
            <span>Pass condition: 0 critical vulnerabilities · SARIF uploaded to GitHub Security tab</span>
          </div>
          <span className="font-mono text-[#6B4EAE] dark:text-[#A78BFA] font-semibold">Status: PASSED</span>
        </div>
      </div>
    </div>
  );
};
