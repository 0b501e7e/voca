// Assuming the use of CommonJS syntax for consistency
const { validationResult } = require('express-validator');
const { eddsa, poseidon } = require('circomlibjs');
const Transaction = require('../models/Transaction');
const stateManager = require('../services/stateTree'); 
const TransactionPool = require('../services/transactionPool');

const txPool = new TransactionPool();

exports.submitTransaction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { from, to, from_index, nonce, amount, token_type, signature } = req.body;

    try {
        // Validate transaction details
        validateNonce(from, nonce);
        validateBalance(from, amount);
        await validateSignature(req.body, signature);
        const newTransaction = new Transaction(from, to, from_index, nonce, amount, token_type);
        txPool.addTransaction(newTransaction);

        return res.status(202).json({ message: 'Transaction successfully processed', transaction: newTransaction });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

async function validateSignature(transaction, signature) {
    // Convert transaction details into a message hash, excluding the token_type
    const msgHash = poseidon([
        BigInt(transaction.from.x), 
        BigInt(transaction.from.y), 
        BigInt(transaction.to.x), 
        BigInt(transaction.to.y), 
        BigInt(transaction.amount), 
        BigInt(transaction.nonce)
    ]);

    const publicKey = [BigInt(transaction.from.x), BigInt(transaction.from.y)];
    console.log("public key: ", publicKey);
    const sig = {
        R8: [BigInt(signature.R8x), BigInt(signature.R8y)],
        S: BigInt(signature.S)
    };

    const isValid = eddsa.verifyPoseidon(msgHash, sig, publicKey);
    if (!isValid) {
        throw new Error("Invalid signature");
    }
}

function validateNonce(senderPubKey, transactionNonce) {
    const senderAccount = stateManager.getAccount(senderPubKey);
    if (!senderAccount || senderAccount.nonce + 1 !== transactionNonce) {
        throw new Error('Invalid nonce');
    }
}

function validateBalance(senderPubKey, amount) {
    const senderAccount = stateManager.getAccount(senderPubKey);
    if (!senderAccount || senderAccount.balance < amount) {
        throw new Error('Insufficient balance');
    }
}
