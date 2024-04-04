const { validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
import stateManager from '../services/stateManager';
let transactionPool = [];

exports.submitTransaction = async (req, res) => {
    try {
        const { from, to, from_index, nonce, amount, token_type, signature } = req.body;

        // Convert public keys to a format usable by stateManager
        validateNonce(from, nonce);
        validateBalance(from, amount);
        // validateSignature(req.body, signature); // Assumes signature is part of the request

        executeTransaction(from, to, amount);
        transactionPool.push(new Transaction(from, to, from_index, nonce, amount, token_type));
        res.status(202).send({ message: 'Transaction successfully processed' });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }
};


function validateNonce(senderPubKey, transactionNonce) {
    const senderAccount = stateManager.getAccount(senderPubKey);
    // The transactionNonce should be equal to senderAccount.nonce + 1
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

    if (senderAccount.balance >= amount) {
        senderAccount.balance -= amount;
        receiverAccount.balance += amount;

        // Increment sender's nonce
        senderAccount.nonce += 1;

        // Persist changes
        stateManager.updateAccount(senderPubKey, senderAccount);
        stateManager.updateAccount(receiverPubKey, receiverAccount);
    } else {
        throw new Error('Insufficient balance for transaction execution');
    }
}


