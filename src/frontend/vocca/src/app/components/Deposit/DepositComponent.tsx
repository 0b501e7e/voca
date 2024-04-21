import React, { useState, useEffect } from "react";
import styles from "./Deposit.module.css";
import { ethers } from "ethers";

interface PublicKey {
  x: string;
  y: string;
}

interface DepositComponentProps {
  contract?: ethers.Contract;
  account: string | null;
  publicKey: PublicKey;
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
    const errorMessage = "All fields must be filled and a contract must be loaded.";
    if (!depositAmount || !publicKey || !tokenType || !contract) {
      setError(errorMessage);
      alert(errorMessage);
      return;
    }

    console.log("Public Key X:", publicKey.x);
    console.log("Public Key Y:", publicKey.y);

    try {
      const x = ethers.BigNumber.from(publicKey.x);
      const y = ethers.BigNumber.from(publicKey.y);

      if (x.gt(ethers.constants.MaxUint256) || y.gt(ethers.constants.MaxUint256)) {
        setError("Public key parts are out of bounds for uint256");
        return;
      }

      const transactionResponse = await contract.deposit(
        [publicKey.x, publicKey.y],
        ethers.utils.parseUnits(depositAmount, "ether"),
        tokenType,
        { value: ethers.utils.parseUnits(depositAmount, "ether") }
      );
      await transactionResponse.wait();
      alert(`Deposit successful!\n\nDetails:\n- Amount: ${depositAmount} ETH\n- Token Type: ${tokenType}\n- Transaction Hash: ${transactionResponse.hash}`);

      setDepositAmount("");
    } catch (error: any) {  // Using 'any' for simplicity; could use more specific error handling
      const errorMessage = `Deposit failed: ${error instanceof Error ? error.message : "Unknown error"}`;
      setError(errorMessage);
      console.error("Deposit error:", errorMessage);
      alert(errorMessage);
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
        placeholder="Amount to Deposit"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        className={styles.depositInput}
      />
      <select
        className={styles.tokenSelect}
        onChange={(e) => setTokenType(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Select Token</option>
        <option value="1">Ethereum</option>
      </select>
      <button className={styles.depositButton} onClick={handleDeposit}>
        Deposit
      </button>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default DepositComponent;
