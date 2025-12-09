import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">

        <div className="h-10 w-10 rounded bg-red-500 flex items-center justify-center text-white font-bold">
          V
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Vendora Admin</h2>
          <p className="text-xs text-gray-500">Control panel</p>
        </div>
      </div>
      <div className="flex items-center">
        {/* User dropdown or other header elements can go here */}
        <Link to="/" className="text-white hover:text-gray-100 text-sm">
          View Website
        </Link>
      </div>
    </header>
  );
}

export default Header
