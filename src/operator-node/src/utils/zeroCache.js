const {poseidon} = require("circomlibjs");
const Account = require("../models/Account");

const zeroCache = [];

// We will get a tree of height 16
const height = 16;

const zeroAccount = new Account();
const zeroHash = zeroAccount.hashAccount()
zeroCache.push(zeroHash.toString());

for (var i = 1; i < height; i++) {
    zeroCache.push(poseidon(
        [zeroCache[i-1], zeroCache[i-1]]
    ).toString())
} 

console.log(zeroCache);