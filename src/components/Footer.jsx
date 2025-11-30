import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

const Footer = memo(() => (
  <footer className="bg-gray-950 text-white">
    <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Top section with links and newsletter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Links Section */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/solutions/marketing" className="text-base text-gray-300 hover:text-white">Marketing</a></li>
              <li><a href="/solutions/analytics" className="text-base text-gray-300 hover:text-white">Analytics</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/pricing" className="text-base text-gray-300 hover:text-white">Pricing</a></li>
              <li><a href="/contact" className="text-base text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Subscribe to our newsletter</h3>
          <p className="mt-4 text-base text-gray-300">The latest news, articles, and resources, sent to your inbox weekly.</p>
          <form className="mt-4 sm:flex sm:max-w-md">
            <input type="email" name="email-address" id="email-address" autoComplete="email" required className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400" placeholder="Enter your email" />
            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button type="submit" className="w-full bg-white flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-red-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                Subscribe
              </button>
            </div>
          </form>
        </div>

         <div className="flex">
            <div className="flex items-center justify-center md:justify-end space-x-4">
                <span className="text-sm font-semibold text-gray-400 tracking-wider uppercase">We Accept:</span>
                {/* Replace with actual images/icons */}
                <img src="https://img.icons8.com/color/48/000000/stripe.png" alt="Stripe" className="h-8 bg-white rounded-md p-1" />
                <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" className="h-8" />
                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa/Debit" className="h-8" />
                <img src="https://img.icons8.com/color/48/000000/google-pay.png" alt="Google Pay" className="h-8" />
                <img src="https://img.icons8.com/color/48/alipay.png" alt="Alipay" className="h-8" />
            </div>
        </div>

      </div>

      {/* Bottom section with copyright and payment methods */}
      <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-center">
        <div className="flex flex-col md:flex-row md:items-center">
            <p className="text-base text-gray-400 md:order-1">&copy; 2024 Vendora, Inc. All rights reserved.</p>
            <p className="text-base text-gray-400 md:order-2"> &nbsp;|&nbsp;<NavLink >Terms of Sale </NavLink> &nbsp;|&nbsp; <NavLink> Terms of Use </NavLink> &nbsp;|&nbsp; <NavLink >Vendora Privacy</NavLink></p>
        </div>

      </div>
    </div>
  </footer>
));

export default Footer;