const { MerkleTree } = require('merkletreejs');
const { poseidon } = require('circomlibjs');
const Account = require('../models/Account');

function hashAccount(account) {
  const accountData = [
    BigInt(account.pubkey.x),
    BigInt(account.pubkey.y),
    BigInt(account.balance),
    BigInt(account.nonce),
    BigInt(account.token_type)
  ];
  return poseidon(accountData).toString();
}

class StateTree {
  constructor() {
    this.accounts = new Map();
    this.leaves = [];
    this.updateTree();
  }

  processDeposit(pubkey, amount, tokenType) {
    const accountKey = `${pubkey.x}${pubkey.y}`;

    let account = this.accounts.get(accountKey) || new Account({
      pubkey: { x: pubkey.x, y: pubkey.y },
      balance: 0, // Start with 0 balance for new accounts
      nonce: 0,
      token_type: parseInt(tokenType, 10)
    });

    account.balance += parseFloat(amount); // Increase balance
    this.accounts.set(accountKey, account);
    this.updateTree();
  }

  addAccount(pubkey, balance, nonce, token_type) {
    const accountKey = `${pubkey.x}${pubkey.y}`;
    const newAccount = new Account({
      pubkey,
      balance,
      nonce,
      token_type
    });
    this.accounts.set(accountKey, newAccount);
    this.updateTree();
    return newAccount;
  }

  updateAccount(pubkey, updateFn) {
    const accountKey = `${pubkey.x}${pubkey.y}`;
    const account = this.accounts.get(accountKey);

    if (!account) {
      throw new Error('Account not found');
    }

    updateFn(account); // Apply updates
    this.accounts.set(accountKey, account);
    this.updateTree();
  }

  getAccount(pubkey) {
    const accountKey = `${pubkey.x}${pubkey.y}`;
    return this.accounts.get(accountKey);
  }

  updateTree() {
    this.leaves = Array.from(this.accounts.values()).map(account => hashAccount(account));
    this.tree = new MerkleTree(this.leaves, x => x, { hashLeaves: false, sortPairs: true });
  }

  getProof(pubkey) {
    const accountKey = `${pubkey.x}${pubkey.y}`;
    const account = this.accounts.get(accountKey);
    if (!account) {
      throw new Error('Account not found for proof generation');
    }
    const leaf = hashAccount(account);
    return this.tree.getHexProof(leaf);
  }

  getRoot() {
    return this.tree.getHexRoot();
  }
}

module.exports = StateTree;
