import React from 'react';
import Navbar from './components/Navbar';
import '../styles/globals.css';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer>© 2024 VOCA. Enhancing Ethereum network scalability.</footer>
    </>
  );
};

export default Layout;
