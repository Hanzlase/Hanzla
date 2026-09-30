import React, { useState, useEffect } from 'react';

// Hero items appear 600ms after isLoaded
// (after logo ~100ms + nav links ~100-500ms are visible)
const HERO_DELAY = 100;

const Hero = ({ isLoaded }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    const t = setTimeout(() => setIsMounted(true), HERO_DELAY);
    return () => clearTimeout(t);
  }, [isLoaded]);

  const items = [
    <h1 className="hero-overline">Hi, my name is</h1>,
    <h2 className="big-heading hero-title-name">Muhammad Hanzla.</h2>,
    <h3 className="big-heading hero-title-subtitle">I build intelligent full-stack & AI applications.</h3>,
    <p className="hero-description">
      I'm a Software Engineering student at FAST NUCES Faisalabad specializing in building
      scalable full-stack web applications across React, Next.js, Node.js, and FastAPI.
      Experienced in building production RAG pipelines, multi-agent systems with LangGraph,
      and workflow automation with n8n.
    </p>,
    <a href="#projects" className="ghost-button hero-cta-btn">
      Check out my work!
    </a>,
  ];

  return (
    <section id="hero" className="hero-section">
      {items.map((item, i) => (
        <div
          key={i}
          className={`hero-item${isMounted ? ' visible' : ''}`}
          style={{ transitionDelay: `${isMounted ? (i + 1) * 100 : 0}ms` }}
        >
          {item}
        </div>
      ))}
    </section>
  );
};

export default Hero;
