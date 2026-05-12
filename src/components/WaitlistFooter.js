'use client';

import { useState } from 'react';
import styles from './WaitlistFooter.module.css';

export default function WaitlistFooter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call for Netlify/Formspree
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className={styles.footer} id="waitlist">
      <div className={styles.grainOverlay} />
      
      <div className={styles.container}>
        
        {/* Top: Waitlist Form */}
        <div className={styles.waitlistSection}>
          <h2 className={`${styles.heading} font-display`}>The window is opening.</h2>
          <p className={`${styles.subheading} font-body`}>
            Drop 01 is strictly limited. Join the waitlist to receive the access code 12 hours before the public window opens.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <input 
                type="email" 
                className={`${styles.input} font-body`} 
                placeholder="ENTER EMAIL ADDRESS" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                required
              />
              <button 
                type="submit" 
                className={`${styles.submitBtn} font-body`}
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? 'JOINING...' : status === 'success' ? 'ADDED' : 'JOIN WAITLIST'}
              </button>
            </div>
            {status === 'success' && (
              <p className={styles.successMsg}>You are on the list. We will be in touch.</p>
            )}
          </form>
        </div>

        {/* Bottom: Links & Info */}
        <div className={styles.bottomSection}>
          
          <div className={styles.brandCol}>
            <div className={`${styles.logo} font-display`}>ORYN</div>
            <p className={styles.brandTagline}>One fruit. One season. One drop.</p>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>EXPLORE</h4>
            <ul className={styles.linksList}>
              <li><a href="#showcase">The Drops</a></li>
              <li><a href="#subscription">Subscription</a></li>
              <li><a href="#manifesto">Manifesto</a></li>
              <li><a href="#process">Process</a></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>LEGAL</h4>
            <ul className={styles.linksList}>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>

          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>CONTACT</h4>
            <p className={styles.contactText}>hello@orynjuice.com</p>
            <p className={styles.contactText}>Bengaluru, India</p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink}>IG</a>
              <a href="#" className={styles.socialLink}>X</a>
            </div>
          </div>

        </div>

        <div className={styles.copyright}>
          © {new Date().getFullYear()} ORYN. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
