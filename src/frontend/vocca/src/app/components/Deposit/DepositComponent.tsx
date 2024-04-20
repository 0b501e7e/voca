import React, { useState, useEffect } from "react";
import styles from "./Deposit.module.css"; // Ensure you have appropriate CSS
import { ethers } from "ethers";

const DepositComponent = ({ contract, account, publicKey }) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [error, setError] = useState("");

  const handleDeposit = async () => {
    console.log("Attempting to deposit:");
    if (!depositAmount || !publicKey || !tokenType || !contract) {
      setError("All fields must be filled and a contract must be loaded.");
      return;
    }

    // Ensure all fields are correctly filled, including publicKey as an array
    if (!Array.isArray(publicKey) || publicKey.length !== 2) {
      setError("Public key must be a valid array with two elements.");
      return;
    }

    // Log public key parts for debugging
    console.log("Public Key X:", publicKey[0]);
    console.log("Public Key Y:", publicKey[1]);

    // Validate that each part of the public key is a valid uint256
    if (
      ethers.BigNumber.from(publicKey[0]).gt(ethers.constants.MaxUint256) ||
      ethers.BigNumber.from(publicKey[1]).gt(ethers.constants.MaxUint256)
    ) {
      setError("Public key parts are out of bounds for uint256");
      return;
    }

    try {
      const transactionResponse = await contract.deposit(
        publicKey, // Pass the publicKey array directly
        ethers.utils.parseUnits(depositAmount, "ether"), // Convert deposit amount to wei for ETH
        tokenType,
        { value: ethers.utils.parseUnits(depositAmount, "ether") }
      );
      await transactionResponse.wait();
      alert("Deposit successful!");
      setDepositAmount(""); // Reset deposit amount
    } catch (error) {
      setError(`Deposit failed: ${error.message}`);
      console.error("Deposit error:", error);
    }
  };

  const handleWithdraw = async () => {
    alert("Withdrawal function not implemented yet.");
  };

  useEffect(() => {
    console.log("Contract instance:", contract);
    console.log("Account:", account);
    console.log("--------------------------------------------------");
  }, [contract, account, publicKey]);

  return (
    <div className={styles.depositContent}>
      <h2 className={styles.depositTitle}>Make a Deposit</h2>

      <input
        type="text"
        placeholder="Amount to Deposit/Withdraw"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        className={styles.depositInput}
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
        <button className={styles.withdrawButton} onClick={handleWithdraw}>
          Withdraw
        </button>
      )}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default DepositComponent;
