import React from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const SocialSidebar = ({ isLoaded }) => {
  return (
    <div className={`sidebar social-sidebar ${isLoaded ? 'visible' : ''}`}>
      <ul className="sidebar-list">
        <li>
          <a
            href="https://github.com/Hanzlase"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/hanzlasheikh/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={20} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialSidebar;
