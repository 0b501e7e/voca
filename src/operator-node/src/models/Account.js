class Account {
    constructor({ pubkey, balance = 0, nonce = 0, token_type = 0 }) {
        this.pubkey = pubkey; // { x: String, y: String }
        this.balance = balance;
        this.nonce = nonce;
        this.token_type = token_type;
    }
}

module.exports = Account;
