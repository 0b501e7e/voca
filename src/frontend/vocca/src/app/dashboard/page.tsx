"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import styles from "./Page.module.css";
import { useWeb3 } from "../../context/web3modal";
import RollupContract from "../../contracts/Rollup.json";
import { Fade } from "react-awesome-reveal";
import CopyButton from "../components/CopyButton/CopyButton";
import DepositComponent from "../components/Deposit/DepositComponent"; // component
import TransactionComponent from "../components/Transaction/TransactionComponent";

import crypto from "crypto";
import { initializeTestWallet, testWalletKeys } from "./WalletService";

// Directly require circomlib to bypass TypeScript type checks
const circomlib = require("circomlibjs");
import { providers } from "ethers";
const { JsonRpcProvider } = providers;

interface PublicKey {
  x: string;
  y: string;
}

const DashboardPage: React.FC = () => {
  const { account } = useWeb3();
  const [privateKey, setPrivateKey] = useState<string>("");
  const [publicKey, setPublicKey] = useState<PublicKey>({ x: "", y: "" });
  const [tokenType, setTokenType] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [contract, setContract] = useState<ethers.Contract>();

  // Static definitions for provider and contract address
  const provider = useMemo(
    () => new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"),
    []
  );
  const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const contractABI = useMemo(() => RollupContract.abi, []); // Only recalculates if RollupContract changes

  function handleGenerateTestWallet1() {
    initializeTestWallet(
      provider,
      testWalletKeys.firstPrivateKey,
      setPrivateKey,
      setPublicKey
    );
  }

  function handleGenerateTestWallet2() {
    initializeTestWallet(
      provider,
      testWalletKeys.secondPrivateKey,
      setPrivateKey,
      setPublicKey
    );
  }

  function generateKeys() {
    // Check if the Ethereum account is connected; if not, set an error message.
    if (!account) {
      setError("Please connect your Ethereum wallet first.");
      return; // Exit the function early if no account is connected.
    }

    // Use SHA-256 to hash the connected Ethereum account to generate a unique private key, that is reproducable
    const hashedKey = crypto.createHash("sha256").update(account).digest("hex");
    const prvKey = "0x" + hashedKey; // Prefix the result with '0x' to denote a hexadecimal number.
    setPrivateKey(prvKey); // Set the state with the generated private key.

    // Create a new Ethereum wallet instance using the generated private key.
    const wallet = new ethers.Wallet(prvKey);
    // Extract the public key from the wallet, removing the '0x04' prefix typically used to indicate an uncompressed public key.
    let fullPublicKey = wallet.publicKey.slice(2);

    // Calculate the length of each part of the public key to split it into 'x' and 'y' components, for the deposit parameter in the rollup contract
    const halfLength = (fullPublicKey.length - 2) / 2; // Subtract 2 to adjust for the missing '0x' in the length calculation.
    const x = `0x${fullPublicKey.substring(2, 2 + halfLength)}`; // Extract the 'x' part of the public key.
    const y = `0x${fullPublicKey.substring(2 + halfLength)}`; // Extract the 'y' part of the public key.

    // Set the state with the public key split into its 'x' and 'y' components.
    setPublicKey({ x, y });
    // Log the components of the public key to the console for verification.
    console.log("Public Key Parts:", { x, y });
  }

  useEffect(() => {
    if (
      !provider ||
      !contractAddress ||
      !contractABI.length ||
      !privateKey ||
      privateKey === ""
    ) {
      console.log("Missing or invalid inputs for contract setup.");
      return;
    }

    // Setup logic here
    try {
      const wallet = new ethers.Wallet(privateKey, provider);
      const newContract = new ethers.Contract(
        contractAddress,
        contractABI,
        wallet
      );
      setContract(newContract);
      console.log("Contract instantiated with custom signer:");
    } catch (err) {
      console.error("Error setting up the contract with custom signer:", err);
    }
  }, [provider, contractAddress, contractABI, privateKey]);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <Fade triggerOnce cascade>
          <h1 className={styles.pageTitle}>Dashboard</h1>
        </Fade>
        <Fade triggerOnce cascade delay={500}>
          <p className={styles.infoParagraph}>
            Manage your transactions and deposits through our zk-Rollup
            mechanism. This dashboard provides a real-time view of blockchain
            operations.
          </p>
        </Fade>
      </header>
      <main>
        <div className={styles.walletSection}>
          <div className={styles.walletContent}>
            <h2 className={styles.walletTitle}>Generate Your Wallet</h2>
            <button className={styles.walletButton} onClick={generateKeys}>
              Generate Wallet
            </button>
            <button
              className={styles.walletButton}
              onClick={handleGenerateTestWallet1}
            >
              Generate Test Wallet 1
            </button>
            <button
              className={styles.walletButton}
              onClick={handleGenerateTestWallet2}
            >
              Generate Test Wallet 2
            </button>

            <div className={styles.keyDisplay}>
              <p className={`${styles.privateKeyLabel}`} title="Private Key">
                Private Key: <span className={styles.key}>{privateKey}</span>
              </p>
              <CopyButton textToCopy={privateKey} />
              <p className={`${styles.publicKeyLabel}`} title="Public Key">
                Public Key:{" "}
                <span
                  className={styles.key}
                >{`${publicKey.x}, ${publicKey.y}`}</span>
              </p>
              <CopyButton textToCopy={`${publicKey.x}${publicKey.y}`} />
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
          {/* Use DepositComponent */}
          <DepositComponent
            contract={contract}
            account={account}
            publicKey={publicKey} // This should be an array [x, y]
          />

          <div className={styles.imageDiv}>
            <Image
              src="/deposit.png"
              alt="Deposit Illustration"
              width={350}
              height={350}
            />
          </div>
        </div>
        <div className={styles.transactionSection}>
          <TransactionComponent
            provider={provider}
            contract={contract}
            publicKey={publicKey}
            privateKey={privateKey}
          />

          <div className={styles.imageDiv}>
            <Image
              src="/transaction.png"
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
