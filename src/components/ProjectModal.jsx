import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { FiGithub, FiExternalLink, FiX, FiChevronUp, FiChevronDown, FiKey, FiAlertCircle, FiBriefcase, FiMail, FiLock } from 'react-icons/fi';

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`;
  }
  return null;
};

const getImageTitle = (src) => {
  if (!src) return '';
  const filename = src.split('/').pop().replace(/\.[^/.]+$/, '');
  return filename
    .replace(/[-_]+/g, ' ')
    .replace(/\bRag\b/gi, 'RAG')
    .replace(/\bFyp\b/gi, 'FYP')
    .replace(/\bAi\b/gi, 'AI')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const ProjectModal = ({ project, onClose }) => {
  const [activePicIndex, setActivePicIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);
  const carouselRef = useRef(null);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);

  // Compile picture items (primary image + gallery images)
  const pictureItems = [];
  if (project?.image) {
    pictureItems.push(project.image);
  }
  if (project?.gallery && project.gallery.length > 0) {
    project.gallery.forEach((img) => {
      if (img !== project.image && !pictureItems.includes(img)) {
        pictureItems.push(img);
      }
    });
  }

  // Reset active image index whenever the opened project changes
  useEffect(() => {
    setActivePicIndex(0);
  }, [project]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for transition animation to complete
  };

  // Lock scroll on body when modal is open
  useEffect(() => {
    if (project) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [project]);

  // Handle ESC and Arrow keys
  const handlePrevPic = useCallback(() => {
    setActivePicIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextPic = useCallback(() => {
    setActivePicIndex((prev) => (prev < pictureItems.length - 1 ? prev + 1 : prev));
  }, [pictureItems.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowDown' && pictureItems.length > 1) {
        e.preventDefault();
        handleNextPic();
      } else if (e.key === 'ArrowUp' && pictureItems.length > 1) {
        e.preventDefault();
        handlePrevPic();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextPic, handlePrevPic, pictureItems.length]);

  // Smooth mouse-wheel scrolling directly inside the vertical carousel
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || pictureItems.length <= 1) return;

    let wheelAccumulator = 0;
    let lastWheelTime = 0;

    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      wheelAccumulator += e.deltaY;

      // Throttle wheel ticks for smooth 1-by-1 snapping transitions
      if (Math.abs(wheelAccumulator) >= 30 && now - lastWheelTime > 180) {
        if (wheelAccumulator > 0) {
          setActivePicIndex((prev) => Math.min(prev + 1, pictureItems.length - 1));
        } else {
          setActivePicIndex((prev) => Math.max(prev - 1, 0));
        }
        wheelAccumulator = 0;
        lastWheelTime = now;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [pictureItems.length]);

  // Touch and drag swipe handlers
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches ? e.touches[0].clientY : e.clientY;
    isDragging.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const diff = touchStartY.current - endY;

    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        handleNextPic();
      } else {
        handlePrevPic();
      }
    }
  };

  if (!project) return null;

  return createPortal(
    <div
      className={`project-modal-backdrop ${isClosing ? 'closing' : ''}`}
      onClick={(e) => {
        if (e.target.classList.contains('project-modal-backdrop')) {
          handleClose();
        }
      }}
    >
      <div className={`project-modal-container ${isClosing ? 'closing' : ''}`} ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Close Button */}
        <button className="project-modal-close-btn" onClick={handleClose} aria-label="Close details modal">
          <FiX size={24} />
        </button>

        <div className="project-modal-content">
          {/* Left Column: Stacked Video & Picture Sections */}
          <div className="project-modal-media-section">
            {/* Video Player Section */}
            {project.demoVideo && (() => {
              const videos = Array.isArray(project.demoVideo) ? project.demoVideo : [project.demoVideo];
              return (
                <div className="project-modal-video-section" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <p className="project-modal-media-label">Demo Video{videos.length > 1 ? 's' : ''}</p>
                  {videos.map((videoUrl, idx) => {
                    const embedUrl = getYouTubeEmbedUrl(videoUrl);
                    return (
                      <div className="project-modal-video-wrapper" key={idx}>
                        {embedUrl ? (
                          <iframe
                            className="project-modal-video-iframe"
                            src={embedUrl}
                            title={`${project.title} Demo Video ${idx + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <video className="project-modal-video-player" src={videoUrl} controls playsInline>
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* Vertical 3D Cover Flow Gallery Section */}
            {pictureItems.length > 1 ? (
              <div className="project-modal-pictures-section">
                <div className="project-modal-media-header">
                  <p className="project-modal-media-label">Interactive Gallery</p>
                  <span className="vertical-carousel-count-hint">
                    {activePicIndex + 1} / {pictureItems.length}
                  </span>
                </div>
                <div
                  className="project-modal-vertical-carousel"
                  ref={carouselRef}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleTouchStart}
                  onMouseUp={handleTouchEnd}
                >
                  <div className="vertical-carousel-vignette-top" />
                  <div className="vertical-carousel-vignette-bottom" />

                  {/* Top & Bottom Quick Nav Controls */}
                  <div className="vertical-carousel-controls">
                    <button
                      className={`vertical-carousel-arrow up ${activePicIndex === 0 ? 'disabled' : ''}`}
                      onClick={handlePrevPic}
                      disabled={activePicIndex === 0}
                      aria-label="Previous screenshot (scroll up)"
                      title="Scroll up (Previous)"
                    >
                      <FiChevronUp size={18} />
                    </button>
                    <button
                      className={`vertical-carousel-arrow down ${activePicIndex === pictureItems.length - 1 ? 'disabled' : ''}`}
                      onClick={handleNextPic}
                      disabled={activePicIndex === pictureItems.length - 1}
                      aria-label="Next screenshot (scroll down)"
                      title="Scroll down (Next)"
                    >
                      <FiChevronDown size={18} />
                    </button>
                  </div>

                  {/* 3D Stacked Carousel Stage */}
                  <div className="vertical-carousel-stage">
                    {pictureItems.map((imgSrc, idx) => {
                      const diff = idx - activePicIndex;
                      let cardClass = 'vertical-carousel-card';
                      if (diff === 0) cardClass += ' is-center';
                      else if (diff === -1) cardClass += ' is-upper-1';
                      else if (diff === 1) cardClass += ' is-lower-1';
                      else if (diff === -2) cardClass += ' is-upper-2';
                      else if (diff === 2) cardClass += ' is-lower-2';
                      else if (diff < -2) cardClass += ' is-hidden-top';
                      else cardClass += ' is-hidden-bottom';

                      return (
                        <div
                          key={idx}
                          className={cardClass}
                          onClick={() => {
                            if (diff !== 0) setActivePicIndex(idx);
                          }}
                          role="button"
                          tabIndex={diff === 0 ? 0 : -1}
                          aria-label={getImageTitle(imgSrc)}
                        >
                          <div className="carousel-card-inner">
                            <img
                              src={imgSrc}
                              alt={`${project.title} - ${getImageTitle(imgSrc)}`}
                              className="vertical-carousel-image"
                              loading="lazy"
                            />
                            {diff !== 0 && <div className="carousel-card-scrim" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Vertical Navigation Bar on the right */}
                  <div className="vertical-carousel-nav-track">
                    {pictureItems.map((_, idx) => (
                      <button
                        key={idx}
                        className={`vertical-carousel-nav-dot ${idx === activePicIndex ? 'active' : ''}`}
                        onClick={() => setActivePicIndex(idx)}
                        aria-label={`Jump to screenshot ${idx + 1}`}
                        title={getImageTitle(pictureItems[idx])}
                      />
                    ))}
                  </div>

                  {/* Bottom Footer Bar: Badge and Hint */}
                  <div className="vertical-carousel-footer-bar">
                    <div className="vertical-carousel-tag">
                      <span className="carousel-index-badge">
                        {String(activePicIndex + 1).padStart(2, '0')} / {String(pictureItems.length).padStart(2, '0')}
                      </span>
                      <span className="carousel-image-name">{getImageTitle(pictureItems[activePicIndex])}</span>
                    </div>
                    <div className="carousel-scroll-hint">
                      <span>Scroll to explore</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : pictureItems.length === 1 ? (
              <div className="project-modal-pictures-section">
                <p className="project-modal-media-label">Screenshots</p>
                <div className="project-modal-pictures-wrapper">
                  <img 
                    className="project-modal-image" 
                    style={{ objectFit: project.imageFit === 'cover' ? 'cover' : 'contain' }}
                    src={pictureItems[0]} 
                    alt={`${project.title} preview`} 
                  />
                </div>
              </div>
            ) : (
              <div className="project-modal-pictures-section">
                <p className="project-modal-media-label">Screenshots</p>
                <div className="project-modal-pictures-wrapper placeholder">
                  <div className="project-modal-media-placeholder">
                    <div className="placeholder-dots"></div>
                    <span>&lt;Code /&gt;</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Project Details */}
          <div className="project-modal-info-section">
            <p className="project-modal-overline">
              {project.badge || 'Case Study'} &mdash; {project.category ? project.category.toUpperCase() : 'PROJECT'}
            </p>
            <h3 id="modal-title" className="project-modal-title">
              {project.title}
            </h3>

            {/* Tech Tags */}
            <ul className="project-modal-tech-list">
              {project.tech &&
                project.tech.map((techItem, i) => (
                  <li key={i} className="project-modal-tech-tag">
                    {techItem}
                  </li>
                ))}
            </ul>

            {/* Detailed Description */}
            <div className="project-modal-description-wrapper">
              {project.detailedDescription ? (
                project.detailedDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="project-modal-desc-p">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="project-modal-desc-p">{project.description}</p>
              )}
            </div>

            {/* Demo Credentials Section */}
            {project.demoCredentials && (
              <div className="project-modal-credentials-section">
                <h4 className="project-modal-credentials-title">
                  <FiKey size={18} style={{ color: 'var(--green)' }} />
                  Demo Credentials
                </h4>
                <ul className="project-modal-credentials-list">
                  <li className="project-modal-credentials-item">
                    <FiBriefcase size={14} style={{ color: 'var(--green)', flexShrink: 0 }} />
                    <span className="project-modal-credentials-label">Company Name:</span>
                    <strong className="project-modal-credentials-value">{project.demoCredentials.companyName}</strong>
                  </li>
                  <li className="project-modal-credentials-item">
                    <FiMail size={14} style={{ color: 'var(--green)', flexShrink: 0 }} />
                    <span className="project-modal-credentials-label">Email:</span>
                    <strong className="project-modal-credentials-value">{project.demoCredentials.email}</strong>
                  </li>
                  <li className="project-modal-credentials-item">
                    <FiLock size={14} style={{ color: 'var(--green)', flexShrink: 0 }} />
                    <span className="project-modal-credentials-label">Password:</span>
                    <strong className="project-modal-credentials-value">{project.demoCredentials.password}</strong>
                  </li>
                </ul>
                {project.demoCredentials.note && (
                  <p className="project-modal-credentials-note">
                    <FiAlertCircle size={14} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
                    <span>{project.demoCredentials.note}</span>
                  </p>
                )}
              </div>
            )}

            {/* Key Features List */}
            {project.features && project.features.length > 0 && (
              <div className="project-modal-features-section">
                <h4>Key Features & Highlights</h4>
                <ul className="project-modal-features-list">
                  {project.features.map((feature, i) => (
                    <li key={i} className="project-modal-feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action CTAs */}
            <div className="project-modal-actions">
              {project.external && (
                <a
                  href={project.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-button modal-action-btn primary"
                >
                  <FiExternalLink size={16} style={{ marginRight: '8px' }} />
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-button modal-action-btn"
                >
                  <FiGithub size={16} style={{ marginRight: '8px' }} />
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
