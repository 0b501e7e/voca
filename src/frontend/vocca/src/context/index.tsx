"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { config, projectId } from "@/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

// Wallet Address Context setup
const WalletContext = createContext<
  { ethAddress: string; setEthAddress: (address: string) => void } | undefined
>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ethAddress, setEthAddress] = useState<string>("");
  const { address } = useAccount();

  // Sync connected account address to state
  React.useEffect(() => {
    if (address) {
      setEthAddress(address);
    }
  }, [address]);

  return (
    <WalletContext.Provider value={{ ethAddress, setEthAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: any;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>{children}</WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
