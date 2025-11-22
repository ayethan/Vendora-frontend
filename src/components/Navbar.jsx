import { MapPin } from 'lucide-react';
import React from 'react'
import { FaCaretDown } from 'react-icons/fa';
import { RiAccountCircleFill } from "react-icons/ri";

import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const loction = false;
  const user = useSelector((state) => state.user.user)
  const userData = user;
  console.log("User Data in Navbar:", userData);
  return (
    <div className="bg-white py-5 shadow-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="gap-7 flex items-center">
          <Link to="/"><h1 className="font-bold text-3xl"><span className="text-red-500 font-serif">E</span>commerce</h1>
          </Link>
          <div className="flex gap-1 cursor-pointer text-gray-700 items-center">
            <MapPin className="text-red-500"/>
            <span className="font-semibold">{loction ? <div>loction</div> : "Add address"}</span>
            <FaCaretDown />
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
            {userData && userData.name ? (

            <NavLink to="/signin" className={({ isActive }) => isActive ? 'border-b-3 transaction-all border-red-500' : 'text-black'}><li className="flex items-center"><RiAccountCircleFill />{userData?.name}</li></NavLink>
            ) :
            <NavLink to="/signin" className={({ isActive }) => isActive ? 'border-b-3 transaction-all border-red-500' : 'text-black'}><li>Login</li></NavLink>
            }

          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
