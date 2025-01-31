const { poseidon, eddsa } = require('circomlibjs');
const { unstringifyBigInts } = require('../utils/stringifybigint.js')

module.exports = class Transaction {
    constructor(
        _fromX, _fromY, _fromIndex,
        _toX, _toY, _toIndex,
        _nonce, _amount, _tokenType,
        _R8x, _R8y, _S
    ) {
        console.log(`Transaction constructor parameters:`, { _fromX, _fromY, _fromIndex, _toX, _toY, _toIndex, _nonce, _amount, _tokenType, _R8x, _R8y, _S });

        this.fromX = _fromX;
        this.fromY = _fromY;
        this.fromIndex = _fromIndex;
        this.toX = _toX;
        this.toY = _toY;
        this.toIndex = _toIndex;
        this.nonce = _nonce;
        this.amount = _amount
        this.tokenType = _tokenType;

        this.hash = this.hashTx();

        this.R8x = _R8x;
        this.R8y = _R8y;
        this.S = _S;
    }

    hashTx() {
        const leftSubLeaf = poseidon([
            this.fromX.toString(),
            this.fromY.toString(),
            this.toX.toString(),
            this.toY.toString(),
        ]);
        const rightSubLeaf = poseidon([
            this.fromIndex.toString(),
            this.nonce.toString(),
            this.amount.toString(),
            this.tokenType.toString()
        ]);
        const txHash = poseidon([
            leftSubLeaf,
            rightSubLeaf,
        ]);
        this.hash = txHash;
        return txHash
    }

    // call this when details have been collected on the frontend, sign transaction with generated private key
    signTxHash(prvkey) {
        const signature = eddsa.signPoseidon(prvkey, unstringifyBigInts(this.hash.toString()));
        this.R8x = signature.R8[0];
        this.R8y = signature.R8[1];
        this.S = signature.S;
    }

    checkSignature() {
        const signature = {
            R8: [this.R8x, this.R8y],
            S: this.S
        }
        const signed = eddsa.verifyPoseidon(
            this.hash, signature, [this.fromX, this.fromY]
        )
        if (!signed) {
            throw "transaction was not signed by sender"
        }
    }

}