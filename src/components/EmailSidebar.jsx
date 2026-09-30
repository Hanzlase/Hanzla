import React from 'react';

const EmailSidebar = ({ isLoaded }) => {
  return (
    <div className={`sidebar email-sidebar ${isLoaded ? 'visible' : ''}`}>
      <div className="email-link-wrapper">
        <a href="mailto:hanzlasabir658@gmail.com">hanzlasabir658@gmail.com</a>
      </div>
    </div>
  );
};

export default EmailSidebar;
