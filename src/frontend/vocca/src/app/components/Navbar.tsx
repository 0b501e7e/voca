import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        <li style={{ display: 'inline', marginRight: 20 }}>
          {/* Link to the home page */}
          <Link href="/">Home</Link>
        </li>
        <li style={{ display: 'inline' }}>
          {/* Link to the transactions page */}
          <Link href="/transactions">Transactions</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
