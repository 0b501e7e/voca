"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

// set up the types for the context to help with TypeScript.
interface Web3ContextType {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  provider: ethers.providers.Web3Provider | null;
  account: string | null;
}

// Creates the Web3 context with default empty functions and null states.
const Web3Context = createContext<Web3ContextType>({
  connect: async () => {},
  disconnect: async () => {},
  provider: null,
  account: null,
});

// A custom hook to help any page easily use the Web3 context.
export const useWeb3 = () => useContext(Web3Context);

interface Web3ProviderProps {
  children: ReactNode;
}

// Provides the Web3 context to its children and manages web3 state.
export const Web3Provider: FC<Web3ProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  // Setup Web3Modal once when the component mounts.
  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // Needs WalletConnectProvider to work.
        options: {
          infuraId: "d3fa7677b00d83921f1b0a317cbba82a", // project ID here.
        },
      },
    };

    // Configure Web3Modal with the network and provider options.
    const web3Modal = new Web3Modal({
      network: "mainnet", // Defaults to the mainnet.
      cacheProvider: true, // Keeps wallet connected after page reloads.
      providerOptions, // The setup options for providers.
    });

    setWeb3Modal(web3Modal);
  }, []);

  // Handles connecting the wallet through Web3Modal.
  const connect = async () => {
    if (!web3Modal) {
      console.error("Web3Modal instance not initialized");
      return;
    }
    try {
      const instance = await web3Modal.connect(); // Connects to the selected wallet.
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner(); // Gets the signer from the provider.
      const account = await signer.getAddress(); // Fetches the connected account address.

      setProvider(provider);
      setAccount(account);
    } catch (e) {
      console.error("Could not connect to wallet:", e);
    }
  };

  // Handles wallet disconnection.
  const disconnect = async () => {
    if (!web3Modal) {
      console.error("Web3Modal instance not initialized");
      return;
    }

    try {
      await web3Modal.clearCachedProvider(); // Clears any session so wallet needs to reconnect.

      // If the provider can be disconnected, do it.
      const anyProvider = provider as any; // Using `any` to cover all provider types.
      if (
        anyProvider?.disconnect &&
        typeof anyProvider.disconnect === "function"
      ) {
        await anyProvider.disconnect();
      }
      setProvider(null);
      setAccount(null);
    } catch (e) {
      console.error("Failed to disconnect:", e);
    }
  };

  // Passes the context values down to any child components.
  return (
    <Web3Context.Provider value={{ connect, disconnect, provider, account }}>
      {children}
    </Web3Context.Provider>
  );
};
