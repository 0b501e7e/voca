require('dotenv').config();
const express = require('express');
const ethers = require('ethers');
const { eddsa } = require('circomlibjs');
const createTransactionRoutes = require('./src/api/routes/transactionRoutes');
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
const { stringifyBigInts } = require('./src/utils/stringifybigint');

const BAL_DEPTH = 4;


function generatePrvkey(i){
    prvkey = Buffer.from(i.toString().padStart(64,'0'), "hex");
    return prvkey;  
}

function generatePubkey(prvkey){
    pubkey = eddsa.prv2pub(prvkey);
    return pubkey; 
}

// rollup contract
const provider = new ethers.JsonRpcProvider(process.env.DEPLOY_PROVIDER_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const rollupContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, rollupAbi, signer);

// log private key and contract address

console.log('Private key:', process.env.PRIVATE_KEY);
console.log('Contract address:', process.env.CONTRACT_ADDRESS);

// Initialize components

const zeroAccount = new Account();
const operatorPrvkey = generatePrvkey(1);
const operatorPubkey = generatePubkey(operatorPrvkey);
const operator = new Account(
    1, operatorPubkey[0], operatorPubkey[1],
    0, 0, 0, operatorPrvkey
);
let accounts = [zeroAccount];

async function makeDeposit() {
    try {
        const zero = await rollupContract.deposit([0, 0], 0, 0, { value: 0});
        await zero.wait();

                const op = await rollupContract.deposit(operatorPubkey, 0, 0, {value: 0});
        console.log('Operator deposit successful:', op);
    } catch (error) {
        console.error('Error making deposit:', error);
    }
}


makeDeposit();

accounts = treeHelper.padArray(accounts, zeroAccount, 2 ** BAL_DEPTH)

const accountTree = new AccountTree(accounts);

const depositService = new DepositService(process.env.CONTRACT_ADDRESS, rollupAbi, accountTree);
const transactionPool = new TransactionPool();
const batchProcessor = new BatchProcessor(accountTree, transactionPool, 4);


app.use(express.json());
app.use('/transactions', createTransactionRoutes(transactionPool));

app.get('/', (req, res) => {
    res.send('Operator Node is running');
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    setInterval(() => {
        console.log("Scheduled check - Transaction Pool Size:", transactionPool.transactions.length);  // This will confirm the interval runs and reports the pool size.
        if (transactionPool.transactions.length >= batchProcessor.batchSize) {
            console.log("Initiating batch processing.");
            batchProcessor.processNextBatch();
        }
    }, 20000);
});    
