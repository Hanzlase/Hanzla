import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiMail, FiCopy, FiCheck, FiSend } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const ContactModal = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  
  const modalRef = useRef(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setStatus('idle');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 300); // Wait for transition animation to complete
  };

  // Lock scroll on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hanzlasabir658@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if configuration is present
    if (!serviceID || !templateID || !publicKey) {
      console.warn(
        "EmailJS environment variables are not set. " +
        "Please create a .env file in the portfolio directory and set VITE_EMAILJS_SERVICE_ID, " +
        "VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.\n" +
        "Falling back to simulated success for demonstration."
      );
      
      // Simulate success state for demonstration
      setTimeout(() => {
        setStatus('success');
      }, 1200);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(serviceID, templateID, templateParams, { publicKey })
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setStatus('success');
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
        setStatus('error');
      });
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
      <div className={`project-modal-container contact-modal-container ${isClosing ? 'closing' : ''}`} ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        {/* Close Button */}
        <button className="project-modal-close-btn" onClick={handleClose} aria-label="Close contact form">
          <FiX size={24} />
        </button>

        <div className="contact-modal-content">
          <div className="contact-modal-header">
            <p className="contact-modal-overline">04. Get In Touch</p>
            <h3 id="contact-modal-title" className="contact-modal-title">Say Hello</h3>
            <p className="contact-modal-subtitle">
              Send a direct message through the form below or copy my email address to your clipboard.
            </p>

            {/* Email Widget */}
            <div className="contact-modal-email-widget">
              <FiMail className="email-widget-icon" size={18} />
              <span className="email-widget-address">hanzlasabir658@gmail.com</span>
              <button 
                className={`email-widget-copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopyEmail}
                aria-label="Copy email to clipboard"
                title="Copy Email Address"
              >
                {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {status === 'success' ? (
            <div className="contact-modal-success-screen">
              <div className="success-icon-wrapper">
                <FiCheck size={48} />
              </div>
              <h4>Message Sent!</h4>
              <p>Thank you for reaching out. I'll get back to you as soon as possible!</p>
              <button className="ghost-button close-success-btn" onClick={handleClose}>
                Close Window
              </button>
            </div>
          ) : (
            <form className="contact-modal-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="form-name">Name</label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-email">Email</label>
                  <input
                    type="email"
                    id="form-email"
                    name="email"
                    required
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="form-subject">Subject</label>
                <input
                  type="text"
                  id="form-subject"
                  name="subject"
                  required
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-message">Message</label>
                <textarea
                  id="form-message"
                  name="message"
                  required
                  placeholder="Your Message..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="ghost-button form-submit-btn"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <FiSend size={14} style={{ marginRight: '8px' }} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="form-error-msg" style={{ color: '#d9534f', fontSize: 'var(--fz-xs)', textAlign: 'center', marginTop: '10px', fontFamily: 'var(--font-mono)' }}>
                  Failed to send message. Please try again or copy my email address.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;
