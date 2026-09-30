import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ContactModal from './ContactModal';

const Contact = () => {
  const [ref, isRevealed] = useScrollReveal();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section
      ref={ref}
      id="contact"
      className={`contact-section scroll-reveal ${isRevealed ? 'visible' : ''}`}
      style={{ '--section-num': '"04."' }}
    >
      <p className="contact-overline">What's Next?</p>
      <h2 className="contact-title">Say Hello</h2>
      <p className="contact-desc">
        I'm currently open to new opportunities. Whether you have a question or just want to say
        hi — my inbox is always open. I'll do my best to get back to you!
      </p>
      <button 
        className="ghost-button contact-btn"
        onClick={() => setIsContactModalOpen(true)}
      >
        Say Hello
      </button>

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
};

export default Contact;
