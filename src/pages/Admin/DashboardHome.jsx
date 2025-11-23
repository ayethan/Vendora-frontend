import React from 'react';

function DashboardHome() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of your store</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm">Create Product</button>
          <button className="px-3 py-2 border rounded-md text-sm">Settings</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-600">Total Products</h2>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-600">Total Orders</h2>
          <p className="text-2xl font-bold mt-2">50</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-600">Pending Orders</h2>
          <p className="text-2xl font-bold mt-2">15</p>
        </div>
      </div>

      <section className="mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-700">Recent Activity</h3>
          <p className="text-sm text-gray-500 mt-2">No recent activity to show.</p>
        </div>
      </section>
    </>
  );
}

export default DashboardHome;