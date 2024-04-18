// File: src/services/depositService.js

const ethers = require('ethers');
const AccountTree = require('../utils/accountTree');
const treeHelper = require('../utils/treeHelper');
const { poseidon } = require('circomlibjs');
const Account = require('../models/Account');
const { stringifyBigInts, unstringifyBigInts } = require('../utils/stringifybigint');

const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.WebSocketProvider(process.env.PROVIDER_URL);
const signer = new ethers.Wallet(privateKey, provider);

class DepositService {
    constructor(contractAddress, abi, accountTree) {
        this.contract = new ethers.Contract(contractAddress, abi, signer);
        this.pendingDeposits = [];
        this.subtreeHashes = [];
        this.accountIdx = 2;
        this.batchIdx = 0;
        this.BAL_DEPTH = 4;
        this.accountTree = accountTree;
        this.zeroCache = this.initializeZeroCache();
        this.listenForDepositEvents();
    }

    initializeZeroCache() {
        const zeroAccount = new Account();
        const zeroHash = zeroAccount.hashAccount();
        const numLeaves = 2 ** this.BAL_DEPTH;
        const zeroLeaves = new Array(numLeaves).fill(zeroAccount);
        const zeroTree = new AccountTree(zeroLeaves);
        let zeroCache = [stringifyBigInts(zeroHash)];
        for (let i = this.BAL_DEPTH - 1; i >= 0; i--) {
            zeroCache.unshift(stringifyBigInts(zeroTree.innerNodes[i][0]));
        }
        console.log('Initialized zeroCache:', zeroCache);
        return zeroCache;
    }



    listenForDepositEvents() {
        try {
            this.contract.on('RequestDeposit', (pubKey, amount, tokenType) => {
                console.log(`Deposit received: pubKey[${pubKey}], amount[${amount}], tokenType[${tokenType}]`);
                this.handleDeposit({ pubKey, amount, tokenType }).catch(console.error);
            });
        } catch (error) {
            console.error('Error occurred while listening for deposit events:', error);
        }
    }

    async handleDeposit({ pubKey, amount, tokenType }) {
        this.pendingDeposits.push({ pubKey, amount, tokenType });

        // Process in batches of 4 (for BAL_DEPTH of 4)
        if (this.pendingDeposits.length >= 4) {
            await this.processDepositsBatch();
        }
    }

    async processDepositsBatch() {

        // need to figure out a way to account for subtree position for the proof

        // const accounts = this.pendingDeposits.splice(0, 4).map(({ pubKey, amount, tokenType }) => {
        //     const acc = new Account(this.accountIdx++, pubKey[0], pubKey[1], amount, 0, tokenType);
        //     accounts.push(acc);
        //     return acc;
        // });

        const pendingDeposits = this.pendingDeposits.splice(0, 4);
        const pendingDepositsAccounts = [];
        const accounts = this.accountTree.accounts.slice(0, this.accountIdx + 1);
        for (let i = 0; i < pendingDeposits.length; i++) {
            const { pubKey, amount, tokenType } = pendingDeposits[i];
            const acc = new Account(this.accountIdx++, pubKey[0], pubKey[1], amount, 0, tokenType);
            accounts.push(acc);
            pendingDepositsAccounts.push(acc);
        }
        // clear pending deposits slice
        this.pendingDeposits = this.pendingDeposits.length == 4 ? [] : this.pendingDeposits.splice(4);
        const subtree = new AccountTree(pendingDepositsAccounts);
        const subtreeRoot = subtree.root;
        this.subtreeHashes.push(subtreeRoot);
        // after we have the proof, we should check the batch index to determine how many subtrees we need to fill
        // we should probably store each subtree hash in an array so we can progressively build the tree
        const subtreeProof = zeroCache.slice(1, BAL_DEPTH - Math.log2(4) + 1).reverse();
        if (this.batchIdx > 0) {
            for (let i = 0; i < this.batchIdx; i++) {
                subtreeProof[i] = stringifyBigInts(this.subtreeHashes[i]);
            }
        }
        const paddedAccounts = treeHelper.padArray(accounts, zeroAccount, numLeaves);
        const newTree = new AccountTree(paddedAccounts)
        const pos = treeHelper.idxToBinaryPos(this.batchIdx++, BAL_DEPTH - Math.log2(4));

        await this.contract.processDeposits(2, pos, subtreeProof);

        // if the call was successful, update the account tree
        this.accountTree = newTree;

    }


}



module.exports = DepositService;
