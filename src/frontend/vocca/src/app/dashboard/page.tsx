"use client";

import React, { useEffect, useState } from "react";
import styles from "./Page.module.css";
import Image from "next/image"; // Import the Image component

// TypeScript interface for the transaction data
interface Transaction {
  id: number;
  batchId: string;
  timestamp: string;
  zkHash: string;
  status: string;
  finalityStatus: string;
}

const DashboardPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (error: any) {
        console.error("Error fetching transactions:", error);
        setError(error.message || "An error occurred while fetching transactions.");
      }
    };

    fetchTransactions();
  }, []);

  const handleDeposit = async (e) => {
    e.preventDefault();
    console.log(`Depositing ${depositAmount}`);
    setDepositAmount('');
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <div className={styles.transactionInfo}>
          <p className={styles.infoParagraph}>
            Manage your transactions and deposits through our zk-Rollup mechanism. This dashboard provides a real-time view of blockchain operations.
          </p>
        </div>
      </header>
      <main>
        <div className={styles.depositSection}>
          <div className={styles.depositContent}>
            <h2 className={styles.depositTitle}>Make a Deposit</h2>
            <div className={styles.depositDiv}>
              <input type="text" placeholder="Amount to Deposit" className={styles.depositInput} onChange={(e) => setDepositAmount(e.target.value)} />
              <button className={styles.depositButton} onClick={handleDeposit}>Deposit</button>
            </div>
          </div>
          <div className={styles.imageDiv}>
            <Image src="/deposit.png" alt="Deposit Illustration" width={350} height={350}/>
          </div>
        </div>

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

export default DashboardPage;