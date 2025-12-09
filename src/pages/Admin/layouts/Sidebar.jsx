import React from 'react'
import { Link, useLocation } from 'react-router-dom';



function Sidebar() {
  const location = useLocation();
  return (
    <aside
        className="w-64 bg-gray-800 border-r border-gray-200 p-4 flex-col flex-shrink-0 hidden md:flex">

        <nav aria-label="Main navigation" className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
        <li>
          <Link
            to="/admin"
            aria-current={location.pathname === '/admin' ? 'page' : undefined}
            className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          location.pathname === '/admin'
            ? 'bg-indigo-50 text-gray-900 font-semibold'
            : 'text-white hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white'
            }`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-8H3v8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Dashboard</span>
          </Link>
        </li>
          <li>
            <Link
              to="/admin/users"
              aria-current={location.pathname === '/admin/users' ? 'page' : undefined}
              className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            location.pathname === '/admin/users'
              ? 'bg-indigo-50 text-gray-900 font-semibold'
              : 'text-white hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white'
              }`}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 16V8a2 2 0 0 0-2-2h-4l-2-2H7a2 2 0 0 0-2 2v10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 16h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Users</span>
            </Link>
        </li>
        <li>
          <Link
            to="/admin/products"
            aria-current={location.pathname === '/admin/products' ? 'page' : undefined}
            className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          location.pathname === '/admin/products'
            ? 'bg-indigo-50 text-gray-900 font-semibold'
            : 'text-white hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white'
            }`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 16V8a2 2 0 0 0-2-2h-4l-2-2H7a2 2 0 0 0-2 2v10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 16h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Products</span>
          </Link>
        </li>


        <li>
          <Link
            to="/admin/orders"
            aria-current={location.pathname === '/admin/orders' ? 'page' : undefined}
            className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          location.pathname === '/admin/orders'
            ? 'bg-indigo-50 text-gray-900 font-semibold'
            : 'text-white hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white'
            }`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 7h18M7 7v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Orders</span>
            <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">15</span>
          </Link>
        </li>

        <li>
          <Link
            to="/admin/integrations"
            aria-current={location.pathname === '/admin/integrations' ? 'page' : undefined}
            className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
          location.pathname === '/admin/integrations'
            ? 'bg-indigo-50 text-gray-900 font-semibold'
            : 'text-white hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white'
            }`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="leading-tight text-sm">
          <div>Integrations</div>
          <div className="text-xs text-gray-500">Tools & APIs</div>
            </div>
            <span className="ml-auto bg-white text-sm text-gray-900 px-2 py-0.5 rounded-full font-semibold">New</span>
          </Link>
        </li>
          </ul>
        </nav>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2">Signed in as</div>
          <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">A</div>
        <div>
          <div className="text-sm font-medium">Admin User</div>
          <button type="button" className="text-xs text-gray-700 hover:underline">Sign out</button>
        </div>
          </div>
        </div>
      </aside>
  )
}

export default Sidebar
