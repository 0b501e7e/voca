const express = require('express');
const { body, validationResult, custom } = require('express-validator');
const { submitTransaction } = require('../../controllers/transactionController');
const router = express.Router();

router.post('/submit', [
    // Validate that 'from' and 'to' are objects with 'x' and 'y' strings
    body('from').custom((value) => {
        return value.x && value.y && typeof value.x === 'string' && typeof value.y === 'string';
    }).withMessage('Sender public key must be a valid object with x and y coordinates.'),
    body('to').custom((value) => {
        return value.x && value.y && typeof value.x === 'string' && typeof value.y === 'string';
    }).withMessage('Receiver public key must be a valid object with x and y coordinates.'),
    body('from_index').isInt({ min: 0 }).withMessage('from_index must be a positive integer.'),
    body('nonce').isInt({ min: 0 }).withMessage('Nonce must be a positive integer.'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number.'),
    body('token_type').isInt({ min: 0 }).withMessage('Token type must be a positive integer.'),
    body('signature').isString().withMessage('Signature must be a valid string.'),
], submitTransaction);

module.exports = router;
