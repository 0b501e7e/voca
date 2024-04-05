class Transaction {
    constructor(from, to, from_index, nonce, amount, token_type) {
        this.from = from; // { x: String, y: String }
        this.to = to; // { x: String, y: String }
        this.from_index = from_index;
        this.nonce = nonce;
        this.amount = amount;
        this.token_type = token_type;
    }
}
module.exports = Transaction;
