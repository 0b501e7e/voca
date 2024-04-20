const express = require('express');
const { submitTransaction } = require('../../controllers/transactionController');

const createTransactionRoutes = (transactionPool) => {
    const router = express.Router();

    router.post('/submit', [], (req, res) => {
        submitTransaction(req, res, transactionPool);
    });

    return router;
};

module.exports = createTransactionRoutes;
