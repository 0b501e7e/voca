require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Include CORS
const ethers = require('ethers');
const { eddsa } = require('circomlibjs');
const transactionRoutes = require('./src/api/routes/transactionRoutes');
// Import required components
const AccountTree = require('./src/utils/accountTree');
const TransactionPool = require('./src/services/transactionPool');
const BatchProcessor = require('./src/services/batchProcessor');
const DepositService = require('./src/services/depositService');
const Account = require('./src/models/Account');
const app = express();
const PORT = process.env.PORT || 3000;
const abi = require('./src/utils/Rollup.json');
const rollupAbi = abi.abi;
const treeHelper = require('./src/utils/treeHelper');

const BAL_DEPTH = 4;

function generatePrvkey(i){
    prvkey = Buffer.from(i.toString().padStart(64,'0'), "hex");
    return prvkey;  
}

function generatePubkey(prvkey){
    pubkey = eddsa.prv2pub(prvkey);
    return pubkey; 
}


// Initialize components

const zeroAccount = new Account();
const operatorPrvkey = generatePrvkey(1);
const operatorPubkey = generatePubkey(operatorPrvkey);
const operator = new Account(
    1, operatorPubkey[0], operatorPubkey[1],
    0, 0, 0, operatorPrvkey
);
let accounts = [zeroAccount, operator];
accounts = treeHelper.padArray(accounts, zeroAccount, 2 ** BAL_DEPTH)

const accountTree = new AccountTree(accounts);

const depositService = new DepositService(process.env.CONTRACT_ADDRESS, rollupAbi, accountTree);
const transactionPool = new TransactionPool();
const batchProcessor = new BatchProcessor(accountTree, transactionPool, 4);

// app.use(express.json());
app.use(cors());
app.use(express.json());
app.use('/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.send('Operator Node is running');
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
