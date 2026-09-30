import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiGithub, FiExternalLink, FiX, FiChevronLeft, FiChevronRight, FiKey, FiAlertCircle, FiBriefcase, FiMail, FiLock } from 'react-icons/fi';

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`;
  }
  return null;
};

const ProjectModal = ({ project, onClose }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

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

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!project) return null;

  // Compile picture items (primary image + gallery images)
  const pictureItems = [];
  if (project.image) {
    pictureItems.push(project.image);
  }
  if (project.gallery && project.gallery.length > 0) {
    project.gallery.forEach((img) => {
      if (img !== project.image) {
        pictureItems.push(img);
      }
    });
  }

  const [activePicIndex, setActivePicIndex] = useState(0);

  const handlePrevPic = () => {
    setActivePicIndex((prev) => (prev === 0 ? pictureItems.length - 1 : prev - 1));
  };

  const handleNextPic = () => {
    setActivePicIndex((prev) => (prev === pictureItems.length - 1 ? 0 : prev + 1));
  };



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

            {/* Picture Slider Section */}
            {pictureItems.length > 0 ? (
              <div className="project-modal-pictures-section">
                <p className="project-modal-media-label">Screenshots & Gallery</p>
                <div className="project-modal-pictures-wrapper">
                  <img 
                    className="project-modal-image" 
                    style={{ objectFit: project.imageFit === 'cover' ? 'cover' : 'contain' }}
                    src={pictureItems[activePicIndex]} 
                    alt={`${project.title} preview`} 
                  />

                  {/* Slider Controls */}
                  {pictureItems.length > 1 && (
                    <>
                      <button className="media-slider-arrow prev" onClick={handlePrevPic} aria-label="Previous image">
                        <FiChevronLeft size={24} />
                      </button>
                      <button className="media-slider-arrow next" onClick={handleNextPic} aria-label="Next image">
                        <FiChevronRight size={24} />
                      </button>

                      <div className="media-slider-dots">
                        {pictureItems.map((_, idx) => (
                          <button
                            key={idx}
                            className={`slider-dot ${idx === activePicIndex ? 'active' : ''}`}
                            onClick={() => setActivePicIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                          ></button>
                        ))}
                      </div>
                    </>
                  )}
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
