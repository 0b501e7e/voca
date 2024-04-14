"use client";

import React, { useEffect, useState } from "react";
import styles from "./Page.module.css";

// TypeScript interface for the transaction data
interface Transaction {
  id: number;
  batchId: string;
  timestamp: string;
  zkHash: string;
  status: string;
  finalityStatus: string;
}

const TransactionsPage = () => {
  // Use the Transaction interface to type the state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // State for storing potential error messages
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (error: any) { // Catching error as any to access its message
        console.error("Error fetching transactions:", error);
        setError(error.message || "An error occurred while fetching transactions.");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Transactions</h1>
        <div className={styles.transactionInfo}>
          <p className={styles.infoParagraph}>
            This table provides a detailed view of all transactions processed
            through our zk-Rollup mechanism. Here, you can track each
            transaction's batch ID, timestamp, zk-SNARK hash, current status,
            and finality status. The information is updated in real-time to
            reflect the most current state of the blockchain.
          </p>
        </div>
      </header>
      <main>
        {/* Display error message if fetching transactions fails */}
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <table className={styles.transactionsTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Batch ID</th>
              <th>Timestamp</th>
              <th>ZK Hash</th>
              <th>Status</th>
              <th>Finality Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.batchId}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                <td>{transaction.zkHash}</td>
                <td>{transaction.status}</td>
                <td>{transaction.finalityStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default TransactionsPage;
