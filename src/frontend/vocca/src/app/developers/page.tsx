import React from "react";
import styles from "./Page.module.css";

const DevelopersPage = () => {
  return (
    <div className={styles.pageContainer}>
      <main>
      <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Meet the Developers</h1>
        <p className={styles.infoParagraph}>
          Get to know the creative minds behind the project. Learning our expertise and contributions.
        </p>
      </header>
      <main>
        {/* Zak Smith Section */}
        <section className={styles.developerSection}>
          {/* <img src={zakImage} alt="Zak Smith" className={styles.developerImage} /> */}
          <div>
            <h2 className={styles.developerName}>Zak Smith</h2>
            <p className={styles.developerRole}>Frontend Developer</p>
            <p className={styles.developerBio}>
              Specializing in frontend development, Zak Smith has utilized Next.js 14, wagmi, and ethers for creating a seamless interface and communication layer with the blockchain backend. His focus on user experience and interactive design has been pivotal in the project's success.
            </p>
            <div className={styles.developerLinks}>
              <a href="https://github.com/zaksmith" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </section>

        {/* Senan Warnock Section */}
        <section className={styles.developerSection}>
          {/* <img src={senanImage} alt="Senan Warnock" className={styles.developerImage} /> */}
          <div>
            <h2 className={styles.developerName}>Senan Warnock</h2>
            <p className={styles.developerRole}>Backend Developer</p>
            <p className={styles.developerBio}>
              As the backbone of the platform, Senan Warnock has engineered the backend, focusing on zk-rollups and smart contracts to enhance transaction efficiency and security. Working closely with Zak, Senan also contributed significantly to the development of the operator node.
            </p>
            <div className={styles.developerLinks}>
              <a href="https://github.com/senanwarnock" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </section>
      </main>
    </div>
      </main>
    </div>
  );
};

export default DevelopersPage;
