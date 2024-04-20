const { validationResult } = require('express-validator');
const Transaction  = require('../models/Transaction'); 


exports.submitTransaction = async (req, res, transactionPool) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fromX, fromY, fromIndex, toX, toY, toIndex, nonce, amount, tokenType, signature } = req.body;

    const { R8x, R8y, S } = signature;

    try {
        const transaction = new Transaction(
            BigInt(fromX),
            BigInt(fromY),
            Number(fromIndex),
            BigInt(toX),
            BigInt(toY),
            Number(toIndex),
            Number(nonce),
            Number(amount),
            Number(tokenType),
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

        transactionPool.addTransaction(transaction); 

        res.status(202).json({ message: 'Transaction processed', transaction: responseTransaction });
    } catch (error) {
        console.error('Error processing transaction:', error);
        res.status(400).json({ message: error.message });
    }
};


