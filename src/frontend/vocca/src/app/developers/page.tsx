import Image from "next/image";
import React from "react";
import styles from "./Page.module.css";

const DevelopersPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>About Us (The Developers)</h1>
        <p className={styles.infoParagraph}>
          Meet Zak and Senan, two friends from Dublin City University with a
          passion for blockchain technology and software development, bonded
          over their curiosity and ambition.
        </p>
      </header>
      <main>
        {/* Zak Section */}
        <section className={styles.developerSection}>
          <Image
            src="/zakImage.png"
            alt="Zak Smith"
            width={200}
            height={200}
            className={styles.developerImage}
          />
          <div className={styles.developerInfo}>
            <h2 className={styles.developerName}>Zak Smith</h2>
            <p className={styles.developerBio}>
              Zak specialized in frontend development, leveraging Next.js and
              Ethers.js to enhance user interface interactions integrating them
              with our zk rollup functionalities. His also extended to the
              development and management of the operator node, a critical
              component for processing and verifying transactions on our
              platform.
            </p>
            <a
              href="mailto:zak.smith2@mail.dcu.ie"
              className={styles.highlightedEmail}
            >
              zak.smith2@mail.dcu.ie
            </a>
          </div>
        </section>

        {/* Senan Warnock Section */}
        <section className={styles.developerSection}>
          <Image
            src="/senanImage.jpg"
            alt="Senan Warnock"
            width={200}
            height={200}
            className={styles.developerImage}
          />
          <div className={styles.developerInfo}>
            <h2 className={styles.developerName}>Senan Warnock</h2>
            <p className={styles.developerBio}>
              Senan Warnock focused on backend development, with a strong
              emphasis on creating secure smart contracts and optimizing
              zk-rollup mechanismsm which involved secure cryptographic methods
              aimed at advancing Ethereum blockchain efficiency. This ensures
              our platform not only adheres to but surpasses security standards,
              offering fast and reliable transaction processing.
            </p>
            <a
              href="mailto:senan.warnock2@mail.dcu.ie"
              className={styles.highlightedEmail}
            >
              senan.warnock2@mail.dcu.ie
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DevelopersPage;
