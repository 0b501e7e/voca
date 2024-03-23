import Link from "next/link";
import React from "react";
import Image from "next/image"; // Import the Image component
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLogo}>
        <span>VOCA</span>
        <Image src="/logo-removebg.png"alt="Logo" width={60} height={60} />
      </div>

      <ul className={styles.navLinks}>
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
            <a className={styles.navLink}>Build</a> {/* Dropdown Trigger */}
            <span className={styles.dropdownArrow}>▼</span>
          </div>
          <div className={styles.dropdownContent}>
            <Link href="/documentation">Documentation</Link>{" "}
          </div>
        </li>
      </ul>
      <button className={styles.buttonRight}>Connect Wallet</button>
    </nav>
  );
};

export default Navbar;
