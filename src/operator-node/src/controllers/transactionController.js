// Assuming the use of CommonJS syntax for consistency
const { validationResult } = require('express-validator');
const { eddsa, poseidon } = require('circomlibjs');
const Transaction = require('../models/Transaction');
const stateManager = require('../services/stateManager'); // Adjust the path as necessary
let transactionPool = [];

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

        // Execute the transaction and add to the pool if valid
        executeTransaction(from, to, amount);
        const newTransaction = new Transaction(from, to, from_index, nonce, amount, token_type);
        transactionPool.push(newTransaction);

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

function executeTransaction(senderPubKey, receiverPubKey, amount) {
    const senderAccount = stateManager.getAccount(senderPubKey);
    const receiverAccount = stateManager.getAccount(receiverPubKey) || stateManager.addAccount(receiverPubKey, 0, 0, senderAccount.token_type);

    if (senderAccount.balance < amount) {
        throw new Error('Insufficient balance for transaction execution');
    }

    // Process the transaction
    senderAccount.balance -= amount;
    receiverAccount.balance += amount;
    senderAccount.nonce += 1;

    // Persist the account changes
    stateManager.updateAccount(senderPubKey, senderAccount);
    stateManager.updateAccount(receiverPubKey, receiverAccount);
}
