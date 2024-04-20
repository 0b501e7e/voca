import React, { useState } from "react";
import { ethers } from "ethers";
import styles from "./TransactionComponent.module.css";

interface TransactionComponentProps {
  publicKey: { x: string; y: string };
  privateKey: string;
}

// Simulated function for generating a signature
const generateSignature = (privateKey, txData) => {
//   generate signature using eddsa and circomlib
}

const TransactionComponent: React.FC<TransactionComponentProps> = ({
  publicKey,
  privateKey,
}) => {
  const [recipientPublicKey, setRecipientPublicKey] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [transactionError, setTransactionError] = useState<string>("");

  const handleTransaction = async () => {
    if (!recipientPublicKey || !amount) {
      setTransactionError("Recipient public key and amount are required.");
      return;
    }

    const midPoint = recipientPublicKey.length / 2;
    const toX = recipientPublicKey.substring(0, midPoint);
    const toY = recipientPublicKey.substring(midPoint);

    const txData = {
      from: {
        x: publicKey.x,
        y: publicKey.y,
      },
      to: {
        x: toX,
        y: toY,
      },
      fromIndex: 1, // Assuming `fromIndex` is a positive integer
      toIndex: 1,
      nonce: 0,
      amount: ethers.utils.parseEther(amount).toString(),
      tokenType: 1,
    };

    const signature = generateSignature(privateKey, txData);
    if (!signature) {
      setTransactionError("Failed to generate a valid signature.");
      return;
    }

    const transaction = {
      ...txData,
      signature: signature, // Ensure this is a string
    };

    console.log("Sending transaction:", JSON.stringify(transaction, null, 2));

    try {
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
      setTransactionError(`Transaction failed: ${error.message}`);
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
