import React, { useState } from 'react';
import { portfolioContent } from '../data/content';
import { Menu, X, ArrowUpRight, Shield, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF6F0]/90 dark:bg-[#1B1326]/90 backdrop-blur-md border-b border-[#D8C9B3]/60 dark:border-[#3D2F57] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick('/', e)}
          className="flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-[#2E2142] dark:text-[#EBE1D2] hover:text-[#6B4EAE] dark:hover:text-[#A78BFA] transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-[#6B4EAE]"
        >
          <span className="w-8 h-8 rounded-lg bg-[#EBE1D2] dark:bg-[#2A1F3D] border border-[#D8C9B3] dark:border-[#3D2F57] flex items-center justify-center text-[#6B4EAE] dark:text-[#A78BFA] group-hover:bg-[#6B4EAE] group-hover:text-white dark:group-hover:bg-[#A78BFA] dark:group-hover:text-[#1B1326] transition-all shadow-2xs">
            <Shield className="w-4 h-4" />
          </span>
          <span className="font-heading">Sofiya M. Hassen</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#5E5470] dark:text-[#BDB0CC]">
          {portfolioContent.navigation.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(item.href, e)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#2E2142] dark:hover:text-[#EBE1D2] focus-visible:outline-2 focus-visible:outline-[#6B4EAE] ${
                  isActive
                    ? 'text-[#6B4EAE] dark:text-[#A78BFA] font-semibold'
                    : 'text-[#5E5470] dark:text-[#BDB0CC]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B4EAE] dark:bg-[#A78BFA] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Day/Night Toggle & Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Day / Night Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-[#EBE1D2]/70 dark:bg-[#2A1F3D] hover:bg-[#EBE1D2] dark:hover:bg-[#3D2F57] text-[#2E2142] dark:text-[#EBE1D2] border border-[#D8C9B3] dark:border-[#3D2F57] transition-all focus-visible:outline-2 focus-visible:outline-[#6B4EAE] flex items-center justify-center"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-[#6B4EAE] transition-transform duration-300 -rotate-12 hover:rotate-0" />
            )}
          </button>

          {/* Contact CTA */}
          <div className="hidden sm:flex items-center">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick('/contact', e)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white dark:text-[#1B1326] bg-[#6B4EAE] hover:bg-[#593E94] dark:bg-[#A78BFA] dark:hover:bg-[#926be6] rounded-lg transition-colors shadow-2xs whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B4EAE]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2E2142] dark:text-[#EBE1D2] hover:text-[#6B4EAE] dark:hover:text-[#A78BFA] rounded-lg bg-[#EBE1D2]/60 dark:bg-[#2A1F3D] border border-[#D8C9B3] dark:border-[#3D2F57] focus-visible:outline-2 focus-visible:outline-[#6B4EAE]"
            aria-label={mobileMenuOpen ? 'Close mobile navigation menu' : 'Open mobile navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#D8C9B3] dark:border-[#3D2F57] bg-[#FAF6F0]/98 dark:bg-[#1B1326]/98 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {portfolioContent.navigation.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(item.href, e)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#EBE1D2] dark:bg-[#2A1F3D] text-[#6B4EAE] dark:text-[#A78BFA] font-semibold'
                    : 'text-[#2E2142] dark:text-[#EBE1D2] hover:bg-[#EBE1D2]/50 dark:hover:bg-[#2A1F3D]/50'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#6B4EAE] dark:bg-[#A78BFA]" />}
              </a>
            );
          })}
          <div className="pt-3 border-t border-[#D8C9B3]/60 dark:border-[#3D2F57]">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick('/contact', e)}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold text-white dark:text-[#1B1326] bg-[#6B4EAE] dark:bg-[#A78BFA] rounded-lg transition-colors shadow-2xs"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
