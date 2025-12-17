import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import restaurantService, { type Restaurant } from '../../../services/restaurant.js';
import ProductCard from '../../../components/ProductCard.js';
import { type Product } from '../../../services/product.js';

const RestaurantDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const data = await restaurantService.getRestaurantBySlug(slug);
                setRestaurant(data);
            } catch (err) {
                setError('Failed to fetch restaurant details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [slug]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!restaurant) {
        return <div className="text-center py-10">Restaurant not found.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-96 object-cover"
                />
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{restaurant.name}</h1>
                    <p className="text-gray-600 text-lg mb-2">{restaurant.cuisine?.name}</p>
                    <p className="text-gray-700 mb-6">{restaurant.description}</p>

                    <div className="flex items-center text-yellow-500 mb-6">
                        <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xl font-bold">{restaurant.rating}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold">Address:</p>
                                <p>{restaurant.address}, {restaurant.city}, {restaurant.country}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Opening Hours:</p>
                                <p>{restaurant.openingHours}</p>
                            </div>
                             <div>
                                <p className="font-semibold">Status:</p>
                                <p className={`capitalize ${restaurant.status === 'open' ? 'text-green-600' : 'text-red-600'}`}>{restaurant.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Menu</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {restaurant.products && restaurant.products.map((product: Product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail;
