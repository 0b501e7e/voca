class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    getNextBatch(batchSize) {
        return this.transactions.slice(0, batchSize);
    }

    confirmProcessedBatch(batch) {
        this.transactions = this.transactions.filter(tx => !batch.includes(tx));
    }

    // Other methods like checking for transaction presence or clearing the pool can remain or be adjusted as needed.
}

module.exports = TransactionPool;
