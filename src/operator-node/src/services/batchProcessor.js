require("dotenv").config();
const path = require("path");
const TxTree = require("../utils/txTree");
const getCircuitInput = require("../utils/circuitInput_data");
const snarkjs = require("snarkjs");
const fs = require("fs").promises;
const { ethers } = require("ethers");
const abi = require("../utils/Rollup.json").abi;

const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(process.env.DEPLOY_PROVIDER_URL);
const signer = new ethers.Wallet(privateKey, provider);
const rollupContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, signer);

class BatchProcessor {
    constructor(accountTree, transactionPool, batchSize) {
        this.accountTree = accountTree;
        this.transactionPool = transactionPool;
        this.batchSize = batchSize;
        this.zkey = path.join(__dirname, 'batch_0001.zkey');
        this.vkey = path.join(__dirname, 'verification_key.json');
    }

    processNextBatch() {
        const transactions = this.transactionPool.getNextBatch(this.batchSize);

        console.log('transactions: ', transactions);

        const txTree = new TxTree(transactions);
        const stateTransition = this.accountTree.processTxArray(txTree);

        const circuitInput = getCircuitInput(stateTransition);
        this.submitProofGeneration(circuitInput);


        this.onBatchProcessed(transactions, circuitInput);
        this.transactionPool.confirmProcessedBatch(transactions);

    }

    async submitProofGeneration(circuitInput) {
        console.log("Submitting for proof generation:", circuitInput);
        try {
            const { proof, publicSignals } = await snarkjs.groth16.fullProve(circuitInput, path.join(__dirname, 'batch.wasm'), this.zkey);
            console.log("Public Signals:", publicSignals);
            console.log("Proof:", proof);

            const verificationKeyJson = await fs.readFile(this.vkey, { encoding: 'utf8' });
            const verificationKey = JSON.parse(verificationKeyJson); // Parse the JSON string into an object.

            const isValid = await snarkjs.groth16.verify(verificationKey, publicSignals, proof);

            if (!isValid) {
                throw new Error("Proof generation failed");
            } else {
                // submit proof to the contract
                console.log("Proof generation successful");
                console.log('local root: ', this.accountTree.root.toString());
                console.log('contract root: ', await rollupContract.currentRoot());
                const update = await rollupContract.updateState(
                    [
                        proof.pi_a[0], proof.pi_a[1]
                    ],
                    [
                        [proof.pi_b[0][1], proof.pi_b[0][0]],
                        [proof.pi_b[1][1], proof.pi_b[1][0]],
                    ],
                    [
                        proof.pi_c[0], proof.pi_c[1]
                    ],
                    publicSignals
                );

                const receipt = await update.wait();
                if (receipt.status === 1) {
                    console.log('Update transaction confirmed.');
                    const newRoot = await rollupContract.currentRoot();
                    console.log('New contract root:', newRoot.toString())
                }


            }

        } catch (error) {
            console.error("Error during proof generation:", error);
            throw error;
        }
    }


    onBatchProcessed(transactions, circuitInput) {
        console.log("Batch processed:", transactions.length, "transactions");
    }
}

module.exports = BatchProcessor;
