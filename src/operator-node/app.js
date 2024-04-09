require('dotenv').config();
const express = require('express');
const ethers = require('ethers');
const transactionRoutes = require('./src/api/routes/transactionRoutes');
const depositListener = require('./src/jobs/depositListener');
// Import required components
const AccountTree = require('./src/utils/accountTree');
const TransactionPool = require('./src/services/transactionPool');
const BatchProcessor = require('./src/services/batchProcessor');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize components
const accountTree = new AccountTree();
const transactionPool = new TransactionPool();
const batchProcessor = new BatchProcessor(accountTree, transactionPool, 100 /* or desired batch size */);
const depositListener = new depositListener(process.env.CONTRACT_ADDRESS, abi, provider, accountTree);


// Setup application middleware and routes
app.use(express.json());
app.use('/transactions', transactionRoutes(transactionPool, batchProcessor)); // Assuming you adjust routes to use these instances

app.get('/', (req, res) => {
    res.send('Operator Node is running');
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
