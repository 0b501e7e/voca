import React, { useState, useEffect } from "react";
import styles from "./Deposit.module.css"; // Ensure you have appropriate CSS
import { ethers } from "ethers";

// Define the types for the props
interface PublicKey {
  x: string;
  y: string;
}

interface DepositComponentProps {
  contract?: ethers.Contract; // Optional because it might not be initialized yet
  account: string | null; // Account can be null indicating no wallet is connected
  publicKey: PublicKey; // Assuming the PublicKey type is structured with x and y strings
}

const DepositComponent: React.FC<DepositComponentProps> = ({
  contract,
  account,
  publicKey,
}) => {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [tokenType, setTokenType] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleDeposit = async () => {
    console.log("Attempting to deposit:");
    // Check all fields are filled
    if (!depositAmount || !publicKey || !tokenType || !contract) {
      setError("All fields must be filled and a contract must be loaded.");
      return;
    }

    // Log public key parts for debugging
    console.log("Public Key X:", publicKey.x);
    console.log("Public Key Y:", publicKey.y);

    // Convert string publicKey parts to BigNumber to validate them
    try {
      const x = ethers.BigNumber.from(publicKey.x);
      const y = ethers.BigNumber.from(publicKey.y);

      if (
        x.gt(ethers.constants.MaxUint256) ||
        y.gt(ethers.constants.MaxUint256)
      ) {
        setError("Public key parts are out of bounds for uint256");
        return;
      }

      const transactionResponse = await contract.deposit(
        [publicKey.x, publicKey.y], // Pass the publicKey as an array directly
        ethers.utils.parseUnits(depositAmount, "ether"), // Convert deposit amount to wei
        tokenType,
        { value: ethers.utils.parseUnits(depositAmount, "ether") }
      );
      await transactionResponse.wait();
      alert("Deposit successful!");
      setDepositAmount(""); // Reset deposit amount
    } catch (error) {
      setError(`Deposit failed: ${(error as Error).message}`);
      console.error("Deposit error:", error);
    }
  };

  const handleWithdraw = async () => {
    alert("Withdrawal function not implemented yet.");
  };

  useEffect(() => {
    console.log("Contract instance:", contract);
    console.log("Account:", account);
    console.log("Public Key:", publicKey);
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
