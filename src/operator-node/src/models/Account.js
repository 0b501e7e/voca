class Account {
    constructor(pubkey, balance, nonce, token_type) {
        this.pubkey = pubkey; // { x: String, y: String }
        this.balance = balance;
        this.nonce = nonce;
        this.token_type = token_type;
    }
}
module.exports = Account;
