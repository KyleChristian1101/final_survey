"use client"
import React from 'react';
import styles from './ThankYouPage.module.css'; // Import styles

const ThankYouPage = () => {
  return (
    <div className={styles.thankYouContainer}>
      <div className={styles.card}>
        <div className={styles.redLine}></div> {/* Red line on top */}
        <h2>Thank you for taking the survey!</h2>
        <hr className={styles.titleLine} />
        <p>Your responses have been recorded.</p>
        <p>We appreciate your time and effort in helping us understand community environmental awareness and practices.</p>
      </div>
    </div>
  );
};

export default ThankYouPage;
