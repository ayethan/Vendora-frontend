import axios from 'axios';
import { ChevronDown, LogIn, MapPin, ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { React, useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../store/userSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const dispatch = useDispatch();
  const loction = false;
  const user = useSelector((state) => state.user.user)
  const userData = user;
  const [showUserCard, setShowUserCard] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowUserCard(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      const response = await axios.get('/signout', { withCredentials: true }); //use get method

      if (response.data.success) {
        dispatch(logout());
        navigate("/signin");
        toast.success("Logout successful!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed.");
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white py-8 shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/"><h1 className="font-bold text-3xl"><span className="text-red-500 font-serif">V</span>endora</h1>
          </Link>
          {/* Location */}
          <div className="flex gap-1 cursor-pointer text-gray-700 items-center ml-8">
            <MapPin className="text-red-500"/>
            <span className="font-semibold">{loction ? <div>loction</div> : "Add address"}</span>
            <ChevronDown className="ml-1" size={14} />
          </div>
        </div>

        {/* Desktop: Search, Location, Nav */}
        <div className="w-2xl hidden md:flex items-center gap-8">

          {/* Search Section */}
          <div className="flex max-w-auto flex-1">
            <div className="w-full flex border border-gray-300 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="flex-1 px-4 py-3 focus:outline-none"
              />
              <Search className="mt-3 mr-5"/>
              {/* <button className="bg-red-500 px-4 flex items-center justify-center text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button> */}
            </div>
          </div>
        </div>

        {/* Desktop Nav Icons & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-4">
            <ul className="flex gap-7 items-center text-xl font-semibold">
              {/* <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'}>Home</NavLink></li> */}
              <li><NavLink to="/product" className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'}>Product</NavLink></li>
              <li><NavLink to="/about" className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'}>About</NavLink></li>
              <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'}>Contact</NavLink></li>
            </ul>
          </nav>

          {/* Cart and User Icons */}
          <div className="flex items-center gap-4">
            <Link to="/card" className="relative flex items-center gap-2 text-gray-700 hover:text-black">
              <ShoppingCart size={24} />
              <span className="sr-only">Cart</span>
            </Link>
            {userData && userData.name ? (
              <div className="relative" ref={cardRef}>
                <button onClick={() => setShowUserCard((s) => !s)} className="flex items-center p-1 rounded hover:bg-gray-100">
                  <User className="cursor-pointer" size={24}/>
                  <ChevronDown className="ml-1" size={20} />
                </button>
                {showUserCard && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-lg z-50">
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Panel</Link>
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/signin">
                <User className="cursor-pointer" size={24}/>
              </NavLink>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
            {/* Mobile Search */}
            <div className="w-full flex border border-gray-300 rounded-md overflow-hidden mb-4">
              <input type="text" placeholder="Search..." className="flex-1 px-4 py-2 focus:outline-none"/>
              <button className="bg-red-500 px-4 flex items-center justify-center text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8" strokeWidth="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2"/></svg>
              </button>
            </div>
            {/* Mobile Nav Links */}
            <NavLink to="/" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-red-500 bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`}>Home</NavLink>
            <NavLink to="/product" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-red-500 bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`}>Product</NavLink>
            <NavLink to="/about" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-red-500 bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-red-500 bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`}>Contact</NavLink>
            {/* Mobile Location */}
            <div className="flex gap-1 cursor-pointer text-gray-700 items-center px-3 py-2">
              <MapPin className="text-red-500"/>
              <span className="font-semibold">{loction ? <div>loction</div> : "Add address"}</span>
              <ChevronDown className="ml-1" size={14} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
