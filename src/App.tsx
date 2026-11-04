/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ThreeCanvas } from './components/ThreeCanvas';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { ContactPage } from './pages/ContactPage';
import { AnimatePresence, motion } from 'motion/react';
import { Terminal, Copy, Check, X, Shield, BookOpen } from 'lucide-react';
import { Chatbot } from './components/Chatbot';

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

  const [showDeploymentGuide, setShowDeploymentGuide] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

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

  const deploymentScript = `# 1. Clone repository
git clone https://github.com/Sofiya-mohammed-eng/portfolio.git
cd portfolio

# 2. Place your photo (optional)
cp /path/to/your/photo.jpg public/profile.jpg

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Deploy to Vercel (zero config)
npm install -g vercel
vercel deploy --prod`;

  const handleCopyDeployment = () => {
    navigator.clipboard.writeText(deploymentScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF6F0] text-[#2E2142] flex flex-col font-sans selection:bg-[#C9B8EA]/40 selection:text-[#2E2142]">
      {/* 3D Background Canvas (Persistent across all page routes) */}
      <ThreeCanvas currentPath={currentPath} />

      {/* Shared Navbar */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

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

      {/* AI Security Portfolio Chatbot */}
      <Chatbot />

      {/* Floating Deployment Guide Drawer Toggle Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setShowDeploymentGuide(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF6F0] hover:bg-white text-[#2E2142] border border-[#D8C9B3] text-xs font-semibold shadow-md hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-[#6B4EAE]"
          title="Open deployment & setup instructions"
        >
          <Terminal className="w-4 h-4 text-[#6B4EAE]" />
          <span className="hidden sm:inline">Deployment Guide</span>
        </button>
      </div>

      {/* Deployment & Setup Modal */}
      {showDeploymentGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FAF6F0] border border-[#D8C9B3] rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#6B4EAE]">
                  <Shield className="w-3.5 h-3.5" />
                  <span>PRODUCTION READY</span>
                </div>
                <h3 className="text-xl font-bold text-[#2E2142]">
                  Vercel Deployment & Setup Steps
                </h3>
              </div>
              <button
                onClick={() => setShowDeploymentGuide(false)}
                className="p-1.5 rounded-lg text-[#5E5470] hover:text-[#2E2142] hover:bg-[#EBE1D2] transition-colors"
                aria-label="Close guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#5E5470] leading-relaxed">
              <div className="p-4 rounded-xl bg-[#EBE1D2]/50 border border-[#D8C9B3] space-y-2 text-[#2E2142]">
                <div className="font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#6B4EAE]" />
                  <span>Where to place your photo:</span>
                </div>
                <p className="text-xs text-[#5E5470]">
                  Place your headshot inside the <code className="bg-[#FAF6F0] px-1.5 py-0.5 rounded font-mono text-[#6B4EAE]">public/</code> directory named exactly <code className="bg-[#FAF6F0] px-1.5 py-0.5 rounded font-mono text-[#6B4EAE]">profile.jpg</code>. If missing, the app displays the organic monogram badge with initials "SM" automatically.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2E2142] text-xs">
                    Quick Terminal Commands:
                  </span>
                  <button
                    onClick={handleCopyDeployment}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B4EAE] hover:underline"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy commands</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-[#2E2142] text-[#FAF6F0] font-mono text-xs overflow-x-auto leading-relaxed selection:bg-[#6B4EAE]">
                  {deploymentScript}
                </pre>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-[#2E2142]">Deploy to Vercel via Git:</h4>
                <ol className="list-decimal list-inside space-y-1 text-[#5E5470]">
                  <li>Push your repository to GitHub.</li>
                  <li>Import the repository on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#6B4EAE] underline">vercel.com</a>.</li>
                  <li>Framework preset: Vite / Next.js auto-detected. No environment variables required.</li>
                  <li>Click <strong>Deploy</strong>. Production build will complete in ~30 seconds.</li>
                </ol>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowDeploymentGuide(false)}
                className="px-5 py-2.5 rounded-xl bg-[#6B4EAE] hover:bg-[#593E94] text-white text-xs font-semibold transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
