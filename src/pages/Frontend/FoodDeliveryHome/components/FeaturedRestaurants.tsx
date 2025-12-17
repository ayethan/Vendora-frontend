import React, { useEffect, useState } from 'react';
import restaurantService, { type Restaurant } from '../../../../services/restaurant.js';
import { FiGrid, FiList } from 'react-icons/fi';
import RestaurantCard from '../../../../components/Restaurant/RestaurantCard.js';
import RestaurantRowCard from '../../../../components/Restaurant/RestaurantRowCard.js';

const FeaturedRestaurants = () => {
    const [view, setView] = useState('grid');
    const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);


    const fetchRestaurantData = async () => {
        try {
            const data = await restaurantService.getRestaurants();
            console.log(data);
            setRestaurantData(data);
            return data;
        } catch (error) {
            console.error('Error fetching restaurant data:', error);
            return null;
        }
    }

    useEffect(() => {
        fetchRestaurantData();
    },[])

    return (
        <div className="bg-gray-100 py-20">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900">Featured Restaurants</h2>
                        <p className="text-lg text-gray-600 mt-2">Discover the best food from the top-rated restaurants in your area.</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-6 md:mt-0">
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Sort by: Rating</option>
                            <option>Sort by: Delivery Time</option>
                            <option>Sort by: Newest</option>
                        </select>
                        <div className="flex space-x-2">
                            <button onClick={() => setView('grid')} className={`p-2 rounded-md ${view === 'grid' ? 'bg-red-500 text-white' : 'bg-white'}`}>
                                <FiGrid size={20} />
                            </button>
                            <button onClick={() => setView('list')} className={`p-2 rounded-md ${view === 'list' ? 'bg-red-500 text-white' : 'bg-white'}`}>
                                <FiList size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`grid ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12' : 'gap-4'}`}>
                    {restaurantData.map((restaurant) => (
                        view === 'grid' ? (
                            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                        ) : (
                            <RestaurantRowCard key={restaurant._id} restaurant={restaurant} />
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedRestaurants;
