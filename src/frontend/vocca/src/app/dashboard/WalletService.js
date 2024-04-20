// Import the ethers library for interacting with the Ethereum blockchain
import { ethers } from 'ethers';

 // Function to initialize a wallet with a predefined private key from anvil for testing purposes.
 // useful for setting up a consistent test environment with known accounts and balances.

export const initializeTestWallet = (provider, setPrivateKey, setPublicKey) => {
    // Define the private key provided by Anvil for testing. Anvil is a local Ethereum network ideal for development.
    const anvilPrivateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"; 

    // Create a new wallet instance using the specified private key and provider.
    const wallet = new ethers.Wallet(anvilPrivateKey, provider);

    // Store the private key in the application state using the provided setter function.
    setPrivateKey(anvilPrivateKey);

    // Extract the public key from the wallet, removing the '0x04' prefix if present,
    const fullPublicKey = wallet.publicKey.slice(2); 

    // Determine the length of each co`mponent (X and Y coordinates) of the public key
    const halfLength = fullPublicKey.length / 2;
    // Extract the X coordinate, ensuring it is prefixed with '0x' to denote a hexadecimal number.
    const x = `0x${fullPublicKey.substring(0, halfLength)}`;
    // Extract the Y coordinate, similarly prefixed with '0x'.
    const y = `0x${fullPublicKey.substring(halfLength)}`;

    // Store the public key components in the application state as an array.
    setPublicKey([x, y]);

    // Log the initialization details for debugging and verification purposes,
    // including the private key, public key components, and the wallet address.
    console.log("Test wallet initialized with Anvil private key and account:", { privateKey: anvilPrivateKey, publicKey: [x, y], account: wallet.address });
};
