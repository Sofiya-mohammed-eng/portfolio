/**
 * Portfolio Content Data for Sofiya Mohammed Hassen
 * Used by Vercel Serverless Function (/api/chat.ts) and site.
 * 
 * Keep in sync with src/data/content.ts
 */

export interface Project {
  id: string;
  title: string;
  link: string;
  summary: string;
  details: string;
  stack: string[];
  isPipeline?: boolean;
}

export interface PipelineStage {
  id: number;
  name: string;
  tool: string;
  category: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  description?: string;
  skills: string[];
}

export interface ToolCategory {
  category: string;
  items: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: number | string;
  credentialUrl?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  frameworks: string[];
  scope: string;
  findings: string[];
  outcome: string;
  metricsBadge?: string;
}

export const portfolioContent = {
  personal: {
    name: "Sofiya Mohammed Hassen",
    initials: "SM",
    role: "DevSecOps Engineer (Cloud Security)",
    tagline: "Security first, from the first commit.",
    subline: "I build secure infrastructure, automate pipelines, and protect AI systems.",
    aboutBio:
      "I'm Sofiya Mohammed, a DevSecOps and Cloud Security Engineer specializing in secure infrastructure, cloud technologies, automation, and cybersecurity. I work on designing, implementing, and securing technology environments, with hands-on experience in DevSecOps practices, security operations, identity and access management, and AI security. My focus is on building resilient systems, automating workflows, and integrating security throughout the development and deployment lifecycle.",
    location: "Addis Ababa, Ethiopia",
    availability: "Available for professional opportunities, freelance projects, and technical collaborations.",
    email: "sophiamahammed67@gmail.com",
    github: "https://github.com/Sofiya-mohammed-eng",
    linkedin: "https://www.linkedin.com/in/sofiya-mohammed-hassen-420139244/",
    profilePhotoPath: "/profile.jpg",
  },

  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ],

  projects: [
    {
      id: "ai-agent-security-lab",
      title: "AI Agent Security Lab",
      link: "https://github.com/Sofiya-mohammed-eng/AI-AGENT-SECURITY-LAB",
      summary:
        "A small tool-calling AI agent built to demonstrate real security practices, not just claim them, and instrumented end-to-end with Datadog LLM Observability.",
      details:
        "The agent answers questions using two tools: a sandboxed calculator and a lookup against a small local knowledge base (standing in for a vector DB). Every run, tool call, and model response is traced in Datadog. The repo includes a threat model, the mitigations implemented, and two real findings from testing, including one honest failure case (hallucination), not just the parts that worked.",
      stack: ["Python", "OpenAI SDK (Groq endpoint)", "Datadog LLM Observability (ddtrace)"],
      isPipeline: false,
    },
    {
      id: "terraform-cloud-library",
      title: "Terraform Cloud Library",
      link: "https://github.com/Sofiya-mohammed-eng/terraform-cloud-library",
      summary:
        "A reference handbook for the same infrastructure across AWS, GCP, and Azure, with a written guide per service category plus working Terraform code for each cloud.",
      details:
        "Every module is validated with terraform init, fmt -recursive, and validate. Categories (all complete): Storage, Networking, Compute, IAM, Databases, Kubernetes, Monitoring. Safety rules documented: never run terraform apply without deliberately choosing to, since some resources are billable, and replace placeholder values before planning.",
      stack: ["Terraform", "AWS", "GCP", "Azure"],
      isPipeline: false,
    },
    {
      id: "devsecops-pipeline-demo",
      title: "DevSecOps CI/CD Pipeline",
      link: "https://github.com/Sofiya-mohammed-eng/devsecops-pipeline-demo",
      summary:
        "A security-first CI/CD pipeline demonstrating modern DevSecOps practices, with 6 parallel security checks.",
      details:
        "Key features: parallel scanning for fast feedback, shift-left security, SBOM for compliance, no hardcoded secrets, multiple layers of defense (code, dependencies, container), and complete audit trail. Pipeline stages enforce comprehensive validation from commit to container deployment.",
      stack: [
        "GitHub Actions",
        "Docker (multi-stage)",
        "Node.js 20 (Express)",
        "CodeQL",
        "Gitleaks",
        "Trivy",
        "Checkov",
        "Syft",
      ],
      isPipeline: true,
    },
  ] as Project[],

  pipelineStages: [
    {
      id: 1,
      name: "Lint & Unit Testing",
      tool: "ESLint & Jest",
      category: "Code Quality",
      description: "Static code style linting and automated unit test suite with coverage thresholds.",
    },
    {
      id: 2,
      name: "SAST Code Analysis",
      tool: "GitHub CodeQL",
      category: "Code Security",
      description: "Deep semantic code query analysis uncovering vulnerability patterns before build.",
    },
    {
      id: 3,
      name: "Secret Scanning",
      tool: "Gitleaks",
      category: "Credential Defense",
      description: "High-speed entropy and regex rules detecting leaked tokens, API keys, and credentials.",
    },
    {
      id: 4,
      name: "Dependency Scan",
      tool: "Trivy",
      category: "Supply Chain",
      description: "Scanning application package dependencies against known CVE databases.",
    },
    {
      id: 5,
      name: "IaC Security Scan",
      tool: "Checkov",
      category: "Cloud Hardening",
      description: "Infrastructure as Code scan evaluating Dockerfile security rules and least-privilege policies.",
    },
    {
      id: 6,
      name: "Container & SBOM",
      tool: "Docker + Trivy + Syft",
      category: "Artifact Assurance",
      description: "Multi-stage hardened image build, root filesystem image scan, and complete Syft SBOM generation.",
    },
  ] as PipelineStage[],

  skills: {
    domains: [
      {
        title: "DevSecOps & Cloud Engineering",
        skills: [
          "CI/CD Pipeline Security",
          "Infrastructure as Code (Terraform)",
          "Docker & Containerization",
          "Kubernetes",
          "AWS Cloud Security",
          "Linux System Administration",
          "Git & GitHub",
          "Python & Bash Automation",
          "Configuration Management (Ansible)",
          "Infrastructure Monitoring & Observability",
        ],
      },
      {
        title: "Cybersecurity & Security Operations",
        skills: [
          "SIEM",
          "Vulnerability Assessment",
          "Security Auditing & Compliance (ISO 27001, SOC 2)",
          "Identity & Access Management (IAM)",
          "Incident Detection & Response",
          "Network Security",
          "Endpoint Security",
          "Security Awareness & Phishing Simulation",
          "Wazuh",
        ],
      },
      {
        title: "AI Security & Emerging Technologies",
        skills: [
          "AI Security Assessment",
          "LLM Security",
          "AI Governance & Risk Assessment",
          "OWASP Top 10 for LLM Applications",
          "AI Agent Security",
          "RAG Security",
          "Prompt Injection Assessment",
        ],
      },
    ] as SkillCategory[],

    tools: [
      { category: "Cloud", items: ["AWS", "Terraform"] },
      { category: "Containers", items: ["Docker", "Kubernetes"] },
      { category: "Security", items: ["Wazuh", "GoPhish", "Gitleaks"] },
      { category: "Monitoring", items: ["Datadog", "Grafana"] },
      { category: "Development", items: ["Python", "Bash", "Git", "GitHub"] },
      { category: "Platforms", items: ["Linux", "macOS", "Windows"] },
    ] as ToolCategory[],
  },

  certifications: [
    {
      id: "comptia-sec-plus",
      title: "CompTIA Security+",
      issuer: "CompTIA",
      year: 2026,
    },
    {
      id: "aws-sec-specialty",
      title: "AWS Certified Security – Specialty",
      issuer: "Amazon Web Services",
      year: 2026,
    },
    {
      id: "cisco-junior-analyst",
      title: "Junior Cybersecurity Analyst",
      issuer: "Cisco Networking Academy",
      year: 2025,
    },
  ] as Certification[],

  // NOTE: Internal security assessment and remediation engagements, not independently certified audits; client details anonymized.
  caseStudies: [
    {
      id: "security-compliance-gap-assessment",
      title: "Security Compliance & Gap Assessment",
      industry: "Technology / SaaS",
      frameworks: ["ISO/IEC 27001", "SOC 2"],
      scope:
        "Supported security compliance initiatives for a technology platform, reviewing existing security practices, documentation, access controls, and operational processes.",
      findings: [
        "Gaps in security documentation and control implementation",
        "Improvements needed in identity and access management",
        "Opportunities to strengthen security monitoring and incident response",
      ],
      outcome:
        "Contributed to a structured remediation plan, improved control documentation, and supported ongoing alignment with ISO 27001 and SOC 2.",
    },
    {
      id: "iam-security-review",
      title: "Identity & Access Management Security Review",
      industry: "Technology / SaaS",
      frameworks: ["ISO/IEC 27001", "SOC 2"],
      scope:
        "Reviewed IAM processes, focusing on access governance, user permissions, administrative privileges, and account management.",
      findings: [
        "Opportunities to improve access reviews and accountability",
        "Need for stronger role-based access control (RBAC)",
        "Improvements required in access documentation and auditing",
      ],
      outcome:
        "Supported IAM control finalization, access auditing, and improvements to access governance.",
    },
    {
      id: "web-app-security-assessment",
      title: "Web Application Security & Configuration Assessment",
      industry: "SaaS / Web Applications",
      frameworks: ["OWASP Top 10", "ISO/IEC 27001"],
      metricsBadge: "103/103 Passing Tests",
      scope:
        "Conducted platform security reviews covering application configurations, security headers, cookie management, and infrastructure security controls.",
      findings: [
        "Security header improvements needed, including CSP and HSTS",
        "Redis authentication and configuration hardening requirements",
        "Improvements needed in cookie consent and analytics tracking controls",
      ],
      outcome:
        "Contributed to security hardening recommendations, cookie consent improvements, and remediation activities. The cookie management implementation achieved 103/103 passing tests and a successful production build.",
    },
  ] as CaseStudy[],

  contact: {
    heading: "Let's build something secure.",
    text: "I'm always open to connecting with organizations, engineering teams, and professionals working in DevSecOps, Cloud Security, and Cybersecurity. Available for professional opportunities, freelance projects, and technical collaborations.",
    email: "sophiamahammed67@gmail.com",
    linkedin: "https://www.linkedin.com/in/sofiya-mohammed-hassen-420139244/",
    github: "https://github.com/Sofiya-mohammed-eng",
    location: "Addis Ababa, Ethiopia",
  },
};
