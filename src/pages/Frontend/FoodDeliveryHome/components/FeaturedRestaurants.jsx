import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



import { FiGrid, FiList } from 'react-icons/fi';

const featuredRestaurantsData = [
    {
        id: 1,
        name: 'The Great Burger',
        cuisine: 'American',
        rating: 4.5,
        imageUrl: '/img/food-deli-1.jpg',
        deliveryTime: '20-30 min',
        promotion: '20% OFF',
    },
    {
        id: 2,
        name: 'Pizza Palace',
        cuisine: 'Italian',
        rating: 4.8,
        imageUrl: '/img/food-deli-2.jpg',
        deliveryTime: '25-35 min',
    },
    {
        id: 3,
        name: 'Sushi Central',
        cuisine: 'Japanese',
        rating: 4.2,
        imageUrl: '/img/gr-stocks-q8P8YoR6erg-unsplash.jpg',
        deliveryTime: '30-40 min',
        promotion: 'Free Delivery',
    },
    {
        id: 4,
        name: 'Taco Haven',
        cuisine: 'Mexican',
        rating: 4.6,
        imageUrl: '/img/igor-bumba-rkaahInFlBg-unsplash.jpg',
        deliveryTime: '20-30 min',
    },
    {
        id: 5,
        name: 'Curry House',
        cuisine: 'Indian',
        rating: 4.3,
        imageUrl: '/img/marjan-blan-4Qyq-yLO_Fw-unsplash.jpg',
        deliveryTime: '35-45 min',
        promotion: '10% OFF',
    },
    {
        id: 6,
        name: 'Vegan Delights',
        cuisine: 'Vegan',
        rating: 4.7,
        imageUrl: '/img/road-trip-with-raj-aa4sXii77zI-unsplash.jpg',
        deliveryTime: '25-35 min',
    },
];

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/restaurant/${restaurant.id}`);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 group"
            onClick={handleClick}
        >
            <div className="relative overflow-hidden">
                <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                {restaurant.promotion && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold p-2 rounded-br-lg">
                        {restaurant.promotion}
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{restaurant.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                <div className="flex items-center justify-between text-sm text-gray-800">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                        <span>{restaurant.rating}</span>
                    </div>
                    <span>{restaurant.deliveryTime}</span>
                </div>
            </div>
        </div>
    );
};

const RestaurantRowCard = ({ restaurant }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/restaurant/${restaurant.id}`);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex items-center transform hover:scale-105 transition-transform duration-300 group"
            onClick={handleClick}
        >
            <div className="relative w-48 h-32 overflow-hidden">
                <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                {restaurant.promotion && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold p-2 rounded-br-lg">
                        {restaurant.promotion}
                    </div>
                )}
            </div>
            <div className="p-4 flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{restaurant.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                <div className="flex items-center justify-between text-sm text-gray-800">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                        <span>{restaurant.rating}</span>
                    </div>
                    <span>{restaurant.deliveryTime}</span>
                </div>
            </div>
        </div>
    );
};

const FeaturedRestaurants = () => {
    const [view, setView] = useState('grid');

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
                    {featuredRestaurantsData.map((restaurant) => (
                        view === 'grid' ? (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ) : (
                            <RestaurantRowCard key={restaurant.id} restaurant={restaurant} />
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedRestaurants;
