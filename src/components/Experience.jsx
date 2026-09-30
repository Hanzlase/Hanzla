import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const jobsData = [
  {
    company: 'Elevvo Pathways',
    role: 'Generative AI Engineer Intern',
    range: 'September 2025 — December 2025',
    bullets: [
      'Designed and deployed Mira, a production clinical AI chatbot, integrating the Cohere API into a multi-stage RAG pipeline with custom prompt engineering — boosting contextual response relevance by 40% over baseline.',
      'Elevated retrieval precision by 35% via parent-child chunking and Cohere Rerank v3; optimised inference throughput with hybrid decoding and response caching on Streamlit Cloud for real-time, low-latency responses.',
      'Constructed benchmark evaluation pipelines measuring hallucination rates and grounding accuracy across clinical knowledge domains.',
    ],
  },
  {
    company: 'Nexium',
    role: 'Full Stack Developer Intern',
    range: 'August 2025 — September 2025',
    bullets: [
      'Shipped a production e-commerce platform with Redux and Role-Based Access Control (RBAC), cutting auth-related issues by 30%.',
      'Architected CI/CD pipelines with Appium-automated mobile testing, accelerating releases by 50%.',
      'Provisioned AWS environments with Terraform, reducing infrastructure setup time from days to minutes.',
      'Collaborated in Agile sprints implementing RESTful API endpoints and database indexing optimizations.',
    ],
  },
  {
    company: 'Projectify (FYP)',
    role: 'Full-Stack & AI Lead',
    range: 'August 2025 — May 2026',
    bullets: [
      'Architected a multi-campus FYP lifecycle platform (proposal submission, AI plagiarism detection, panel evaluation, milestone grading) using Next.js 14, Prisma ORM, and PostgreSQL.',
      'Engineered real-time collaboration with Socket.IO and Redis, ensuring synchronized grading metrics and instant notification delivery.',
      'Built an AI similarity pipeline using Cohere + Pinecone vector embeddings and designed an automated AI panel suggestion engine.',
      'Integrated a zero-egress Cloudflare R2 client for document storage and an in-process Gmail SMTP meeting notification daemon.',
    ],
  },
  {
    company: 'Autonomous AI & Open Source',
    role: 'AI Systems Developer',
    range: '2025 — Present',
    bullets: [
      'Built HEALIX, an autonomous CI/CD healing system that captures failed GitHub Actions webhooks, diagnoses root causes via Gemini AI, and opens fix PRs automatically via Groq.',
      'Developed SCIO AI, a LangGraph multi-agent research pipeline (Researcher, Writer, Critic) cutting manual research time by 70% with citation-backed reports.',
      'Delivered AXIOS, an AI learning workspace with 5 interactive modes, hybrid search (FAISS + BM25), cross-encoder reranking, and live SSE streaming.',
    ],
  },
];

const Experience = () => {
  const [ref, isRevealed] = useScrollReveal();
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 1. Reset progress when tab changes
  React.useEffect(() => {
    setProgress(0);
  }, [activeTab]);

  // 2. Manage 15-second timer and progress bar updates
  React.useEffect(() => {
    if (isPaused) return;

    const intervalTime = 100; // update every 100ms
    const totalDuration = 15000; // 15 seconds
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, activeTab]);

  // 3. Separate tab rotation effect triggered when progress reaches 100
  React.useEffect(() => {
    if (progress >= 100) {
      setActiveTab((curr) => (curr + 1) % jobsData.length);
    }
  }, [progress]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <section
      ref={ref}
      id="jobs"
      className={`jobs-section scroll-reveal ${isRevealed ? 'visible' : ''}`}
      style={{ '--section-num': '"02."' }}
    >
      <h2 className="numbered-heading">Where I've Contributed</h2>

      <div
        className="jobs-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Tab Buttons (Left) */}
        <div className="tab-list" role="tablist" aria-label="Work history tabs">
          {jobsData.map((item, index) => (
            <button
              key={index}
              className={`tab-btn ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`panel-${index}`}
              id={`tab-${index}`}
              tabIndex={activeTab === index ? 0 : -1}
            >
              <span>{item.company}</span>
              {activeTab === index && (
                <div className="tab-btn-progress-bar" style={{ width: `${progress}%` }}></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Panels (Right) */}
        <div className="tab-panels">
          {jobsData.map((item, index) => {
            if (activeTab !== index) return null;
            return (
              <div
                key={index}
                className="tab-panel"
                id={`panel-${index}`}
                role="tabpanel"
                aria-labelledby={`tab-${index}`}
                tabIndex={0}
              >
                <h3>
                  <span className="job-title">{item.role}</span>
                  <span className="job-company">
                    &nbsp;@&nbsp;
                    <span className="company-link">{item.company}</span>
                  </span>
                </h3>
                <p className="job-range">{item.range}</p>
                <ul className="job-bullets">
                  {item.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;

