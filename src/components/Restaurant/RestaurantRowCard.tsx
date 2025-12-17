import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Restaurant } from '../../services/restaurant';

const RestaurantRowCard = ({ restaurant }: { restaurant: Restaurant }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/restaurant/${restaurant.slug}`);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex items-center transform hover:scale-105 transition-transform duration-300 group"
            onClick={handleClick}
        >
            <div className="relative w-48 h-32 overflow-hidden">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                {/* {restaurant.promotion && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold p-2 rounded-br-lg">
                        {restaurant.promotion}
                    </div>
                )} */}
            </div>
            <div className="p-4 flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{restaurant.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine?.name}</p>

                <div className="flex items-center justify-between text-sm text-gray-800">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                        <span>{restaurant.rating}</span>
                    </div>
                    {/* <span>{restaurant.deliveryTime}</span> */}
                </div>
            </div>
        </div>
    );
};

export default RestaurantRowCard;
