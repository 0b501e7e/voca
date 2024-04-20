const ethers = require('ethers');
require('dotenv').config();  // Ensure this is at the top, before other requires if possible

const { poseidonContract } = require('circomlibjs2');

// Retrieve and validate the private key
const privateKey = process.env.PRIVATE_KEY;

console.log('Private key:', privateKey);

// Configure provider and signer using environment variables
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

async function deployPoseidonContracts() {

    try {
        // Check network connection
        const network = await provider.getNetwork();
        console.log('Connected to network:', network);

        // Generate and deploy contracts as before
        const Poseidon2ABI = poseidonContract.generateABI(2);
        const Poseidon2Bytecode = poseidonContract.createCode(2);
        const Poseidon2Factory = new ethers.ContractFactory(Poseidon2ABI, Poseidon2Bytecode, signer);
        console.log('Deploying Poseidon2...');
        const poseidon2 = await Poseidon2Factory.deploy();
        console.log('Poseidon2 deployed to:', poseidon2.address);

        // Further deployments...
    } catch (error) {
        console.error('Deployment failed:', error);
    }
    
    // Generate Poseidon Contract data
    const Poseidon2ABI = poseidonContract.generateABI(2);
    const Poseidon2Bytecode = poseidonContract.createCode(2);
    const Poseidon4ABI = poseidonContract.generateABI(4);
    const Poseidon4Bytecode = poseidonContract.createCode(4);
    const Poseidon5ABI = poseidonContract.generateABI(5);
    const Poseidon5Bytecode = poseidonContract.createCode(5);

    // Create Contract Factories
    const Poseidon2Factory = new ethers.ContractFactory(Poseidon2ABI, Poseidon2Bytecode, signer);
    const Poseidon4Factory = new ethers.ContractFactory(Poseidon4ABI, Poseidon4Bytecode, signer);
    const Poseidon5Factory = new ethers.ContractFactory(Poseidon5ABI, Poseidon5Bytecode, signer);

    // Deploy Contracts
    console.log('Deploying Poseidon2...');
    const poseidon2 = await Poseidon2Factory.deploy();
    console.log('Poseidon2 deployed to:', poseidon2.address);
    
    console.log('Deploying Poseidon4...');
    const poseidon4 = await Poseidon4Factory.deploy();
    console.log('Poseidon4 deployed to:', poseidon4.address);

    console.log('Deploying Poseidon5...');
    const poseidon5 = await Poseidon5Factory.deploy();
    console.log('Poseidon5 deployed to:', poseidon5.address);

    // Assuming PoseidonMerkle and Rollup contracts are available in your local environment
    // ABI and Bytecode for PoseidonMerkle and Rollup should be defined or imported
    const PoseidonMerkleABI = require('./PoseidonMerkle.json').abi; // Adjust path as needed
    const PoseidonMerkleBytecode = require('./PoseidonMerkle.json').bytecode; // Adjust path as needed
    const RollupABI = require('./Rollup.json').abi; // Adjust path as needed
    const RollupBytecode = require('./Rollup.json').bytecode; // Adjust path as needed

    const PoseidonMerkleFactory = new ethers.ContractFactory(PoseidonMerkleABI, PoseidonMerkleBytecode, signer);
    const RollupFactory = new ethers.ContractFactory(RollupABI, RollupBytecode, signer);

    // Deploy PoseidonMerkle with the addresses of deployed Poseidon contracts
    console.log('Deploying PoseidonMerkle...');
    const poseidonMerkle = await PoseidonMerkleFactory.deploy(poseidon2.address, poseidon4.address, poseidon5.address);
    console.log('PoseidonMerkle deployed to:', poseidonMerkle.address);

    // Deploy Rollup with address of PoseidonMerkle
    console.log('Deploying Rollup...');
    const rollup = await RollupFactory.deploy(poseidonMerkle.address);
    console.log('Rollup deployed to:', rollup.address);
}

deployPoseidonContracts().catch(console.error);
