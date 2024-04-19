"use client";

import React from "react";
import styles from "./Page.module.css";
import Image from "next/image"; // Import the Image component
import { Fade } from "react-awesome-reveal"; // Import the animation component
import img1 from "../../public/off-chain.png";
import img2 from "../../public/gaurd.png";
import img3 from "../../public/signup.png";

const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Header content */}
      <header className={styles.pageHeader}>
        <Fade direction="left" triggerOnce duration={1000} delay={100}>
          <div className={styles.infoDiv}>
            <h1 className={styles.infoTitle}>What is VOCA?</h1>
            <p className={styles.infoParagraph}>
              Welcome to our project, where we explore the potential of
              off-chain transactions through zk-rollups—technology that
              facilitates faster, more efficient, and secure transactions by
              processing them outside the main Ethereum blockchain.
            </p>
          </div>
        </Fade>

        <Fade direction="right" triggerOnce duration={1000} delay={250}>
          <div className={styles.imageDiv}>
            <Image
              src={img1}
              alt="Off-chain transactions illustration"
              width={350}
              height={350}
            />
          </div>
        </Fade>
      </header>

      <main>
        <div className={styles.infoSection}>
          <Fade direction="left" triggerOnce duration={1000} delay={250}>
            <div className={styles.imageDiv}>
              <Image
                src={img2}
                alt="Secure transactions with zk-SNARKs"
                width={400}
                height={400}
              />
            </div>
          </Fade>

          <Fade direction="right" triggerOnce duration={1000} delay={100}>
            <div className={styles.infoDiv}>
              <h1 className={styles.infoTitle}>
                A ZK Rollup Focused on Secure, and Scalable Off-Chain
                Transactions
              </h1>
              <p className={styles.infoParagraph}>
                By intelligently grouping transactions off-chain, zk-rollup
                solutions enhance processing speeds and reduces costs. Utilising
                zero-knowledge proofs, particularly zk-SNARKs (Zero-Knowledge
                Succinct Non-Interactive Argument of Knowledge), we ensure
                transactions are validated and secure while maintaining complete
                privacy.
              </p>
            </div>
          </Fade>
        </div>

        <div className={styles.infoSection}>
          <Fade direction="left" triggerOnce duration={1000} delay={250}>
            <div className={styles.infoDiv}>
              <h1 className={styles.infoTitle}>Get Started Now</h1>
              <p className={styles.infoParagraph}>
                Dive into transactions with VOCA, simplifying the process for
                ERC20 and Ether transfers, accessible with just a few clicks.
                Join us on our journey and experience advanced transaction
                processing technology.
              </p>
            </div>
          </Fade>
          <Fade direction="right" triggerOnce duration={1000} delay={100}>
            <div className={styles.imageDiv}>
              <Image
                src={img3}
                alt="Getting started with VOCA"
                width={350}
                height={350}
              />
            </div>
          </Fade>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
