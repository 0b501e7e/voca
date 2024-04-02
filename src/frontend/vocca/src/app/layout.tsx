import React from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import type { Metadata } from "next";

import { config } from "@/config";
import Web3ModalProvider from "@/context";

// These styles apply to every route in the application
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "VOCCA",
  description: "Zak Smith & Senan Warnock",
};

// Assuming a simple initialState structure, this will evolve when necessary
const initialState = {
  isConnected: false,
  account: null,
  provider: null,
  chainId: null,
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <Web3ModalProvider initialState={initialState}>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main> {/* Only place where {children} should be rendered */}
          <Footer />
        </body>
      </html>
    </Web3ModalProvider>
  );
}
