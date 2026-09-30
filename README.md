# Muhammad Hanzla — Portfolio ⚡

> **Full-Stack Developer & AI Systems Engineer**  
> B.S. Software Engineering, FAST NUCES Faisalabad (2022 – 2026)  
> 🌐 [Live Portfolio](https://hanzla.vercel.app) • 💼 [LinkedIn](https://www.linkedin.com/in/hanzlasheikh/) • 🐙 [GitHub](https://github.com/Hanzlase) • ✉️ [Email](mailto:hanzlasabir658@gmail.com)

---

## 🚀 Overview

A modern, high-performance personal portfolio showcasing full-stack web applications, agentic AI workflows, and cloud infrastructure projects. Built with **React 19**, **Vite**, and **Vanilla CSS** with a custom theme engine, micro-animations, and interactive project modal case studies.

### ✨ Key Features
- 🎨 **Multi-Theme Engine:** 7 curated dark and light color themes (Nordic Sand, Sage Executive, Champagne Obsidian, etc.) persisted via `localStorage`.
- ⚡ **Lightning Fast:** Sub-second load times powered by Vite 8 with zero heavy runtime overhead.
- 📱 **Fully Responsive:** Fluid layouts designed for mobile, tablet, and ultra-wide displays.
- 🔍 **Interactive Project Showcase:** Detailed case study modals, live demo links, repository archives, and multi-category filtering (Full-Stack, AI & ML, DevOps).
- ✉️ **Integrated Contact System:** Interactive message dispatch modal powered by EmailJS with real-time feedback and direct clipboard copying.
- 🛡️ **SEO & Social Optimization:** Dynamic OpenGraph metadata, structured semantic HTML5, and accessible UI landmarks.

---

## 🛠️ Tech Stack & Skills

| Domain | Technologies |
| :--- | :--- |
| **Languages** | Python, TypeScript, JavaScript (ES6+), SQL, C++ |
| **Frontend** | React 19, Next.js 14, Redux Toolkit, Tailwind CSS, Anime.js |
| **Backend** | FastAPI, Node.js, Express.js, RESTful APIs, WebSockets (Socket.IO) |
| **Databases** | PostgreSQL, MongoDB, Redis, MySQL, Prisma ORM |
| **AI & LLMs** | LangGraph, LangChain, Multi-Agent Systems, RAG Pipelines, FAISS, BM25, Cohere Rerank, Prompt Engineering |
| **Automation & Agentic AI** | Agent Orchestration, Tool Calling, n8n Workflow Automation |
| **DevOps & Cloud** | Docker, Kubernetes, AWS (EC2, S3, ALB), CI/CD (GitHub Actions), Terraform, Vercel |

---

## 🌟 Featured Projects

### 1. [Projectify — Multi-Campus FYP Lifecycle Platform](https://projectify.up.railway.app/)
- **Tech:** Next.js 14, Prisma ORM, PostgreSQL, Socket.IO, Redis, Cohere, Pinecone, Cloudflare R2
- **Highlights:** Proposal submission lifecycle, AI plagiarism similarity detection pipeline, smart faculty panel suggestion engine, and real-time collaboration.

### 2. [Healix — Autonomous CI/CD Auto-Healing System](https://healix-chi.vercel.app/)
- **Tech:** TypeScript, Node.js, GitHub Actions Webhooks, Gemini AI, Groq (Llama-3), CI/CD Automation
- **Highlights:** Cut MTTR by 60% by automatically detecting workflow failures, diagnosing root causes with Gemini AI, generating patches via Groq, and opening fix PRs.

### 3. [Scio AI — Autonomous Multi-Agent Research Platform](https://scioai.up.railway.app/)
- **Tech:** LangGraph, Next.js 14, FastAPI, Python, Tavily Search, OpenRouter, Groq
- **Highlights:** Multi-agent pipeline (Researcher, Writer, Critic) producing citation-backed reports with dynamic LLM routing and real-time progress streaming.

### 4. [Axios — Multi-Mode AI Learning Workspace](https://axios0.up.railway.app/)
- **Tech:** React, Tailwind CSS, FastAPI, Hybrid Search (FAISS + BM25), Cross-Encoder, SSE Streaming
- **Highlights:** 5 interactive learning modalities (Chat, Explain, Quiz, Summarise, Flashcards) with real-time Server-Sent Events (SSE) streaming and multi-LLM fallback.

---

## 💻 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hanzlase/hanzla.git
   cd hanzla
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional for Contact Form):**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🚢 Deployment

The repository is configured for deployment on **Vercel** via [`vercel.json`](./vercel.json):
- Client-side Single Page Application (SPA) route rewrites to `index.html`.
- Production cache-control headers for static assets and PDF documents.

---

## 📬 Contact & Connect

- **Email:** [hanzlasabir658@gmail.com](mailto:hanzlasabir658@gmail.com)
- **LinkedIn:** [linkedin.com/in/hanzlasheikh](https://www.linkedin.com/in/hanzlasheikh/)
- **GitHub:** [github.com/Hanzlase](https://github.com/Hanzlase)
- **Phone:** `+92 326 6099884`
