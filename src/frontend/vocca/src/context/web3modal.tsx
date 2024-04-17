'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

// Context for access throughout the application
const Web3Context = createContext({
  connect: async () => {},
  disconnect: async () => {},
  provider: null,
  account: null
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Web3Modal instance settings
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'd3fa7677b00d83921f1b0a317cbba82a' // project id
        }
      }
    };

    const web3Modal = new Web3Modal({
      network: 'mainnet', // Optional to connect to a different network by default
      cacheProvider: true, // Optional Enable session caching between refreshes
      providerOptions // Required
    });

    setWeb3Modal(web3Modal);
  }, []);

  const connect = async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const account = await signer.getAddress();

      setProvider(provider);
      setAccount(account);
    } catch (e) {
      console.error('Could not connect to wallet:', e);
    }
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }
    setProvider(null);
    setAccount(null);
  };

  return (
    <Web3Context.Provider value={{ connect, disconnect, provider, account }}>
      {children}
    </Web3Context.Provider>
  );
};

