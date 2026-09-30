import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Nav from './components/Nav';
import SocialSidebar from './components/SocialSidebar';
import EmailSidebar from './components/EmailSidebar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';

const themes = [
  { id: 'nordic-sand', name: 'Nordic Sand', bg: '#f9f6f0', accent: '#c86246', mode: 'Light' },
  { id: 'warm-alabaster', name: 'Warm Alabaster', bg: '#fbfbfa', accent: '#1e4d2b', mode: 'Light' },
  { id: 'cool-minimalist', name: 'Cool Minimalist', bg: '#f8fafc', accent: '#2563eb', mode: 'Light' },
  { id: 'nordic-terracotta', name: 'Nordic Terracotta', bg: '#121214', accent: '#dd7a5f', mode: 'Dark' },
  { id: 'sage-executive', name: 'Sage Executive', bg: '#0a1118', accent: '#5eba97', mode: 'Dark' },
  { id: 'champagne-obsidian', name: 'Champagne Obsidian', bg: '#0b0c10', accent: '#e6c387', mode: 'Dark' },
  { id: 'plum-velvet', name: 'Plum Velvet', bg: '#0d0b12', accent: '#e3a857', mode: 'Dark' }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sidebarLoaded, setSidebarLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  /* ── Theme State (Ran in constructor phase to prevent FOUC / Loader mismatch) ── */
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        return saved;
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = prefersDark ? 'sage-executive' : 'nordic-sand';
      document.documentElement.setAttribute('data-theme', theme);
      return theme;
    }
    return 'nordic-sand';
  });

  /* ── Theme application effect ── */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('portfolio-theme', currentTheme);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      const activeTheme = themes.find(t => t.id === currentTheme);
      if (activeTheme) {
        themeColorMeta.setAttribute('content', activeTheme.bg);
      }
    }
  }, [currentTheme]);

  const finishLoading = () => {
    setIsLoading(false);
    setIsLoaded(true);
    setTimeout(() => setSidebarLoaded(true), 1200);
  };

  // 1. Intersection Observer for Active Section Tracking (Nav Highlight)
  useEffect(() => {
    if (isLoading) return;

    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = ['hero', 'about', 'jobs', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [isLoading]);

  return (
    <>
      <a href="#content" className="skip-to-content">
        Skip to Content
      </a>

      {isLoading ? (
        <Loader finishLoading={finishLoading} />
      ) : (
        <>
          <Nav
            activeSection={activeSection}
            isLoaded={isLoaded}
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
          />
          <SocialSidebar isLoaded={sidebarLoaded} />
          <EmailSidebar isLoaded={sidebarLoaded} />
          <main id="content" className="main-content">
            <Hero isLoaded={isLoaded} />
            <About />
            <Experience />
            <Work />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
