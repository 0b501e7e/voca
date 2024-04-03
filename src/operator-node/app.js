const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { body, validationResult } = require('express-validator');


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Operator Node is running');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
// TODO: Modify the endpoint to properly validate the transaction
app.post('/submit-transaction', [
    body('sender').isString().withMessage('Sender must be a valid string.'),
    body('receiver').isString().withMessage('Receiver must be a valid string.'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number.'),
    body('signature').isString().withMessage('Signature must be a valid string.')
], (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the transaction from the request body
    const transaction = req.body;

    // TODO: Add the transaction to your transaction pool
    // For now, let's just log the transaction and return a success message
    console.log(transaction);
    res.status(202).send({ message: 'Transaction submitted successfully', transaction });
});

