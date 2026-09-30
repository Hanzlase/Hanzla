import React from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-socials">
        <a href="https://github.com/Hanzlase" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FiGithub size={20} />
        </a>
        <a href="https://www.linkedin.com/in/hanzlasheikh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FiLinkedin size={20} />
        </a>
      </div>
      <div className="footer-credit">
        <p className="credit-author">Designed & Built by Muhammad Hanzla</p>
      </div>
    </footer>
  );
};

export default Footer;
