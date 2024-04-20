const http = require('http');
const { ethers } = require('ethers');
const { eddsa, poseidon } = require('circomlibjs');
const Transaction = require('../models/Transaction'); 
require('dotenv').config();

function generatePrivateKey(index) {
    return Buffer.from(index.toString().padStart(64, '0'), "hex");
}

function generatePublicKey(privateKey) {
    return eddsa.prv2pub(privateKey);
}

function sendTransaction(transaction) {
    const data = JSON.stringify({
        fromX: transaction.fromX.toString(),
        fromY: transaction.fromY.toString(),
        toX: transaction.toX.toString(),
        toY: transaction.toY.toString(),
        fromIndex: transaction.fromIndex.toString(),
        toIndex: transaction.toIndex.toString(),
        nonce: transaction.nonce.toString(),
        amount: transaction.amount.toString(),
        tokenType: transaction.tokenType.toString(),
        signature: {
            R8x: transaction.R8x.toString(),
            R8y: transaction.R8y.toString(),
            S: transaction.S.toString()
        }
    });

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/transactions/submit',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const req = http.request(options, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => responseBody += chunk);
        res.on('end', () => {
            console.log(`Transaction from index ${transaction.fromIndex} to index ${transaction.toIndex} response:`, responseBody);
        });
    });

    req.on('error', (error) => {
        console.error('Error sending transaction:', error);
    });

    req.write(data);
    req.end();
}

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
    const accounts = await provider.listAccounts();

    for (let i = 2; i < accounts.length; i++) {
        const privateKey = generatePrivateKey(i);
        const publicKey = generatePublicKey(privateKey);

        const toIndex = i + 1;
        const toPrivateKey = generatePrivateKey(toIndex);
        const toPublicKey = generatePublicKey(toPrivateKey);

        let transaction = new Transaction(
            publicKey[0].toString(),
            publicKey[1].toString(),
            i,
            toPublicKey[0].toString(),
            toPublicKey[1].toString(),
            toIndex,
            0,
            10, 
            1   
        );

        transaction.hashTx();
        transaction.signTxHash(privateKey);



        sendTransaction(transaction);
    }
}

main().catch(console.error);
