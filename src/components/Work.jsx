import React, { useState } from 'react';
import { FiGithub, FiExternalLink, FiFolder, FiMaximize2 } from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ProjectModal from './ProjectModal';

const featuredProjects = [
  {
    title: 'Projectify',
    badge: '★ FYP',
    image: '/assets/projectify/preview.jpg',
    description:
      'Architected a multi-campus FYP lifecycle platform (proposal submission, AI plagiarism detection, panel evaluation, milestone grading) using Next.js 14, Prisma ORM, PostgreSQL, and Socket.IO + Redis for real-time collaboration. Engineered an AI similarity pipeline, panel suggestion engine, and zero-egress Cloudflare R2 client.',
    tech: ['Next.js 14', 'Prisma ORM', 'PostgreSQL', 'Socket.IO', 'Redis', 'Cohere', 'Pinecone', 'Cloudflare R2'],
    github: 'https://github.com/Hanzlase/Projectify',
    external: 'https://projectify.up.railway.app/',
    alignment: 'left',
    gallery: [
      '/assets/projectify/preview.jpg'
    ],
    features: [
      'Multi-campus FYP lifecycle management covering proposal submission, evaluation, and milestone grading',
      'AI-powered plagiarism similarity detection pipeline powered by Cohere and Pinecone vector search',
      'Smart AI panel suggestion engine optimizing faculty workload and subject-matter matching',
      'Real-time collaborative updates and live status feeds via Socket.IO and Redis',
      'Zero-egress Cloudflare R2 client for document storage and automated in-process Gmail SMTP notifications'
    ],
    detailedDescription: 'Projectify is a comprehensive, multi-campus Final Year Project (FYP) lifecycle platform designed to streamline academic project coordination for students, supervisors, and administrative committees.\n\nConstructed with Next.js 14, Prisma ORM, and PostgreSQL, the platform features real-time collaboration via Socket.IO and Redis. It incorporates an AI-driven plagiarism detection pipeline utilizing Cohere embeddings and Pinecone vector search, an automated faculty panel suggestion engine, zero-egress Cloudflare R2 document storage, and an in-process Gmail SMTP meeting scheduler.'
  },
  {
    title: 'Healix',
    badge: 'Autonomous AI',
    image: '/assets/healix/preview.jpg',
    description:
      'Cut MTTR by 60% with an autonomous agent that intercepts failed GitHub Actions workflows via webhooks, diagnoses root causes using Gemini AI, generates patches via Groq, and automatically opens fix Pull Requests.',
    tech: ['TypeScript', 'Node.js', 'GitHub Actions', 'Gemini AI', 'Groq', 'Webhooks', 'CI/CD Automation'],
    github: 'https://github.com/Hanzlase/healix',
    external: 'https://healix-chi.vercel.app/',
    alignment: 'right',
    gallery: [
      '/assets/healix/preview.jpg'
    ],
    features: [
      'Real-time failure detection listening to GitHub Actions webhooks',
      'Automated root-cause diagnosis analyzing build and test logs with Gemini AI',
      'Sub-second code patch generation and validation using Groq Llama-3 inference',
      'Automated PR creation with comprehensive diagnosis and resolution summaries',
      'Demonstrated 60% Mean Time To Recovery (MTTR) reduction across test repositories'
    ],
    detailedDescription: 'Healix is an autonomous developer tooling platform engineered to slash Mean Time To Recovery (MTTR) in continuous integration pipelines. By intercepting GitHub Actions webhook payloads upon workflow failures, Healix isolates runtime errors, dependency mismatches, and regression bugs.\n\nLeveraging Gemini AI for deep log parsing and root-cause analysis, the platform formulates precise code corrections using Groq-accelerated models. It automatically creates a Git branch, commits the fix, and opens a Pull Request with complete diagnostics.'
  },
  {
    title: 'Scio AI',
    badge: 'Multi-Agent',
    image: '/assets/scioai/preview.jpg',
    description:
      'Reduced manual research time by 70% via a LangGraph multi-agent pipeline (Researcher, Writer, Critic) producing citation-backed reports; integrated Tavily web search and Groq/OpenRouter LLM routing on Next.js 14 and FastAPI.',
    tech: ['LangGraph', 'Next.js 14', 'FastAPI', 'Python', 'Tavily Search', 'OpenRouter', 'Groq'],
    github: 'https://github.com/Hanzlase/ScioAI',
    external: 'https://scioai.up.railway.app/',
    alignment: 'left',
    gallery: [
      '/assets/scioai/preview.jpg'
    ],
    features: [
      'Multi-agent orchestration pipeline with Researcher, Writer, and Critic agents',
      'Automated live web search querying and source synthesis via Tavily API',
      'Dynamic LLM fallback and cost-effective routing between Groq and OpenRouter',
      'Citation-backed markdown report generation with verifiable bibliography references',
      'Interactive Next.js interface with live agent step visualization and token streaming'
    ],
    detailedDescription: 'Scio AI transforms long-form academic and market research workflows into an automated multi-agent process. Using LangGraph state machines, Scio coordinates specialized autonomous agents: a Researcher that executes live web searches via Tavily, a Writer that synthesizes findings into structured sections, and a Critic that validates coherence and source grounding.\n\nThe system features dynamic model routing across Groq and OpenRouter on a FastAPI backend, coupled with a Next.js 14 frontend that streams reports in real time with interactive agent timeline tracking.'
  },
  {
    title: 'Axios',
    badge: 'AI Workspace',
    image: '/assets/axios/preview.jpg',
    description:
      'Delivered a five-mode AI platform (Chat, Explain, Quiz, Summarise, Flashcards) with Hybrid Search (FAISS + BM25), Cross-Encoder reranking, real-time SSE streaming, and multi-LLM fallback routing. Designed a responsive component-driven Tailwind frontend.',
    tech: ['React', 'Tailwind CSS', 'FastAPI', 'FAISS', 'BM25', 'Cross-Encoder', 'SSE Streaming'],
    github: 'https://github.com/Hanzlase/Axios',
    external: 'https://axios0.up.railway.app/',
    alignment: 'right',
    gallery: [
      '/assets/axios/preview.jpg'
    ],
    features: [
      'Five dedicated learning modes: Chat, Concept Explainer, Quiz Generator, Document Summariser, and Interactive Flashcards',
      'Hybrid search architecture combining dense FAISS embeddings with sparse BM25 keyword retrieval',
      'Cross-Encoder reranking stage elevating relevant context precision before generation',
      'Real-time Server-Sent Events (SSE) streaming for low-latency conversational feedback',
      'Responsive, component-driven UI styled with custom Tailwind color palettes'
    ],
    detailedDescription: 'Axios is an intelligent educational workspace designed to elevate comprehension across technical topics through five specialized AI interaction modes. Students can converse via context-aware chat, generate diagnostic quizzes, request analogies, summarize lecture materials, and study with active-recall flashcards.\n\nUnder the hood, Axios employs hybrid information retrieval combining dense vector similarity (FAISS) with sparse lexical matching (BM25), re-scored using Cross-Encoder models. The platform streams responses with sub-second time-to-first-token using Server-Sent Events.'
  }
];

const gridProjects = [
  {
    title: 'Voice Cloning N8N Agent',
    category: 'ai',
    description:
      'Automated media processing pipeline utilizing FastAPI, Docker, and n8n to orchestrate OpenVoice AI models for high-fidelity cloning.',
    tech: ['FastAPI', 'Docker', 'n8n', 'OpenVoice', 'Audio AI'],
    github: 'https://github.com/Hanzlase/VoiceCloning_N8N-Agent',
    external: 'https://github.com/Hanzlase/VoiceCloning_N8N-Agent',
    features: [
      'FastAPI server routing text-to-speech synthesis and voice upload tasks',
      'Pre-built n8n workflows for automated webhook triggers and API processing',
      'High-fidelity zero-shot voice cloning from short reference audio files'
    ],
    detailedDescription: 'A self-hosted media orchestration pipeline that bridges FastAPI backends and n8n workflow automation to deploy OpenVoice AI models. The workflow supports text-to-speech generation and high-fidelity voice cloning from short reference audio files.'
  },
  {
    title: 'NeurIPS Paper Scraper',
    category: 'ai',
    description:
      'Python scraping scripts using multiprocessing to extract paper PDFs and metadata, with automated Google Gemini AI categorizations.',
    tech: ['Python', 'Multiprocessing', 'Gemini API', 'Web Scraping'],
    github: 'https://github.com/Hanzlase/NeurIPS-Paper-Scraper',
    external: 'https://github.com/Hanzlase/NeurIPS-Paper-Scraper',
    features: [
      'Python multiprocess scraping pipeline accelerating PDF document downloads',
      'Automated metadata extraction capturing titles, authors, and abstract details',
      'Google Gemini API integration to parse and annotate paper categories dynamically'
    ],
    detailedDescription: 'A high-performance Python scraping and annotating utility designed to compile research datasets from the NeurIPS conference. Leveraging multiprocessing modules, the scraper downloads paper PDFs and metadata in parallel, then forwards abstracts to the Google Gemini AI API to assign relevant academic tags.'
  },
  {
    title: 'PolicyGuard AI',
    category: 'ai',
    description:
      'AI compliance and policy monitoring agent utilizing LLM verification pipelines to audit internal documents and regulatory terms.',
    tech: ['Python', 'LangChain', 'LLM Agents', 'Vector Search'],
    github: 'https://github.com/Hanzlase/PolicyGuardAI',
    external: 'https://github.com/Hanzlase/PolicyGuardAI',
    features: [
      'Document parsing and semantic chunking for enterprise policy texts',
      'Automated contradiction detection against regulatory guidelines',
      'Structured executive compliance audit reports generation'
    ],
    detailedDescription: 'PolicyGuard AI is an automated compliance verification agent that parses organization terms, flags regulatory violations, and generates actionable risk assessment audit reports using LangChain and LLM verification chains.'
  },
  {
    title: 'Quizlyst AI',
    category: 'ai',
    description:
      'AI-driven assessment and quiz generation platform with adaptive question difficulty and automated rubric grading.',
    tech: ['React', 'FastAPI', 'OpenAI', 'Prompt Engineering'],
    github: 'https://github.com/Hanzlase/QuizlystAI',
    external: 'https://github.com/Hanzlase/QuizlystAI',
    features: [
      'Dynamic quiz generation from syllabus documents and transcripts',
      'Multi-format questions: multiple choice, true/false, and short answer',
      'Instant conceptual feedback and explanations for missed answers'
    ],
    detailedDescription: 'Quizlyst AI transforms educational material into interactive, dynamically balanced diagnostic quizzes with automated feedback and difficulty adaptation.'
  },
  {
    title: 'MediLex AI',
    category: 'ai',
    description:
      'Clinical question-answering assistant implementing multi-stage RAG across medical literature, reducing clinical research search overhead.',
    tech: ['Python', 'RAG', 'Vector Search', 'Clinical NLP'],
    github: 'https://github.com/Hanzlase/MediLex-AI-',
    external: 'https://github.com/Hanzlase/MediLex-AI-',
    features: [
      'Multi-stage RAG retrieval over curated clinical literature',
      'Hallucination prevention through strict grounding thresholds',
      'Medical terminology extraction and layman translation toggles'
    ],
    detailedDescription: 'A medical literature search and clinical question-answering assistant implementing multi-stage RAG, designed to assist medical practitioners in retrieving evidence-based research rapidly.'
  },
  {
    title: 'K8s MERN Deployment',
    category: 'devops',
    description:
      'Containerized full-stack deployment pipeline using Docker and Kubernetes with ingress routing, persistent volumes, and auto-scaling.',
    tech: ['Kubernetes', 'Docker', 'MERN', 'DevOps', 'Scaling'],
    github: 'https://github.com/Hanzlase/k8s-mern-deployment',
    external: 'https://github.com/Hanzlase/k8s-mern-deployment',
    features: [
      'Docker multi-stage builds minimizing production image footprint',
      'Kubernetes manifests with deployments, services, and ingress rules',
      'Horizontal Pod Autoscaling (HPA) configured for high-traffic spikes'
    ],
    detailedDescription: 'Production-ready Kubernetes deployment architecture for multi-tier full-stack applications with horizontal pod autoscaling, persistent volumes, and ingress routing.'
  },
  {
    title: 'AWS Scalable Cloud Infrastructure',
    category: 'devops',
    description:
      'High-availability, fault-tolerant 3-tier cloud architecture provisioned on AWS with Terraform, Auto-Scaling Groups, and load balancers.',
    tech: ['Terraform', 'AWS EC2', 'VPC', 'ALB', 'Cloud Architecture'],
    github: 'https://github.com/Hanzlase/aws-scalable-web-architecture',
    external: 'https://github.com/Hanzlase/aws-scalable-web-architecture',
    features: [
      'Infrastructure-as-Code (IaC) modular templates written in Terraform',
      'Multi-Availability Zone VPC setup with public/private subnets and NAT gateways',
      'Application Load Balancer (ALB) routing traffic to auto-scaled EC2 instances'
    ],
    detailedDescription: 'High-availability, fault-tolerant 3-tier cloud infrastructure provisioned on AWS using Terraform with auto-scaling groups, application load balancers, and multi-AZ database clustering.'
  },
  {
    title: 'Smart Drone Delivery System',
    category: 'web',
    description:
      'Dispatch coordination platform and autonomous pathfinding simulation for fleet drone delivery operations with real-time waypoint tracking.',
    tech: ['Node.js', 'React', 'MongoDB', 'Pathfinding', 'IoT'],
    github: 'https://github.com/Hanzlase/Smart-Drone-Delivery-System',
    external: 'https://github.com/Hanzlase/Smart-Drone-Delivery-System',
    features: [
      'Dispatch management dashboard tracking drone battery and payload metrics',
      'Optimal waypoint pathfinding algorithms avoiding restricted airspace',
      'Real-time simulation engine showing active fleet delivery progress'
    ],
    detailedDescription: 'An interactive dispatch and pathfinding management system for autonomous delivery drones, featuring real-time waypoint plotting, battery telemetry, and automated package routing.'
  },
  {
    title: 'SpotterLog AI',
    category: 'ai',
    description:
      'Computer vision and activity spotter platform using visual embeddings to detect events and maintain automated audit logs.',
    tech: ['Python', 'Computer Vision', 'PyTorch', 'Logging'],
    github: 'https://github.com/Hanzlase/SpotterLogAI',
    external: 'https://github.com/Hanzlase/SpotterLogAI',
    features: [
      'Real-time video frame processing with PyTorch object detection',
      'Automated anomaly spotting and event timestamp logging',
      'Searchable event archive and alert notification triggers'
    ],
    detailedDescription: 'Computer vision application designed for automated activity spotting and verification, transforming raw video streams into structured, searchable activity logs.'
  },
  {
    title: 'VocalizeMe Audio Studio',
    category: 'ai',
    description:
      'Neural audio synthesis and voice modification interface for real-time speech transformation with customizable acoustic parameters.',
    tech: ['Python', 'TTS', 'PyTorch', 'FastAPI'],
    github: 'https://github.com/Hanzlase/VocalizeMe',
    external: 'https://github.com/Hanzlase/VocalizeMe',
    features: [
      'Neural text-to-speech generation with natural intonation',
      'Voice timbre, pitch, and cadence modification controls',
      'FastAPI REST endpoints for seamless audio integration'
    ],
    detailedDescription: 'A neural audio synthesis tool developed with PyTorch and FastAPI, providing flexible voice transformation, pitch modulation, and natural text-to-speech generation.'
  }
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'web', name: 'Full-Stack & Web' },
  { id: 'ai', name: 'AI & Machine Learning' },
  { id: 'devops', name: 'DevOps & QA' },
];

const Work = () => {
  const [ref, isRevealed] = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState(null);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setShowAll(false);
  };

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1,
    };

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    }, options);

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => cardObserver.observe(card));

    return () => {
      cards.forEach((card) => cardObserver.unobserve(card));
    };
  }, [showAll, activeCategory]);

  const getProjectScore = (p) => {
    const hasVideo = !!p.demoVideo;
    const hasPicture = !!(p.image || (p.gallery && p.gallery.length > 0));
    if (hasVideo && hasPicture) return 2;
    if (hasPicture) return 1;
    return 0;
  };

  const filteredProjects = (activeCategory === 'all'
    ? gridProjects
    : gridProjects.filter(p => p.category === activeCategory)
  )
    .map((p, originalIndex) => ({ p, originalIndex }))
    .sort((a, b) => {
      const scoreA = getProjectScore(a.p);
      const scoreB = getProjectScore(b.p);
      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }
      return a.originalIndex - b.originalIndex;
    })
    .map(item => item.p);

  return (
    <section
      ref={ref}
      id="projects"
      className={`projects-section scroll-reveal ${isRevealed ? 'visible' : ''}`}
      style={{ '--section-num': '"03."' }}
    >
      <h2 className="numbered-heading">Some Things I've Built</h2>

      {/* Part A: Featured Projects */}
      <div className="featured-grid">
        {featuredProjects.map((project, index) => (
          <div key={index} className={`featured-project ${project.alignment === 'right' ? 'reverse' : ''}`}>
            {/* Project Screenshot - click triggers Modal */}
            <div className="project-image" onClick={() => setActiveModalProject(project)} style={{ cursor: 'pointer' }}>
              <div className="image-overlay"></div>
              {project.image ? (
                <img src={project.image} alt={project.title} className="project-screenshot-img" />
              ) : (
                <div className="tech-box-placeholder">
                  <div className="placeholder-grid-dots"></div>
                  <span className="placeholder-text">&lt;Code /&gt;</span>
                </div>
              )}
            </div>

            {/* Project Text Content */}
            <div className="project-content">
              <p className="project-overline">
                Featured Project {project.badge && <span className="project-badge">{project.badge}</span>}
              </p>
              {/* Project Title - click triggers Modal */}
              <h3 className="project-title" onClick={() => setActiveModalProject(project)} style={{ cursor: 'pointer' }}>
                {project.title}
              </h3>
              <div className="project-description" onClick={() => setActiveModalProject(project)} style={{ cursor: 'pointer' }}>
                <p>{project.description}</p>
              </div>
              <ul className="project-tech-list">
                {project.tech.map((techItem, i) => (
                  <li key={i}>{techItem}</li>
                ))}
              </ul>
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                    <FiGithub size={20} />
                  </a>
                )}
                {project.external && (
                  <a href={project.external} target="_blank" rel="noopener noreferrer" aria-label="External Link">
                    <FiExternalLink size={20} />
                  </a>
                )}
                <button
                  className="project-icon-btn"
                  onClick={() => setActiveModalProject(project)}
                  aria-label="View Case Study"
                >
                  <FiMaximize2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Part B: Other Noteworthy Projects Grid */}
      <div className="other-projects-wrapper">
        <h3 className="other-title">Other Noteworthy Projects</h3>
        <a href="https://github.com/Hanzlase?tab=repositories" target="_blank" rel="noopener noreferrer" className="archive-link">
          view the archive
        </a>

        {/* Category Tabs */}
        <ul className="project-tabs-list">
          {categories.map((cat, idx) => (
            <li key={cat.id} className="project-tab-item">
              <button
                className={`project-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <span className="nav-link-num">0{idx + 1}.</span> {cat.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => {
            const isHidden = activeCategory === 'all' && index >= 6 && !showAll;
            const delay = activeCategory === 'all' && index >= 6 ? (index - 6) * 60 : 0;

            return (
              <div
                key={project.title}
                className={`project-card ${isHidden ? 'hidden' : 'visible'}`}
                style={{
                  transitionDelay: `${delay}ms`,
                  display: isHidden ? 'none' : 'flex',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveModalProject(project)}
              >
                <div className="card-inner">
                  <header>
                    <div className="card-header-top">
                      <div className="folder-icon">
                        <FiFolder size={40} />
                      </div>
                      <div className="card-links">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiGithub size={20} />
                          </a>
                        )}
                        {project.external && (
                          <a
                            href={project.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="External Link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiExternalLink size={20} />
                          </a>
                        )}
                        <button
                          className="project-icon-btn"
                          aria-label="View details"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalProject(project);
                          }}
                        >
                          <FiMaximize2 size={18} />
                        </button>
                      </div>
                    </div>
                    <h4 className="card-title">
                      {project.title}
                    </h4>
                    <p className="card-desc">{project.description}</p>
                  </header>
                  <footer className="card-footer">
                    <ul className="card-tech-list">
                      {project.tech.map((techItem, i) => (
                        <li key={i}>{techItem}</li>
                      ))}
                    </ul>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>

        {activeCategory === 'all' && (
          <button className="ghost-button showmore-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};

export default Work;
