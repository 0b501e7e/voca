"use client";

import React, { useState, useContext } from "react";
import styles from "./Page.module.css";
import Image from "next/image";
import { eddsa } from "circomlibjs"; // Import the necessary cryptography functions
import { useWallet } from "../../context";

const DashboardPage = () => {
  const { ethAddress } = useWallet(); // Access the Ethereum address from context
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [error, setError] = useState(null);

  function generateKeys() {
    if (!ethAddress) {
      setError("Please connect your Ethereum wallet first.");
      return;
    }
    // Generate private key based on the Ethereum wallet address
    const seed = ethAddress; // Use Ethereum address as seed
    const prvKey = Buffer.from(seed.slice(2), "hex"); // Convert hex to Buffer
    setPrivateKey(prvKey.toString("hex"));

    // Generate public key using the private key
    const pubKey = eddsa.prv2pub(prvKey);
    // Assuming pubKey is an array [x, y], where x and y are BigInt
    const pubKeyHex = pubKey.map((coord) => coord.toString(16)).join(""); // Convert each coordinate to hex and concatenate
    setPublicKey(pubKeyHex);
  }

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!privateKey || !publicKey) {
      setError("No keys available, please generate your wallet first.");
      return;
    }

    console.log(`Depositing ${depositAmount} with public key: ${publicKey}`);
    alert(`Deposit of ${depositAmount} was successful!`);
    setDepositAmount(""); // Reset deposit amount after successful operation
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.infoParagraph}>
          Manage your transactions and deposits through our zk-Rollup mechanism.
          This dashboard provides a real-time view of blockchain operations.
        </p>
      </header>
      <main>
        <div className={styles.walletSection}>
          <div className={styles.walletContent}>
            <h2 className={styles.walletTitle}>Generate Your Wallet</h2>
            <button className={styles.walletButton} onClick={generateKeys}>
              Generate Wallet
            </button>
            <div className={styles.keyDisplay}>
              <p className={`${styles.privateKeyLabel}`} title="Private Key">
                Private Key: <span className={styles.key}>{privateKey}</span>
              </p>
              <p className={`${styles.publicKeyLabel}`} title="Public Key">
                Public Key: <span className={styles.key}>{publicKey}</span>
              </p>
            </div>
          </div>
          <div className={styles.walletExplanation}>
            <h3 className={styles.walletExplanationTitle}>
              Why Generate a Wallet
            </h3>
            <p>
              You need to generate a wallet on our zk-Rollup apart from your
              Ethereum wallet to ensure that your transactions are processed on
              the L2 network. This provides enhanced security and privacy.
            </p>
          </div>
        </div>

        <div className={styles.depositSection}>
          <div className={styles.depositContent}>
            <h2 className={styles.depositTitle}>Make a Deposit</h2>
            <input
              type="text"
              placeholder="Amount to Deposit"
              value={depositAmount}
              className={styles.depositInput}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <select
              className={styles.tokenSelect}
              onChange={(e) => setTokenType(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Token Type
              </option>
              <option value="1">Ethereum</option>
              {/* Add other tokens as needed */}
            </select>
            <button className={styles.depositButton} onClick={handleDeposit}>
              Deposit
            </button>
          </div>
          <div className={styles.imageDiv}>
            <Image
              src="/deposit.png"
              alt="Deposit Illustration"
              width={350}
              height={350}
            />
          </div>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
      </main>
    </div>
  );
};

export default DashboardPage;
