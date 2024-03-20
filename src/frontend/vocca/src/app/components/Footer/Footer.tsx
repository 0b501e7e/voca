// Footer.tsx
import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <ul className={styles.footerLinks}>
        <Link
          href="/https://gitlab.computing.dcu.ie/warnocs2/2024-ca400-warnocs2-smithz2/-/branches"
          className={styles.footerLink}
        >
          Gitlab{" "}
        </Link>
      </ul>
      <div className={styles.footerCredits}>
        © 2024 DCU Coursework | Zak Smith | Senan Warnock
      </div>
    </footer>
  );
};

export default Footer;
