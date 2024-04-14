'use client'

import React from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ParticlesBackground from "./components/ParticlesBackground"; // Import the ParticlesBackground component

import { config } from "@/config";
import Web3ModalProvider from "@/context";

// These styles apply to every route in the application
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <Web3ModalProvider>
      <html lang="en">
        <body>
          <ParticlesBackground />
          <Navbar />
          <main>{children}</main> {/* Only place where {children} should be rendered */}
          <Footer />
        </body>
      </html>
      
    </Web3ModalProvider>
  );
}
