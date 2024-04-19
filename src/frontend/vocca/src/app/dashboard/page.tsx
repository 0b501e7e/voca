"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import styles from "./Page.module.css";
import { useWeb3 } from "../../context/web3modal";
import RollupContract from "../../contracts/Rollup.json";
import { Fade } from "react-awesome-reveal";
import CopyButton from '../components/CopyButton/CopyButton';


// Directly require circomlib to bypass TypeScript type checks
const circomlib = require("circomlibjs");

const DashboardPage = () => {
  const { provider, account } = useWeb3();
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [error, setError] = useState("");
  const [contract, setContract] = useState();

  // Replace with actual contract address and ABI
  const contractAddress = "";
  const contractABI = RollupContract.abi;
  // console.log(contractABI);

  useEffect(() => {
    if (provider && account && contractAddress && contractABI.length > 0) {
      const signer = provider.getSigner();
      const newContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(newContract);
      console.log("Contract instantiated:", newContract);
    }
  }, [provider, account, contractAddress, contractABI]);

  // Reset keys when the wallet disconnects
  useEffect(() => {
    if (!account) {
      // If there's no account, it means the wallet is disconnected
      setPrivateKey("");
      setPublicKey("");
      console.log("Wallet disconnected, keys reset.");
    }
  }, [account]); // Dependency array includes account to react on its changes

  function generateKeys() {
    if (!account) {
      setError("Please connect your Ethereum wallet first.");
      return;
    }
    const seed = account as string; // Use Ethereum address as seed
    if (typeof seed !== "string" || seed.length < 2) {
      setError("Invalid account detected.");
      return;
    }
    const prvKey = Buffer.from(seed.slice(2), "hex"); // Convert hex to Buffer
    setPrivateKey(prvKey.toString("hex"));

    // Generate public key using the private key
    const pubKey = circomlib.eddsa.prv2pub(prvKey);
    const pubKeyHex = pubKey
      .map((coord: number) => coord.toString(16))
      .join("");
    setPublicKey(pubKeyHex);
  }

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!provider || !publicKey || !depositAmount || !tokenType || !contract) {
      setError("Missing data for deposit or contract not loaded.");
      return;
    }

    try {
      const transactionResponse = await contract.deposit(
        [publicKey, publicKey],
        ethers.utils.parseUnits(depositAmount, "ether"), // Assuming 'ether' as the unit
        tokenType,
        {
          value: ethers.utils.parseUnits(depositAmount, "ether"), // Sending value along with the transaction
        }
      );
      await transactionResponse.wait(); // Wait for the transaction to be mined
      alert("Deposit successful!");
    } catch (error) {
      setError(`Deposit failed: ${error.message}`);
      console.error("Deposit error:", error);
    }
  };

  const handleWithdraw = async () => {
    // Placeholder for withdraw functionality
    alert("Withdrawal function not implemented yet.");
  };

  const handleSendTransaction = async () => {
    if (!provider || !recipientAddress || !transferAmount) {
      setError("Missing data for transaction.");
      return;
    }
  };

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
            <div className={styles.keyDisplay}>
              <p className={`${styles.privateKeyLabel}`} title="Private Key">
                Private Key: <span className={styles.key}>{privateKey}</span>
              </p>
              <CopyButton textToCopy={privateKey} />
              <p className={`${styles.publicKeyLabel}`} title="Public Key">
                Public Key: <span className={styles.key}>{publicKey}</span>
              </p>
              <CopyButton textToCopy={publicKey}/>
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
              placeholder="Amount to Deposit/Withdraw"
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
                Select Token
              </option>
              <option value="1">Ethereum</option>
              {/* Add other tokens as needed */}
            </select>
            <button className={styles.depositButton} onClick={handleDeposit}>
              Deposit
            </button>
            {account && (
              <button
                className={styles.withdrawButton}
                onClick={handleWithdraw}
              >
                Withdraw
              </button>
            )}
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
        <div className={styles.transactionSection}>
          <div className={styles.transactionContent}>
            <h2 className={styles.transactionTitle}>Send Transaction</h2>
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className={styles.transactionInput}
            />
            <input
              type="text"
              placeholder="Amount to Send"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className={styles.transactionInput}
            />
            <select
              className={styles.tokenSelect}
              onChange={(e) => setTokenType(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Token
              </option>
              <option value="1">Ethereum</option>
              {/* Add other tokens as needed */}
            </select>
            <button
              className={styles.transactionButton}
              onClick={handleSendTransaction}
            >
              Send
            </button>
          </div>

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
