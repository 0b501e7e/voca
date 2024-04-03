const { validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
// Assuming a simple in-memory transaction pool for demonstration
let transactionPool = [];

exports.submitTransaction = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create a new transaction instance from the request body
    const { from, to, from_index, nonce, amount, token_type } = req.body;
    const transaction = new Transaction(from, to, from_index, nonce, amount, token_type);

    // TODO: Add further validations (e.g., check account balances, nonce, etc.)

    // Add the transaction to the pool
    transactionPool.push(transaction);

    console.log(transaction);
    res.status(202).send({ message: 'Transaction submitted successfully', transaction });
};

