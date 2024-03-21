import React from "react";
import styles from "./Page.module.css";
import Image from "next/image"; // Import the Image component
import img1 from "../../public/off-chain.png";
import img2 from "../../public/gaurd.png";
import img3 from "../../public/signup.png";
import { info } from "console";

const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      {/* header content */}
      <header className={styles.pageHeader}>
        <div className={styles.infoDiv}>
          <h1 className={styles.infoTitle}>What is VOCA ?</h1>
          <p className={styles.infoParagraph}>
            Welcome to our project, where we'&apos;re exploring off-chain
            transactions. Our approach harnesses the power of zk rollups to
            bring you faster, more efficient, and secure transactions
          </p>
        </div>
        <div className={styles.imageDiv}>
          <Image src={img1} alt="Logo" width={350} height={350} />{" "}
        </div>
      </header>

      <main>
        <div className={styles.infoSection}>
          <div className={styles.imageDiv}>
            <Image src={img2} alt="Logo" width={400} height={400} />{" "}
          </div>
          <div className={styles.infoDiv}>
            <h1 className={styles.infoTitle}>
              A ZK rollup Focused on Secure, and Scalable Off-Chain Transactions
            </h1>
            <p className={styles.infoParagraph}>
              We streamline your transactions by intelligently grouping them
              off-chain, a strategy that boosts processing. Through the advanced
              security of zero-knowledge proofs, notably zk-SNARKs, we ensure
              your transactions are validated and secure. This innovative
              approach allows us to verify transactions with precision, all
              while fully safeguarding your privacy.
            </p>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoDiv}>
            <h1 className={styles.infoTitle}>Get Started Now</h1>
            <p className={styles.infoParagraph}>
              Dive into transactions with VOCA, simplfying the process for
              ERC20/ether transfers, making it accessible with just a few
              clicks. Join us on our journey and experience our transaction
              processing technology. Click "&quot;Connect Your Wallet"&quot; and start with
              VOCA today.
            </p>
            <button className={styles.infoButton}>Connect Your Wallet</button>
          </div>
          <div className={styles.imageDiv}>
            <Image src={img3} alt="Logo" width={350} height={350} />{" "}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
