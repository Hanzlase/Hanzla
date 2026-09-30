import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import profileImg from '../assets/profile.png';

const About = () => {
  const [ref, isRevealed] = useScrollReveal();
  const skills = [
    'React & Next.js',
    'FastAPI & Node.js',
    'LangGraph & LangChain',
    'Python & TypeScript',
    'PostgreSQL & Prisma',
    'Docker & Kubernetes',
  ];

  return (
    <section
      ref={ref}
      id="about"
      className={`about-section scroll-reveal ${isRevealed ? 'visible' : ''}`}
      style={{ '--section-num': '"01."' }}
    >
      <h2 className="numbered-heading">About Me</h2>

      <div className="about-content">
        {/* Left Column: Bio & Skills */}
        <div className="about-left">
          <p>
            I'm a Software Engineering student at FAST NUCES Faisalabad passionate about engineering
            intelligent applications and scalable web systems. I care deeply about building seamless
            user experiences powered by robust, production-grade backends and modern AI pipelines.
          </p>
          <p>
            My work focuses on full-stack development with Next.js, React, Node.js, and FastAPI,
            coupled with autonomous agent architectures using LangGraph, RAG pipelines with hybrid
            vector search, and workflow automation with n8n. I'm comfortable owning a feature from
            database schema design through to deployment on AWS and Kubernetes.
          </p>
          <p>
            Here are a few key technologies I've been working with recently:
          </p>

          <ul className="skills-list">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* Right Column: Stylized Image Block */}
        <div className="about-right">
          <div className="profile-wrapper">
            <div className="profile-box">
              <img src={profileImg} alt="Muhammad Hanzla" className="profile-image-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
