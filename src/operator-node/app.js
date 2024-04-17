require('dotenv').config();
const express = require('express');
const ethers = require('ethers');
const transactionRoutes = require('./src/api/routes/transactionRoutes');
// Import required components
const AccountTree = require('./src/utils/accountTree');
const TransactionPool = require('./src/services/transactionPool');
const BatchProcessor = require('./src/services/batchProcessor');
const DepositService = require('./src/services/depositService');
const Account = require('./src/models/Account');
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize components
const accountTree = new AccountTree();
const accounts = [];
const zeroAccount = new Account();
accounts.push(zeroAccount);
const coordinatorPrvkey = process.env.COORDINATOR_PRIVATE_KEY;
const coordinatorPubkey = process.env.COORDINATOR_PUBLIC_KEY;
const coordinator = new Account(
    1, coordinatorPubkey[0], coordinatorPubkey[1],
    0, 0, 0, coordinatorPrvkey
);
accounts.push(coordinator);
const depositService = new DepositService(process.env.CONTRACT_ADDRESS, process.env.CONTRACT_ABI, process.env.PROVIDER_URL, accountTree, accounts);
const transactionPool = new TransactionPool();
const batchProcessor = new BatchProcessor(accountTree, transactionPool, 4);

// Setup application middleware and routes
app.use(express.json());
app.use('/transactions', transactionRoutes(accountTree, transactionPool, batchProcessor)); // Assuming you adjust routes to use these instances

app.get('/', (req, res) => {
    res.send('Operator Node is running');
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
