import React from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import HowItWorks from './components/HowItWorks';
import FoodDeliveryCategories from './components/FoodDeliveryCategories';
import DealsOfTheDay from './components/DealsOfTheDay';
import FeaturedRestaurants from './components/FeaturedRestaurants';

function FoodDeliveryHome() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative bg-cover bg-center h-[600px]" style={{ backgroundImage: "url('/img/cover-image.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-6xl font-extrabold text-center mb-6">Food, Delivered.</h1>
          <p className="text-2xl text-center mb-10">Order from the best restaurants near you.</p>
          <div className="flex w-full max-w-xl bg-white rounded-full shadow-2xl p-2">
            <Input
              type="text"
              placeholder="Enter your delivery address"
              className="flex-grow bg-transparent border-none text-lg text-gray-800 focus:ring-0"
            />
            <Button type="submit" variant="default" className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 text-lg">
              Find Food
            </Button>
          </div>
          <p className="mt-4 text-sm">
            Or{' '}
            <button className="underline hover:text-red-300 transition-colors">
              use my current location
            </button>
          </p>
        </div>
      </div>
      <HowItWorks />
      <FoodDeliveryCategories />
      <DealsOfTheDay />
      <FeaturedRestaurants />
    </div>
  );
}

export default FoodDeliveryHome;
