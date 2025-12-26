import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Restaurant } from '../../services/restaurant.js';
import { Clock9 } from 'lucide-react';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/restaurant/${restaurant.slug}`);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 group"
            onClick={handleClick}>
            <div className="relative overflow-hidden">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            </div>
            <div className="p-4">
                {/* Row 1: Shop Name, Cuisine, Delivery Time (right-aligned) */}
                <div className="flex justify-between items-baseline mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{restaurant.name}</h3>
                        <p className="text-gray-600 text-sm">{restaurant.cuisine?.name}</p>
                    </div>
                    {restaurant.deliveryInfo?.estimatedDeliveryTime && (
                        <p className="text-gray-700 text-sm flex items-center">
                            <Clock9 size={14} className="mr-1" />
                            {restaurant.deliveryInfo.estimatedDeliveryTime} min
                        </p>
                    )}
                </div>

                {/* Row 2: Est Deli Charges | Rating */}
                <div className="flex items-center text-sm text-gray-700 mt-2">
                    {restaurant.deliveryInfo?.deliveryCost !== undefined && (
                        <span className="flex items-center mr-2">
                            <span className="font-semibold">${restaurant.deliveryInfo.deliveryCost.toFixed(2)}</span>
                            <span className="ml-1">delivery</span>
                        </span>
                    )}
                    {restaurant.deliveryInfo?.deliveryCost !== undefined && restaurant.rating !== undefined && (
                        <span className="text-gray-300 mx-2">|</span>
                    )}
                    {restaurant.rating !== undefined && (
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-semibold">{restaurant.rating.toFixed(1)}</span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
