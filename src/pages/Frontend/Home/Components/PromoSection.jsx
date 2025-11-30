import React from 'react';

const PromoSection = () => (
    <div className="bg-amber-600 my-12 h-full font-family 'Poppins', sans-serif rounded-lg shadow-md">
      <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">New Arrivals</span>
          <span className="block">Check out the latest collection.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a href="/product" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-500 bg-white hover:bg-indigo-50">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
);

export default PromoSection;