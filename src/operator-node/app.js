const express = require('express');
const transactionRoutes = require('./src/api/routes/transactionRoutes'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.send('Operator Node is running');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
