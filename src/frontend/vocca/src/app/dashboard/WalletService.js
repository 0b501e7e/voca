// Import the ethers library for interacting with the Ethereum blockchain
import { ethers } from 'ethers';

// Define private keys for test wallets
export const testWalletKeys = {
  firstPrivateKey: "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
  secondPrivateKey: "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
};

export const initializeTestWallet = (provider, privateKey, setPrivateKey, setPublicKey) => {
    // Create a new wallet instance using the specified private key and provider.
    const wallet = new ethers.Wallet(privateKey, provider);
    // Store the private key in the application state using the provided setter function.
    setPrivateKey(privateKey);

    // Extract the public key from the wallet, removing the '0x04' prefix if present.
    const fullPublicKey = wallet.publicKey.slice(4);

    // Ensure that the public key is padded to the full length expected (128 characters for each half)
    const paddedPublicKey = fullPublicKey.padStart(128, '0');

    // Determine the length of each component (X and Y coordinates) of the public key.
    const halfLength = paddedPublicKey.length / 2;
    // Extract the X coordinate, ensuring it is prefixed with '0x' to denote a hexadecimal number.
    const x = `0x${paddedPublicKey.substring(0, halfLength)}`;
    // Extract the Y coordinate, similarly prefixed with '0x'.
    const y = `0x${paddedPublicKey.substring(halfLength)}`;

    // Store the public key components in the application state as an object.
    setPublicKey({ x, y });
    // Log the initialization details for debugging and verification purposes,
    // including the private key, public key components, and the wallet address.
    console.log("Test wallet initialized:", { privateKey, publicKey: {x, y}, account: wallet.address });
};
