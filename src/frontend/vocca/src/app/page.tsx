import React from 'react';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>VOCA</h1>
        <p>To enhance Ethereum network scalability</p>
      </header>

      <section>
        <h2>Introduction</h2>
        <p>
          VOCA (Verifiable Off-Chain Computations are Awesome) is a project designed to enhance the scalability of the Ethereum network by implementing a zk rollup mechanism for ether/ERC20 transfers. This approach will leverage the efficiency of zk-SNARKs to process transactions off-chain, significantly improving transaction throughput on the Ethereum network.
        </p>
      </section>

      <section>
        <h2>Project Overview</h2>
        <h3>Goals</h3>
        <ul>
          <li>Create a scalable solution for Ethereum transactions.</li>
          <li>Implement a zero-knowledge rollup system for efficient off-chain transaction processing.</li>
          <li>Minimize processing time and costs associated with ether/ERC20 transfers.</li>
          <li>Ensure security and integrity of transactions using zk-SNARKs through the processing stages.</li>
        </ul>

        <h3>Scope</h3>
        <p>
          The project will focus primarily on ether and ERC20 token transfers, using zk rollups to streamline transaction processing. It will involve:
        </p>
        <ul>
          <li>Creating Off-Chain Transaction Aggregation measures, along with batching transactions, preparing them for off-chain processing.</li>
          <li>Zero-Knowledge Proof Generation: Utilizes zk-SNARKs to create cryptographic proofs that validate the transactions in a privacy-preserving manner.</li>
          <li>On-Chain Verification: A smart contract on the Ethereum blockchain that verifies the zero-knowledge proofs and updates the blockchain state accordingly.</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
