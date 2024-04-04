const ethers = require('ethers');
const stateManager = require('../services/stateManager');

const depositListener = (contractAddress, abi, provider) => {
    const contract = new ethers.Contract(contractAddress, abi, provider);

    contract.on('DepositEvent', (from, amount, tokenType, event) => {
        console.log(`New deposit from ${from}: ${amount} of token type ${tokenType}`);
        // Handle deposit logic, such as updating the state manager
        stateManager.processDeposit(from, amount, tokenType);
    });

    console.log('Listening for deposit events...');
};

module.exports = depositListener;
