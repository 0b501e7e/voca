import React from 'react';

const TransactionsPage = () => {
  return (
    <div>
      <header>
        <h1>Transactions</h1>
        <p>Explore recent transactions processed through VOCA.</p>
      </header>

      <section>
        <h2>Recent Transactions</h2>
        {/* Placeholder for dynamic transaction list */}
        <div>
          <p>Transaction data will be displayed here.</p>
          {/* Example structure for a transaction item */}
          <ul>
            <li>Transaction ID: #123456</li>
            <li>Sender: 0xABC...123</li>
            <li>Recipient: 0xDEF...456</li>
            <li>Amount: 1.0 ETH</li>
            <li>Status: Successful</li>
          </ul>
        </div>
      </section>

    </div>
  );
};

export default TransactionsPage;
