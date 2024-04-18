import Image from "next/image";
import React from "react";
import styles from "./Page.module.css";

const DevelopersPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>About Us (The Developers)</h1>
        <p className={styles.infoParagraph}>
        Meet Zak and Senan, two friends from Dublin City University with a passion for blockchain technology and software development, bonded over their curiosity and ambition.
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
            Zak leads the frontend aspects of our project, using Next.js and Ethers to create the seamless user interfaces that integrate smoothly with our blockchain operations. His work ensures that users experience fluid and intuitive interactions with our platform.
            </p>
            <a href="mailto:zak.smith2@mail.dcu.ie" className={styles.highlightedEmail}>zak.smith2@mail.dcu.ie</a>
          </div>
        </section>

        {/* Senan Warnock Section */}
        <section className={styles.developerSection}>
          <Image
            src="/senanImage.png"
            alt="Senan Warnock"
            width={150}
            height={150}
            className={styles.developerImage}
          />
          <div className={styles.developerInfo}>
            <h2 className={styles.developerName}>Senan Warnock</h2>
            <p className={styles.developerRole}>Backend Developer</p>
            <p className={styles.developerBio}>
            Senan focuses on the backend, developing robust smart contracts and zk-rollup solutions. His expertise in cryptographic techniques and Ethereum blockchain management significantly enhances transaction security and efficiency.
            </p>
            <a href="mailto:senan.warnock2@mail.dcu.ie" className={styles.highlightedEmail}>senan.warnock2@mail.dcu.ie</a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DevelopersPage;
