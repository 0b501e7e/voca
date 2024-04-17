"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import styles from "./Page.module.css";
import { eddsa } from "circomlibjs";
import { useWallet } from "../../context/web3modal";

const DashboardPage = () => {
  const { ethAddress, provider } = useWallet(); // Access the provider from context
  // Log provider and ethAddress
  console.log("Provider: ", provider ? 'Connected' : 'Not connected');
  console.log("Ethereum Address: ", ethAddress);
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [error, setError] = useState(null);

  // Placeholder values
  // const contractAddress = '0xrollupAddress';
  // const contractABI = [];  ABI here

  // useEffect(() => {
  //   if (provider && ethAddress && contractAddress && contractABI.length > 0) {
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(contractAddress, contractABI, signer);
  //     setContract(contract);
  //   }
  // }, [provider, ethAddress, contractAddress, contractABI]);

  function generateKeys() {
    if (!ethAddress) {
      setError("Please connect your Ethereum wallet first.");
      return;
    }
    const seed = ethAddress; // Use Ethereum address as seed
    const prvKey = Buffer.from(seed.slice(2), "hex"); // Convert hex to Buffer
    setPrivateKey(prvKey.toString("hex"));

    // Generate public key using the private key
    const pubKey = eddsa.prv2pub(prvKey);
    const pubKeyHex = pubKey.map((coord) => coord.toString(16)).join("");
    setPublicKey(pubKeyHex);
  }

  const handleDeposit = async (e) => {
    e.preventDefault();
    let errorMessage = "Deposit Request is missing parameters: ";

    if (!provider) {
      errorMessage += "Provider is not ready. ";
    }
    if (!privateKey) {
      errorMessage += "Private key is missing. ";
    }
    if (!publicKey) {
      errorMessage += "Public key is missing. ";
    }
    if (!depositAmount) {
      errorMessage += "Deposit amount is missing. ";
    }

    if (errorMessage) {
      setError(errorMessage.trim());
      return;
    }

    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const depositTx = await contract.deposit(
        [publicKey, publicKey], // This needs to match contract expectations
        depositAmount,
        tokenType,
        { value: ethers.utils.parseEther(depositAmount.toString()) }
      );
      await depositTx.wait();
      alert("Deposit successful!");
      setDepositAmount("");
    } catch (err) {
      setError("Deposit failed: " + err.message);
      console.error("Deposit error:", err);
    }
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
