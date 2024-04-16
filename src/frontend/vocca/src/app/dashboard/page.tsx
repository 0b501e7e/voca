"use client";

import React, { useState } from "react";
import styles from "./Page.module.css";
import Image from "next/image";
import { eddsa } from "circomlibjs"; // Import the necessary cryptography functions

const DashboardPage = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [error, setError] = useState(null);

  function generateKeys() {
    // Generate private key from a random index
    const index = Date.now(); // Using current timestamp as a simple seed
    const prvKey = Buffer.from(index.toString().padStart(64, "0"), "hex");
    setPrivateKey(prvKey.toString("hex"));

    // Generate public key using the private key
    const pubKey = eddsa.prv2pub(prvKey);
    setPublicKey(pubKey.toString("hex")); // Convert public key to string and set it
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
            <div>
              <h2 className={styles.walletTitle}>Generate Your Wallet</h2>
              <button className={styles.walletButton} onClick={generateKeys}>
                Generate Wallet
              </button>
              <div className={styles.keyDisplay}>
                <div className={styles.keyDisplay}>
                  <div className={styles.keysContainer}>
                    {privateKey || publicKey ? (
                      <>
                        <div>
                          <span className={styles.key}>Private Key:</span>{" "}
                          {privateKey && (
                            <span className={styles.privateKeyText}>
                              {privateKey}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className={styles.key}>Public Key:</span>{" "}
                          {publicKey && (
                            <span className={styles.publicKeyText}>
                              {publicKey}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <span className={styles.placeholder}>
                        Click above to generate both a private and public key
                      </span>
                    )}
                  </div>
                </div>
              </div>
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
