"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    console.log("showNav state is now:", showNav);
  }, [showNav]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLogo}>
        <span>VOCA</span>
        <Image src="/logo-removebg.png" alt="Logo" width={60} height={60} />
      </div>

      <div
        className={`${styles.navToggle} ${showNav ? styles.change : ""}`}
        onClick={() => setShowNav((prevShowNav) => !prevShowNav)}
      >
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      <ul className={`${styles.navLinks} ${showNav ? styles.showNav : ""}`}>
        {/* Navigation Items */}
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/transactions" className={styles.navLink}>
            Transactions
          </Link>
        </li>
        {/* dropdown */}
        <li className={`${styles.navItem} ${styles.dropdown}`}>
          <div className={styles.navLinkWithDropdown}>
            <a className={styles.navLink}>Team</a> {/* Dropdown Trigger */}
            <span className={styles.dropdownArrow}>▼</span>
          </div>
          <div className={styles.dropdownContent}>
            <Link href="/documentation">Documentation</Link>{" "}
          </div>
        </li>
        <w3m-button />
      </ul>
    </nav>
  );
};

export default Navbar;
