const { validationResult } = require('express-validator');
const Transaction  = require('../models/Transaction'); 
const accountTree = require('../utils/accountTree'); 
const TransactionPool = require('../services/transactionPool');

const txPool = new TransactionPool();

exports.submitTransaction = async (req, res) => {
    console.log('Received transaction data:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fromX, fromY, fromIndex, toX, toY, toIndex, nonce, amount, tokenType, signature } = req.body;
    if (!signature || !signature.R8x || !signature.R8y || !signature.S) {
        console.error('Signature components are missing or invalid:', signature);
        return res.status(400).json({ error: "Signature data missing or invalid" });
    }

    const { R8x, R8y, S } = signature;

    try {
        const transaction = new Transaction(
            BigInt(fromX),
            BigInt(fromY),
            BigInt(fromIndex),
            BigInt(toX),
            BigInt(toY),
            BigInt(toIndex),
            BigInt(nonce),
            BigInt(amount),
            BigInt(tokenType),
            BigInt(R8x),
            BigInt(R8y),
            BigInt(S)
        );
        transaction.checkSignature();  

        const responseTransaction = {
            fromX: transaction.fromX.toString(),
            fromY: transaction.fromY.toString(),
            fromIndex: transaction.fromIndex.toString(),
            toX: transaction.toX.toString(),
            toY: transaction.toY.toString(),
            toIndex: transaction.toIndex.toString(),
            nonce: transaction.nonce.toString(),
            amount: transaction.amount.toString(),
            tokenType: transaction.tokenType.toString(),
            R8x: transaction.R8x.toString(),
            R8y: transaction.R8y.toString(),
            S: transaction.S.toString()
        };

        txPool.addTransaction(transaction); 
        res.status(202).json({ message: 'Transaction processed', transaction: responseTransaction });
    } catch (error) {
        console.error('Error processing transaction:', error);
        res.status(400).json({ message: error.message });
    }
};


