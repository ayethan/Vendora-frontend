// import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './layouts/Sidebar';

function Dashboard() {
  // const user = useSelector((state) => state.user.user);
  // const isAdmin = user?.role === 'Admin';

  // if (!isAdmin) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <div className="min-h-screen flex flex-col md:flex-row shadow-sm mx-auto">
      {/* Sidebar */}
      <Sidebar />



      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6 transition-all duration-300 ease-in-out">
          <Outlet />
      </main>
    </div>
  )
}

export default Dashboard
