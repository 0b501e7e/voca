const fs = require("fs");
const { eddsa, poseidon } = require("circomlibjs");

const alicePrvKey = Buffer.from('1'.toString().padStart(64,'0'), "hex");
const alicePubKey = eddsa.prv2pub(alicePrvKey);
const bobPrvKey = Buffer.from('2'.toString().padStart(64,'0'), "hex");
const bobPubKey = eddsa.prv2pub(bobPrvKey);

// accounts
const Alice = {
    pubkey: alicePubKey,
    balance: 500
}
const aliceHash = poseidon(
    [Alice.pubkey[0], Alice.pubkey[1], Alice.balance]
);

const Bob = {
    pubkey: bobPubKey,
    balance: 0
}
const bobHash = poseidon(
    [Bob.pubkey[0], Bob.pubkey[1], Bob.balance]
);

const accounts_root = poseidon([aliceHash, bobHash])

// transaction
const tx = {
    from: Alice.pubkey,
    to: Bob.pubkey,
    amount: 500
}

// Alice sign tx
const txHash = poseidon(
    [tx.from[0], tx.from[1], tx.to[0], tx.to[1], tx.amount]
);
const signature = eddsa.signPoseidon(alicePrvKey, txHash)

// update Alice account
const newAlice = {
    pubkey: alicePubKey,
    balance: 0
}
const newAliceHash = poseidon(
    [newAlice.pubkey[0], newAlice.pubkey[1], newAlice.balance]
);

// update intermediate root
const intermediate_root = poseidon([newAliceHash, bobHash])

// update Bob account
const newBob = {
    pubkey: bobPubKey,
    balance: 500
}
const newBobHash = poseidon(
    [newBob.pubkey[0], newBob.pubkey[1], newBob.balance]
);

// update final root
const final_root = poseidon([newAliceHash, newBobHash])


const inputs = {
    "accountsRoot": accounts_root.toString(),
    "intermediateRoot": intermediate_root.toString(),
    "accountsPublicKeys": [
        [Alice.pubkey[0].toString(), Alice.pubkey[1].toString()], 
        [Bob.pubkey[0].toString(), Bob.pubkey[1].toString()]
    ],
    "accountBalances": [Alice.balance, Bob.balance],
    "senderPublicKey": [Alice.pubkey[0].toString(), Alice.pubkey[1].toString()],
    "senderBalance": Alice.balance,
    "receiverPublicKey": [Bob.pubkey[0].toString(), Bob.pubkey[1].toString()],
    "receiverBalance": Bob.balance,
    "amount": tx.amount,
    "signatureR8x": signature['R8'][0].toString(),
    "signatureR8y": signature['R8'][1].toString(),
    "signatureS": signature['S'].toString(),
    "senderProof": [bobHash.toString()],
    "senderProofPositions": [0],  
    "receiverProof": [newAliceHash.toString()],
    "receiverProofPositions": [1] 
}

fs.writeFileSync(
    "./input.json",
    JSON.stringify(inputs),
    "utf-8"
);