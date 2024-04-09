import React from "react";
import styles from "./Page.module.css";
import Image from "next/image"; // Import the Image component
import { info } from "console";

const TransactionsPage = () => {
  const transactions = [
    {
      id: 1,
      batchId: "Batch-001",
      timestamp: "2023-03-01T12:00:00Z",
      zkHash: "0x123...",
      status: "Processed",
      finalityStatus: "Confirmed",
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Transactions</h1>
        <div className={styles.transactionInfo}>
          <p className={styles.infoParagraph}>
            This table provides a detailed view of all transactions processed
            through our zk-Rollup mechanism. Here, you can track each
            transaction'&apos;s batch ID, timestamp, zk-SNARK hash, current status,
            and finality status. The information is updated in real-time to
            reflect the most current state of the blockchain.
          </p>
        </div>
      </header>
      <main>
        {/* Transactions list/table */}
        <table className={styles.transactionsTable}>
          <thead>
            <tr>
              <th>To</th>
              <th>From</th>
              <th>Token Type</th>
              <th>Amount</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{transaction.batchId}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                <td>{transaction.zkHash}</td>
                <td>{transaction.status}</td>
                <td>{index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default TransactionsPage;
