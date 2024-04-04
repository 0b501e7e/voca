require('dotenv').config();
const express = require('express');
const ethers = require('ethers');
const transactionRoutes = require('./src/api/routes/transactionRoutes');
const depositListener = require('./src/jobs/depositListener');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.send('Operator Node is running');
});

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const abi = [/* TODO: Find a place to put abis */];
depositListener(process.env.CONTRACT_ADDRESS, abi, provider);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
