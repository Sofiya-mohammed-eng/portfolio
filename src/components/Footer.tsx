import React from 'react';
import { portfolioContent } from '../data/content';
import { Github, Linkedin, Mail, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full bg-[#FAF6F0] dark:bg-[#1B1326] border-t border-[#D8C9B3] dark:border-[#3D2F57] mt-24 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-lg font-bold text-[#2E2142] dark:text-[#EBE1D2]">
              <span className="w-7 h-7 rounded-md bg-[#EBE1D2] dark:bg-[#2A1F3D] border border-[#D8C9B3] dark:border-[#3D2F57] flex items-center justify-center text-[#6B4EAE] dark:text-[#A78BFA]">
                <Shield className="w-4 h-4" />
              </span>
              <span className="font-heading">{portfolioContent.personal.name}</span>
            </div>
            <p className="text-sm text-[#5E5470] dark:text-[#BDB0CC] max-w-md leading-relaxed">
              {portfolioContent.personal.role} specializing in resilient cloud architecture, automated shift-left DevSecOps pipelines, and AI system security.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#5E5470] dark:text-[#BDB0CC]">
              <MapPin className="w-3.5 h-3.5 text-[#6B4EAE] dark:text-[#A78BFA]" />
              <span>{portfolioContent.personal.location}</span>
              <span aria-hidden="true">·</span>
              <span>Open for technical collaborations</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5E5470] dark:text-[#BDB0CC]">
              Navigation
            </div>
            <ul className="space-y-2 text-sm">
              {portfolioContent.navigation.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => {
                      onNavigate(item.href);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#6B4EAE] dark:hover:text-[#A78BFA] transition-colors focus-visible:outline-2 focus-visible:outline-[#6B4EAE]"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5E5470] dark:text-[#BDB0CC]">
              Connect
            </div>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={portfolioContent.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#6B4EAE] dark:hover:text-[#A78BFA] transition-colors"
              >
                <Github className="w-4 h-4 text-[#2E2142] dark:text-[#EBE1D2]" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={portfolioContent.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#6B4EAE] dark:hover:text-[#A78BFA] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#6B4EAE] dark:text-[#A78BFA]" />
                <span>LinkedIn Network</span>
              </a>
              <a
                href={`mailto:${portfolioContent.personal.email}`}
                className="inline-flex items-center gap-2 text-[#5E5470] dark:text-[#BDB0CC] hover:text-[#6B4EAE] dark:hover:text-[#A78BFA] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#6B4EAE] dark:text-[#A78BFA]" />
                <span className="truncate">{portfolioContent.personal.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#D8C9B3]/60 dark:border-[#3D2F57] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5E5470] dark:text-[#BDB0CC]">
          <div>
            © {currentYear} {portfolioContent.personal.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with React Three Fiber, TypeScript & Tailwind CSS</span>
            <span aria-hidden="true">·</span>
            <span>Vercel Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
