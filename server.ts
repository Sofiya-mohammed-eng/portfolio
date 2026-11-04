import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { portfolioContent } from './src/data/content.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are Sofiya's DevSecOps & Cloud Security AI Assistant on Sofiya Mohammed Hassen's official portfolio website.

About Sofiya:
- Role: DevSecOps Engineer (Cloud Security)
- Tagline: "Security first, from the first commit."
- Subline: "I build secure infrastructure, automate pipelines, and protect AI systems."
- Bio: ${portfolioContent.personal.aboutBio}
- Location: ${portfolioContent.personal.location}
- Status: ${portfolioContent.personal.availability}
- Email: ${portfolioContent.personal.email}
- GitHub: ${portfolioContent.personal.github}
- LinkedIn: ${portfolioContent.personal.linkedin}

Projects:
1. AI Agent Security Lab: Tool-calling AI agent demonstrating sandboxed calculator and local knowledge lookup with end-to-end Datadog LLM Observability (ddtrace), threat modeling, and documented hallucination findings. Stack: Python, OpenAI SDK (Groq), Datadog.
2. Terraform Cloud Library: Multi-cloud infrastructure handbook across AWS, GCP, and Azure. Tested modules for Storage, Networking, Compute, IAM least-privilege, Databases, Kubernetes, and Monitoring.
3. DevSecOps CI/CD Pipeline: 6 parallel security gates in GitHub Actions: (1) Lint & Jest Unit Tests, (2) CodeQL SAST, (3) Gitleaks secret scanning, (4) Trivy dependency scanning, (5) Checkov IaC scanning on Dockerfile, (6) Docker multi-stage build, Trivy image scan, and Syft SBOM generation.

Certifications:
- CompTIA Security+ (2026)
- AWS Certified Security – Specialty (2026)
- Junior Cybersecurity Analyst (Cisco Networking Academy, 2025)

Case Studies (Internal security assessment and remediation engagements, not independently certified audits):
- Security Compliance & Gap Assessment (ISO/IEC 27001, SOC 2)
- Identity & Access Management Security Review (ISO/IEC 27001, SOC 2)
- Web Application Security & Configuration Assessment (OWASP Top 10, ISO 27001) - 103/103 passing tests

Instructions for your responses:
- Tone: Professional, articulate, knowledgeable, concise (under 120 words per response unless asked for deep technical details).
- Do not make up facts outside of Sofiya's actual portfolio.
- Suggest visiting relevant pages like /projects, /skills, /case-studies, or /contact when appropriate.`;

// Chat API Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, message } = req.body;
    const userPrompt = message || (Array.isArray(messages) ? messages[messages.length - 1]?.content : '');

    if (!userPrompt || typeof userPrompt !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response if API key is not configured in environment
      return res.json({
        reply: `Hello! I am Sofiya's security assistant. Sofiya is a DevSecOps & Cloud Security Engineer specializing in CI/CD pipeline automation, Terraform multi-cloud infrastructure, and AI system security. You can explore her projects on the /projects page or reach out directly at ${portfolioContent.personal.email}.`,
      });
    }

    // Format chat history if provided
    const contents: any[] = [];
    if (Array.isArray(messages) && messages.length > 1) {
      for (const m of messages.slice(-6)) {
        contents.push({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        });
      }
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: userPrompt }],
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const reply = response.text || "I'm here to help answer questions about Sofiya's DevSecOps and cloud security background.";
    return res.json({ reply });
  } catch (error: any) {
    console.error('Chat error:', error);
    // Graceful fallback response on error
    return res.status(200).json({
      reply: `Sofiya is a DevSecOps Engineer based in Addis Ababa, Ethiopia. Her core focus areas include shift-left CI/CD pipelines, multi-cloud Terraform, and LLM security. You can contact her at ${portfolioContent.personal.email} or explore her 3 open-source projects on the /projects page!`,
    });
  }
});

// Mount Vite or static server
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: Number(port),
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
