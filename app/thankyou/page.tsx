// ThankYouPage.tsx

"use client"
import React from 'react';
import { useRouter } from 'next/router';
import styles from './ThankYouPage.module.css'; // Import styles
import Link from 'next/link';

const ThankYouPage = () => {
  return (
    <div className={styles.thankYouContainer}>
      <div className={styles.card}>
        <h2>Thank you for taking the survey!</h2>
        <hr className={styles.titleLine} />
        <p>Your responses have been recorded.</p>
        <Link href="/survey">
          <button className={styles.buttonSubmit}>Take Another Survey</button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
