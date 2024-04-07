class TransactionPool {
    constructor(batchSize = 100) {
        this.transactions = [];
        this.batchSize = batchSize;
        this.listeners = [];
    }

    addTransaction(transaction) {
        if (!this.isTransactionPresent(transaction)) {
            this.transactions.push(transaction);
            this.checkAndProcessBatch();
        }
    }

    isTransactionPresent(transaction) {
        return this.transactions.some(tx => tx.id === transaction.id);
    }

    checkAndProcessBatch() {
        if (this.transactions.length >= this.batchSize) {
            this.processBatch();
        }
    }

    processBatch() {
        const batch = this.transactions.splice(0, this.batchSize);
        this.notifyListeners(batch);
    }

    registerBatchListener(listener) {
        this.listeners.push(listener);
    }

    notifyListeners(batch) {
        this.listeners.forEach(listener => listener(batch));
    }

    removeTransaction(transactionId) {
        this.transactions = this.transactions.filter(tx => tx.id !== transactionId);
    }

    clear() {
        this.transactions = [];
    }

    getPoolSize() {
        return this.transactions.length;
    }
}

module.exports = TransactionPool;
