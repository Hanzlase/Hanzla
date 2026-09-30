import React, { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const navLinks = [
  { name: 'About',      url: '#about'    },
  { name: 'Experience', url: '#jobs'     },
  { name: 'Work',       url: '#projects' },
  { name: 'Contact',    url: '#contact'  },
];

const themes = [
  { id: 'nordic-sand', name: 'Nordic Sand', bg: '#f9f6f0', accent: '#c86246', mode: 'Light' },
  { id: 'warm-alabaster', name: 'Warm Alabaster', bg: '#fbfbfa', accent: '#1e4d2b', mode: 'Light' },
  { id: 'cool-minimalist', name: 'Cool Minimalist', bg: '#f8fafc', accent: '#2563eb', mode: 'Light' },
  { id: 'nordic-terracotta', name: 'Nordic Terracotta', bg: '#121214', accent: '#dd7a5f', mode: 'Dark' },
  { id: 'sage-executive', name: 'Sage Executive', bg: '#0a1118', accent: '#5eba97', mode: 'Dark' },
  { id: 'champagne-obsidian', name: 'Champagne Obsidian', bg: '#0b0c10', accent: '#e6c387', mode: 'Dark' },
  { id: 'plum-velvet', name: 'Plum Velvet', bg: '#0d0b12', accent: '#e3a857', mode: 'Dark' }
];

const PaletteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="20"
    height="20"
  >
    <path d="M12 22C17.52 22 22 17.52 22 12S17.52 2 12 2 2 6.48 2 12c0 2.2.8 4.2 2.1 5.7.4.4.5 1 .3 1.5l-.2.6c-.3.9.5 1.7 1.4 1.4l.6-.2c.5-.2 1.1-.1 1.5.3C9.2 21.7 10.5 22 12 22z" />
    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
    <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" />
  </svg>
);

// Logo + nav links mount 100ms after isLoaded
const LOGO_DELAY   = 100;

const Nav = ({ activeSection, isLoaded, currentTheme, setCurrentTheme }) => {
  const [logoMounted,  setLogoMounted]  = useState(false);
  const [linksMounted, setLinksMounted] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Theme Switcher Open State ── */
  const [switcherOpen, setSwitcherOpen] = useState(false);

  /* ── Resume Dropdown Open State ── */
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);

  /* ── Scroll direction tracking ── */
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolledToTop(y < 50);
      setScrollDirection(y > lastScrollY ? 'down' : 'up');
      lastScrollY = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Logo appears first, then links ── */
  useEffect(() => {
    if (!isLoaded) return;
    const t1 = setTimeout(() => setLogoMounted(true),  LOGO_DELAY);
    const t2 = setTimeout(() => setLinksMounted(true), LOGO_DELAY + 50);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isLoaded]);

  /* ── Body scroll lock for mobile menu ── */
  useEffect(() => {
    document.body.classList.toggle('hidden', menuOpen);
    return () => document.body.classList.remove('hidden');
  }, [menuOpen]);



  /* ── Close theme switcher on outside click ── */
  useEffect(() => {
    if (!switcherOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.theme-switcher-container')) {
        setSwitcherOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [switcherOpen]);

  /* ── Close resume dropdown on outside click ── */
  useEffect(() => {
    if (!resumeDropdownOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.resume-dropdown-container')) {
        setResumeDropdownOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [resumeDropdownOpen]);

  const toggleMenu = () => setMenuOpen(v => !v);
  const closeMenu  = () => setMenuOpen(false);

  const isScrolledUp   = scrollDirection === 'up'   && !scrolledToTop;
  const isScrolledDown = scrollDirection === 'down'  && !scrolledToTop;

  let headerClass = 'header-nav';
  if (isScrolledUp)   headerClass += ' scrolled-up';
  if (isScrolledDown) headerClass += ' scrolled-down';

  const renderThemeSwitcher = () => (
    <div className="theme-switcher-container">
      <button
        className="theme-switcher-btn"
        onClick={() => setSwitcherOpen(open => !open)}
        aria-label="Switch Theme"
        aria-haspopup="true"
        aria-expanded={switcherOpen}
      >
        <PaletteIcon />
      </button>
      <div className={`theme-switcher-dropdown${switcherOpen ? ' open' : ''}`}>
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`theme-option${currentTheme === theme.id ? ' active' : ''}`}
            onClick={() => {
              setCurrentTheme(theme.id);
              setSwitcherOpen(false);
            }}
          >
            <div className="theme-option-info">
              <span
                className="theme-swatch"
                style={{
                  '--theme-bg': theme.bg,
                  '--theme-accent': theme.accent
                }}
              />
              <span>{theme.name}</span>
            </div>
            <span style={{ fontSize: '10px', opacity: 0.5 }}>{theme.mode}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <header className={headerClass}>
      <nav className="nav-container">

        {/* ── Logo ── */}
        <div className="nav-logo" tabIndex="-1">
          <a
            href="#"
            aria-label="Home"
            className={`logo-link${logoMounted ? ' mounted' : ''}`}
          >
            <div className="hex-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 115"
                role="img"
                aria-hidden="true"
              >
                <polygon
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="currentColor"
                  points="50,6 93,29.5 93,76.5 50,100 7,76.5 7,29.5"
                />
              </svg>
            </div>
            <div className="logo-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 115"
                role="img"
                aria-hidden="true"
              >
                {/* Navy-filled hex so the outline stroke looks clean */}
                <polygon
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="var(--navy)"
                  points="50,6 93,29.5 93,76.5 50,100 7,76.5 7,29.5"
                />
                {/* H letter centred inside the hex */}
                <text
                  x="50"
                  y="72"
                  fill="currentColor"
                  fontSize="44"
                  fontFamily="'Fira Code', 'Source Code Pro', monospace"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  H
                </text>
              </svg>
            </div>
          </a>
        </div>

        {/* ── Desktop Nav Links ── */}
        <div className="nav-links-desktop">
          <ol className="nav-links-list">
            {navLinks.map((link, i) => (
              <li
                key={i}
                className={`nav-link-item${linksMounted ? ' mounted' : ''}`}
                style={{ transitionDelay: `${linksMounted ? i * 100 : 0}ms` }}
              >
                <a
                  href={link.url}
                  className={activeSection === link.url.substring(1) ? 'active' : ''}
                >
                  <span className="nav-link-num">0{i + 1}.</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ol>
          <div
            className={`nav-theme-switcher-wrapper${linksMounted ? ' mounted' : ''}`}
            style={{ transitionDelay: `${linksMounted ? navLinks.length * 100 : 0}ms` }}
          >
            {renderThemeSwitcher()}
          </div>
          <div
            className={`nav-resume-btn${linksMounted ? ' mounted' : ''}`}
            style={{ transitionDelay: `${linksMounted ? (navLinks.length + 1) * 100 : 0}ms` }}
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-button resume-btn"
            >
              Resume
            </a>
          </div>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className={`hamburger-btn${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
        >
          <div className="ham-box">
            <div className="ham-inner" />
          </div>
        </button>

        {/* ── Mobile Sidebar ── */}
        <aside
          className={`mobile-sidebar${menuOpen ? ' open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <nav className="mobile-nav">
            <ol className="mobile-links-list">
              {navLinks.map((link, i) => (
                <li key={i} className="mobile-link-item">
                  <a href={link.url} onClick={closeMenu}>
                    <span className="mobile-link-num">0{i + 1}.</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ol>
            {renderThemeSwitcher()}
            <div className="mobile-resume-wrapper">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-button mobile-resume-btn"
                onClick={closeMenu}
              >
                Resume
              </a>
            </div>
            <div className="mobile-socials">
              <a href="https://github.com/Hanzlase" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub size={22} />
              </a>
              <a href="https://www.linkedin.com/in/hanzlasheikh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin size={22} />
              </a>
            </div>
          </nav>
        </aside>
        <div
          className={`mobile-sidebar-overlay${menuOpen ? ' open' : ''}`}
          onClick={closeMenu}
        />
      </nav>
    </header>
  );
};

export default Nav;
