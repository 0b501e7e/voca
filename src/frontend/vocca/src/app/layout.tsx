'use client'

import React from 'react';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import ParticlesBackground from './components/ParticlesBackground'; // Import the ParticlesBackground component

import { Web3Provider } from '../context/web3modal';

// These styles apply to every route in the application
import '../styles/globals.css';

// export const metadata = {
//   title: 'VOCA',
//   description: 'VOCA Example'
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
        <html lang="en">
          <body>
            <ParticlesBackground />
            <Navbar />
            <main>{children}</main> {/* Only place where {children} should be rendered */}
            <Footer />
          </body>
        </html>
    </Web3Provider>
  );
}
