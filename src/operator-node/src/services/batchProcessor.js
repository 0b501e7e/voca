require("dotenv").config();
const path = require("path");
const { TxTree } = require("../utils/txTree");
const { getCircuitInput } = require("../utils/circuitInput");
const snarkjs = require("snarkjs");
class BatchProcessor {
    constructor(accountTree, transactionPool, batchSize) {
        this.accountTree = accountTree;
        this.transactionPool = transactionPool;
        this.batchSize = batchSize;
        this.zkey = process.env.ZKEY;
        this.vkey = process.env.VKEY;
    }

    processNextBatch() {
        const transactions = this.transactionPool.getNextBatch(this.batchSize);

        const txTree = new TxTree(transactions);

        const stateTransition = this.accountTree.processTxArray(txTree);

        const circuitInput = getCircuitInput(stateTransition);

        this.submitProofGeneration(circuitInput);


        this.onBatchProcessed(transactions, circuitInput);
        this.transactionPool.confirmProcessedBatch(transactions);

    }

    async submitProofGeneration(circuitInput) {
        console.log("Submitting for proof generation:", circuitInput);
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(circuitInput, path.join(__dirname, 'circuit.wasm'), this.zkey);
        const isValid = await snarkjs.groth16.verify(this.vkey, publicSignals, proof);

        if (!isValid) {
            throw new Error("Proof generation failed");
        }

        return { proof, publicSignals };
    }

    onBatchProcessed(transactions, circuitInput) {
        console.log("Batch processed:", transactions.length, "transactions");
    }
}

module.exports = BatchProcessor;
