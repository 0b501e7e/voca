"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useWeb3 } from "../../../context/web3modal";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { connect, disconnect, account } = useWeb3();

  // for display purposes only
  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

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
        onClick={() => setShowNav(!showNav)} // Correctly toggles the showNav state
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
          <Link href="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
        </li>
        {/* Hover dropdown logic */}
        <li className={`${styles.navItem} ${styles.dropdown}`}>
          <div className={styles.navLinkWithDropdown}>
            <span className={styles.navLink}>Project Info</span>
            <span className={styles.dropdownArrow}>▼</span>
          </div>
          <div className={styles.dropdownContent}>
            <Link href="/developers">Developers</Link>
            <Link href="/documentation">Documentation</Link>
          </div>
        </li>
        {account ? (
          <div className={styles.accountInfo}>
            <button className={styles.navButton} onClick={disconnect}>
              Disconnect
            </button>
            <span className={styles.accountAddress}>
              {shortenAddress(account)}
            </span>
          </div>
        ) : (
          <button className={styles.navButton} onClick={connect}>
            Connect Wallet
          </button>
        )}
        {/* <w3m-button /> */}
      </ul>
    </nav>
  );
};

export default Navbar;
