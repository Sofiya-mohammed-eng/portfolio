/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Chatbot } from './components/Chatbot';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { ContactPage } from './pages/ContactPage';
import { AnimatePresence, motion } from 'motion/react';

const PAGE_METADATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Sofiya Mohammed Hassen | DevSecOps & Cloud Security Engineer',
    description: 'Security first, from the first commit. Secure infrastructure, automated pipelines, and protected AI systems.',
  },
  '/about': {
    title: 'About | Sofiya Mohammed Hassen - DevSecOps Engineer',
    description: 'Background, DevSecOps principles, and engineering philosophy of Sofiya Mohammed Hassen.',
  },
  '/projects': {
    title: 'Projects | Sofiya Mohammed Hassen - DevSecOps & AI Security',
    description: 'AI Agent Security Lab, Terraform Cloud Library, and automated DevSecOps CI/CD Pipeline.',
  },
  '/skills': {
    title: 'Skills & Certifications | Sofiya Mohammed Hassen',
    description: 'DevSecOps, AWS Cloud Security, CompTIA Security+, and AI threat assessment capabilities.',
  },
  '/case-studies': {
    title: 'Case Studies | Sofiya Mohammed Hassen',
    description: 'Security compliance gap assessment, IAM security review, and web application hardening case studies.',
  },
  '/contact': {
    title: 'Contact | Sofiya Mohammed Hassen',
    description: "Let's build something secure. Get in touch for cloud security engineering and collaborations.",
  },
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const path = window.location.pathname;
    return PAGE_METADATA[path] ? path : '/';
  });

  // Day/Night mode state synced with localStorage and prefers-color-scheme
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  // Sync route changes with browser history and document title
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(PAGE_METADATA[path] ? path : '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const meta = PAGE_METADATA[currentPath] || PAGE_METADATA['/'];
    document.title = meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/projects':
        return <ProjectsPage />;
      case '/skills':
        return <SkillsPage />;
      case '/case-studies':
        return <CaseStudiesPage />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF6F0] dark:bg-[#1B1326] text-[#2E2142] dark:text-[#EBE1D2] flex flex-col font-sans selection:bg-[#C9B8EA]/40 selection:text-[#2E2142] dark:selection:text-white transition-colors duration-200">
      {/* 3D Background Canvas (Persistent across all page routes, theme-reactive) */}
      <ThreeCanvas currentPath={currentPath} isDark={isDark} />

      {/* Shared Navbar with Theme Toggle */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area with Page Transitions */}
      <main className="flex-1 w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Footer */}
      <Footer onNavigate={navigate} />

      {/* Grounded AI Assistant (Ask Sophie) */}
      <Chatbot />
    </div>
  );
}
