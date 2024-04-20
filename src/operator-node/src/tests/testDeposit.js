const { ethers } = require('ethers');
const abi = require('../utils/Rollup.json').abi;
const { eddsa } = require('circomlibjs');
require('dotenv').config();

function generatePrvkey(i) {
    return Buffer.from(i.toString().padStart(64, '0'), "hex");
}

function generatePubkey(prvkey) {
    return eddsa.prv2pub(prvkey);
}

async function main() {
    const provider = new ethers.JsonRpcProvider('http://localhost:8545');
    const accounts = await provider.listAccounts();
    const contractAddress = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318';
    const contract = new ethers.Contract(contractAddress, abi, provider);

    // Start from the 4th address (index 3)
    for (let i = 2; i < accounts.length; i++) {
        const signer = new ethers.Wallet('0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', provider); // Replace with the appropriate private key for each account
        const privkey = generatePrvkey(i); // Assuming a method to generate or retrieve private keys
        const pubkey = generatePubkey(privkey);
        const accountSigner = signer.connect(provider);
        const txResponse = await contract.connect(accountSigner).deposit(pubkey, 10, 1, { value: 10 });
        console.log(`Transaction response from account ${i}:`, txResponse);

        const receipt = await txResponse.wait();
        console.log(`Transaction receipt from account ${i}:`, receipt);
    }
}

main().catch(console.error);
