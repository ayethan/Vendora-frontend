import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import restaurantService, { type Restaurant } from '../../../services/restaurant.js';
import RestaurantCard from '../../../components/Restaurant/RestaurantCard.js';
import RestaurantRowCard from '../../../components/Restaurant/RestaurantRowCard.js';
import { FiGrid, FiList } from 'react-icons/fi';

const RestaurantList = () => {
    const [view, setView] = useState('grid');
    const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams();

    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    useEffect(() => {
        const fetchRestaurantData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await restaurantService.getfrontendRestaurants({ lat, lon });
                setRestaurantData(data);
            } catch (err) {
                console.error('Error fetching restaurant data:', err);
                setError('Failed to fetch restaurants. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantData();
    }, [lat, lon]);

    return (
        <div className="bg-gray-100 py-20">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900">All Restaurants</h2>
                        <p className="text-lg text-gray-600 mt-2">
                            Discover the best food from the top-rated restaurants in your area.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-6 md:mt-0">
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Sort by: Rating</option>
                            <option>Sort by: Delivery Time</option>
                            <option>Sort by: Newest</option>
                        </select>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setView('grid')}
                                className={`p-2 rounded-md ${
                                    view === 'grid' ? 'bg-red-500 text-white' : 'bg-white'
                                }`}
                            >
                                <FiGrid size={20} />
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={`p-2 rounded-md ${
                                    view === 'list' ? 'bg-red-500 text-white' : 'bg-white'
                                }`}
                            >
                                <FiList size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                {loading && <div className="text-center col-span-full">Loading restaurants...</div>}
                {error && <div className="text-center col-span-full text-red-500">{error}</div>}
                {!loading && !error && (
                    <>
                        {restaurantData.length === 0 ? (
                            <div className="text-center col-span-full">
                                <h3 className="text-2xl font-semibold text-gray-700">No restaurants found near you</h3>
                                <p className="text-gray-500 mt-2">Try a different location or check back later.</p>
                            </div>
                        ) : (
                            <div
                                className={`grid ${
                                    view === 'grid'
                                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'
                                        : 'gap-4'
                                }`}
                            >
                                {restaurantData.map((restaurant) =>
                                    view === 'grid' ? (
                                        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                                    ) : (
                                        <RestaurantRowCard key={restaurant._id} restaurant={restaurant} />
                                    )
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default RestaurantList;
