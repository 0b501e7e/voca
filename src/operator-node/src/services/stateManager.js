const Account = require('../models/Account');

class StateManager {
    constructor() {
        this.accounts = new Map(); // Key: concatenated pubkey x and y, Value: Account instance
    }

    processDeposit(pubkey, amount, tokenType) {
        const accountKey = `${pubkey.x}${pubkey.y}`;

        let account = this.accounts.get(accountKey);

        if (!account) {
            // Create a new account with the deposit amount
            account = new Account({
                pubkey: { x: pubkey.x, y: pubkey.y }, 
                balance: parseFloat(amount), 
                nonce: 0, 
                token_type: parseInt(tokenType, 10) 
            });
            this.accounts.set(accountKey, account);
        } else {
            // Account exists, update its balance
            account.balance += parseFloat(amount);
        }

    }

    getAccount(pubkey) {
        return this.accounts.get(`${pubkey.x}${pubkey.y}`);
    }

    addAccount(pubkey, balance, nonce, token_type) {
        const accountKey = `${pubkey.x}${pubkey.y}`;
        const account = new Account({
            pubkey: pubkey,
            balance: balance,
            nonce: nonce,
            token_type: token_type
        });
        this.accounts.set(accountKey, account);
        return account;
    }

    updateAccount(pubkey, updateFn) {
        const accountKey = `${pubkey.x}${pubkey.y}`;
        const account = this.accounts.get(accountKey);
        if (!account) {
            throw new Error('Account not found');
        }
        updateFn(account);
        this.accounts.set(accountKey, account);
    }


}

module.exports = new StateManager(); 
