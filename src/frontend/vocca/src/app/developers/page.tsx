import Image from "next/image";
import React from "react";
import styles from "./Page.module.css";

const DevelopersPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>About Us (The Developers)</h1>
        <p className={styles.infoParagraph}>
          Meet the two creative minds, friends since their first year, sharing
          an interest in cryptocurrency, innovative technology and great craic
          !.
        </p>
      </header>
      <main>
        {/* Zak Section */}
        <section className={styles.developerSection}>
          <Image
            src="/zakImage.png"
            alt="Zak Smith"
            width={150}
            height={150}
            className={styles.developerImage}
          />
          <div className={styles.developerInfo}>
            <h2 className={styles.developerName}>Zak Smith</h2>
            <p className={styles.developerRole}>Frontend Developer</p>
            <p className={styles.developerBio}>
              Specializing in the frontend development, utilized Next.js 14,
              wagmi, and ethers for creating a seamless interface and
              communication layer with the blockchain backend.
            </p>
            <span>zak.smith2@mail.dcu.ie</span>
          </div>
        </section>

        {/* Senan Warnock Section */}
        <section className={styles.developerSection}>
          <Image
            src="/zakImage.png"
            alt="Senan Warnock"
            width={150}
            height={150}
            className={styles.developerImage}
          />
          <div className={styles.developerInfo}>
            <h2 className={styles.developerName}>Senan Warnock</h2>
            <p className={styles.developerRole}>Backend Developer</p>
            <p className={styles.developerBio}>
              developed the backend systems, specializing in zk-rollups and
              smart contracts to enhance transaction efficiency and security.
              wrote circuits for the zk-rollup process has been crucial in
              achieving the project's goals.
            </p>
            <span>senan.warnock2@mail.dcu.ie</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DevelopersPage;
