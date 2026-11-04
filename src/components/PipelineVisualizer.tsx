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
    <div className="mt-8 rounded-2xl bg-[#EBE1D2]/50 border border-[#D8C9B3] p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#D8C9B3]/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#5E5470]">
            <span className="font-mono text-[#6B4EAE]">03</span>
            <span aria-hidden="true">/</span>
            <span>Interactive DevSecOps Architecture</span>
            <span aria-hidden="true">·</span>
            <span>6 Parallel Security Gates</span>
          </div>
          <h4 className="text-xl font-bold text-[#2E2142] mt-1">
            Automated Shift-Left CI/CD Pipeline
          </h4>
        </div>

        {/* Play / Pause / Reset controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FAF6F0] hover:bg-white text-[#2E2142] border border-[#D8C9B3] transition-colors shadow-2xs"
            aria-label={isRunning ? "Pause pipeline simulation" : "Play pipeline simulation"}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#6B4EAE]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#6B4EAE]" />
                <span>Run Flow</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setActiveStageId(1);
              setIsRunning(true);
            }}
            className="p-1.5 text-[#5E5470] hover:text-[#2E2142] rounded-lg bg-[#FAF6F0] hover:bg-white border border-[#D8C9B3] transition-colors"
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
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-[#D8C9B3] z-0" />
          {/* Active progress indicator line */}
          <div
            className="absolute top-1/2 left-6 -translate-y-1/2 h-0.5 bg-[#6B4EAE] transition-all duration-500 ease-out z-0"
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
                      ? 'bg-[#6B4EAE] text-white shadow-md ring-4 ring-[#C9B8EA]/60 scale-110'
                      : isPassed
                      ? 'bg-[#FAF6F0] text-[#6B4EAE] border-2 border-[#6B4EAE]'
                      : 'bg-[#FAF6F0] text-[#5E5470] border border-[#D8C9B3] group-hover:border-[#6B4EAE]/60'
                  }`}
                >
                  {isPassed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#6B4EAE]" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Stage number & label */}
                <div className="mt-2 text-center">
                  <span className="block text-[11px] font-mono text-[#5E5470]">
                    0{stage.id}
                  </span>
                  <span
                    className={`block text-xs font-semibold max-w-[85px] leading-tight truncate transition-colors ${
                      isActive ? 'text-[#6B4EAE]' : 'text-[#2E2142]'
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
      <div className="mt-4 rounded-xl bg-[#FAF6F0] border border-[#D8C9B3] p-4 sm:p-5 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D8C9B3]/50">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-[#6B4EAE] bg-[#C9B8EA]/30 px-2 py-0.5 rounded">
              GATE 0{activeStage.id}
            </span>
            <h5 className="font-bold text-[#2E2142] text-base">
              {activeStage.name}
            </h5>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#5E5470]">
            <span>Category: {activeStage.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-[#2E2142]">Tool: {activeStage.tool}</span>
          </div>
        </div>

        <p className="mt-3 text-sm text-[#5E5470] leading-relaxed">
          {activeStage.description}
        </p>

        <div className="mt-4 pt-3 border-t border-[#D8C9B3]/40 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5E5470]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#6B4EAE]" />
            <span>Pass condition: 0 critical vulnerabilities · SARIF uploaded to GitHub Security tab</span>
          </div>
          <span className="font-mono text-[#6B4EAE]">Status: PASSED</span>
        </div>
      </div>
    </div>
  );
};
