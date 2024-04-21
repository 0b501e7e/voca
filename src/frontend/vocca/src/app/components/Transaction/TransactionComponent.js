import React, { useState } from "react";
import { ethers } from "ethers";
import styles from "./TransactionComponent.module.css";

// Dynamically load circomlib to bypass TypeScript type checks
const circomlib = require("circomlibjs");
const eddsa = circomlib.eddsa;
const poseidon = circomlib.poseidon;

// Function to generate a cryptographic signature for a transaction
const generateSignature = (privateKey, txData) => {
  try {
    // Prepare data for hashing by converting all fields to BigInt
    const poseidonInput = [
      BigInt(txData.from.x),
      BigInt(txData.from.y),
      BigInt(txData.to.x),
      BigInt(txData.to.y),
      BigInt(txData.nonce),
      BigInt(txData.amount),
      BigInt(txData.tokenType),
    ];

    // Generate a hash of the transaction data
    const poseidonHash = poseidon(poseidonInput);
    // Convert the private key into a buffer for signing
    const privateKeyBuffer = Buffer.from(privateKey.slice(2), "hex");
    // Sign the hash using the private key
    const signature = eddsa.signMiMC(privateKeyBuffer, poseidonHash);

    return {
      R8x: signature.R8[0].toString(),
      R8y: signature.R8[1].toString(),
      S: signature.S.toString(),
    };
  } catch (error) {
    console.error("Signature generation failed:", error);
    return null;
  }
};

// Main transaction component handling transaction processes
const TransactionComponent = ({ publicKey, privateKey }) => {
  console.log("----Beginning Transaction----");
  console.log("Received publicKey:", publicKey);
  console.log("Received privateKey:", privateKey);

  // State for storing recipient's public key and the amount to send
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionError, setTransactionError] = useState("");

  // Handler for sending the transaction
  const handleTransaction = async () => {
    if (!recipientPublicKey || !amount) {
      setTransactionError("Recipient public key and amount are required.");
      return;
    }

    // Calculate midpoint to split recipient's public key into x and y parts
    const midPoint = recipientPublicKey.length / 2;
    const toX = recipientPublicKey.substring(0, midPoint);
    const toY = recipientPublicKey.substring(midPoint);

    // Prepare the transaction data
    const txData = {
      from: {
        x: publicKey.x,
        y: publicKey.y,
      },
      to: {
        x: toX,
        y: toY,
      },
      fromIndex: 1,
      toIndex: 1,
      nonce: 0,
      amount: ethers.utils.parseEther(amount).toString(),
      tokenType: 1,
    };

    // Generate a signature for the transaction
    const signature = generateSignature(privateKey, txData);
    if (!signature) {
      setTransactionError("Failed to generate a valid signature.");
      return;
    }

    // Structure the complete transaction with the signature
    const transaction = {
      ...txData,
      signature: {
        R8x: signature.R8x,
        R8y: signature.R8y,
        S: signature.S,
      },
    };

    console.log("data being sent", transaction);

    try {
      // Submit the transaction to the backend
      const response = await fetch(
        "http://localhost:3000/transactions/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transaction),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status} Response: ${JSON.stringify(
            errorResponse
          )}`
        );
      }

      const responseBody = await response.json();
      console.log("Transaction response:", responseBody);
      alert("Transaction successful!");
      setRecipientPublicKey("");
      setAmount("");
    } catch (error) {
      console.error("Transaction error:", error);
      setTransactionError(
        `Transaction failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  
  return (
    <div className={styles.transactionContent}>
      <h2 className={styles.transactionTitle}>Send Transaction</h2>
      <input
        type="text"
        placeholder="Recipient Public Key"
        value={recipientPublicKey}
        onChange={(e) => setRecipientPublicKey(e.target.value)}
        className={styles.transactionInput}
      />
      <input
        type="text"
        placeholder="Amount to Send"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={styles.transactionInput}
      />
      <button className={styles.transactionButton} onClick={handleTransaction}>
        Send
      </button>
      {transactionError && (
        <div className={styles.errorMessage}>{transactionError}</div>
      )}
    </div>
  );
};

export default TransactionComponent;
