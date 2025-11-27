import axios from 'axios';
import { ChevronDown, LogIn, MapPin, User } from 'lucide-react';
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
    <div className="bg-white py-5 shadow-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="gap-7 flex items-center">
          <Link to="/"><h1 className="font-bold text-3xl"><span className="text-red-500 font-serif">V</span>endora</h1>
          </Link>
          <div className="flex gap-1 cursor-pointer text-gray-700 items-center">
            <MapPin className="text-red-500"/>
            <span className="font-semibold">{loction ? <div>loction</div> : "Add address"}</span>
            <ChevronDown className="ml-1" size={14} />
          </div>
        </div>
        {/* Nav Section */}
        <nav>
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <NavLink to="/" className={({ isActive }) => isActive ? 'border-b-3 transaction-all border-red-500' : 'text-black'}><li>Home</li></NavLink>
            <NavLink to="/product" className={({ isActive }) => isActive ? 'border-b-3 transaction-all border-red-500' : 'text-black'}><li>Product</li></NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'border-b-3 transaction-all border-red-500' : 'text-black'}><li>About</li></NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'border-b-3 transaction-all border-red-500' : 'text-black'}><li>Contact</li></NavLink>
            <NavLink to="/card" className={({ isActive }) => isActive ? 'border-b-3 transaction-all border-red-500' : 'text-black'}><li>Cart</li></NavLink>
            {
              userData && userData.name ?

              // user icon with dropdown card (click )
              <li className="relative" ref={cardRef} onClick={() => setShowUserCard(true)} >
                <button
                  onClick={() => setShowUserCard((s) => !s)}
                  className="flex items-center p-1 rounded hover:bg-gray-100"
                  aria-expanded={showUserCard}
                  aria-haspopup="true"
                >
                  <User className="cursor-pointer" size={30}/>
                  <ChevronDown className="ml-1" size={20} />
                </button>

                {showUserCard && (
                  <div className="absolute right-0 mt-2 w-44 bg-white  rounded shadow-lg z-50">
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Admin Panel</Link>
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Account</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>

             :
              <NavLink to="/signin" className=""><li><User className="cursor-pointer" size={30}/></li></NavLink>
            }

          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
