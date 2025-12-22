import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import restaurantService, { type Restaurant } from '../../../services/restaurant.js';
import ProductCard from '../../../components/ProductCard.js';
import { type Product } from '../../../services/product.js';

import InfoModal from '../../../components/InfoModal.js';
import { Bike, Clock9 } from 'lucide-react';
const RestaurantDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

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

    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const categoryElements = document.querySelectorAll('.category-section');
            let currentCategory = '';
            categoryElements.forEach((element) => {
                const htmlElement = element as HTMLElement;
                if (htmlElement.getBoundingClientRect().top <= 120) {
                    currentCategory = htmlElement.id;
                }
            });
            setActiveCategory(currentCategory);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const groupProductsByCategory = (products: Product[]) => {
        return products.reduce((acc, product) => {
            const categoryName = product.category?.name || 'Other';
            if (!acc[categoryName]) {
                acc[categoryName] = [];
            }
            acc[categoryName].push(product);
            return acc;
        }, {} as Record<string, Product[]>);
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!restaurant) {
        return <div className="text-center py-10">Restaurant not found.</div>;
    }

    const groupedProducts = restaurant.products ? groupProductsByCategory(restaurant.products) : {};
    const productEntries = Object.entries(groupedProducts);

    return (
        <div className="bg-gray-50 min-h-screen pb-8">
            <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-96 object-cover"
            />
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-t-lg shadow-lg overflow-hidden -mt-20 relative z-10 ">
                    <div className="p-8">
                        <div className="flex items-center mb-4 gap-4">
                            <h1 className="text-4xl font-bold text-gray-900">{restaurant.name}</h1>
                            <h3 className="text-gray-600 text-lg">({restaurant.cuisine?.name})</h3>
                        </div>

                        <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center text-gray-700 gap-x-4 gap-y-3 text-sm mb-2 pt-3">
                            <div className="flex items-center gap-1">
                                <Clock9 size={16} className="text-red-600"/>
                                <span>Open: {restaurant?.openingTimes[0]?.open}</span>
                                <span>-</span>
                                <span>{restaurant?.openingTimes[0]?.close}</span>
                            </div>
                            <div className="hidden md:block text-gray-300">|</div>
                            <div className="flex items-center gap-1">
                               <Bike size={16} />Est
                               <span className="font-semibold text-gray-900">{restaurant?.deliveryInfo?.estimatedDeliveryTime} mins</span>
                            </div>
                            <div className="hidden md:block text-gray-300">|</div>
                            <div className="flex items-center gap-1">
                               <Bike size={16} />
                               <span className="font-semibold text-gray-900">${restaurant?.deliveryInfo?.deliveryCost}</span>
                            </div>
                            <div className="hidden md:block text-gray-300">|</div>
                            <div className="flex items-center gap-1">
                                <span>Min. Order:</span>
                                <span className="font-semibold text-gray-900">$300</span>
                            </div>

                            <div className="hidden md:block text-gray-300">|</div>
                            <div>
                                <button onClick={() => setIsInfoModalOpen(true)} className="text-red-500 hover:underline cursor-pointer font-semibold">
                                    Restaurant Details
                                </button>
                            </div>
                            <div className="flex-grow md:text-right">
                                <div className="flex items-center text-yellow-500 justify-start md:justify-end">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-lg font-bold text-gray-900">{restaurant.rating || 8.6}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <InfoModal
                    isOpen={isInfoModalOpen}
                    onClose={() => setIsInfoModalOpen(false)}
                    title="Restaurant Details"
                >
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Address</h3>
                            <p>{restaurant.address}, {restaurant.city}, {restaurant.country}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Opening Times</h3>
                            {restaurant.openingTimes.length === 0 && (
                                <p className="text-gray-600">No opening times available.</p>
                            )}
                            {restaurant.openingTimes.map(time => (
                                <div key={time.day} className="flex justify-between">
                                    <span>{time.day}</span>
                                    <span>{time.open} - {time.close}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Delivery Information</h3>
                            <div className="flex justify-between">
                                <span>Delivery Cost</span>
                                <span>¥{restaurant?.deliveryInfo?.deliveryCost}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Small Order Surcharge</span>
                                <span>¥{restaurant?.deliveryInfo?.smallOrderSurcharge}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Estimated Delivery Time</span>
                                <span>{restaurant?.deliveryInfo?.estimatedDeliveryTime} min</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Status</h3>
                            <p className={`capitalize ${restaurant.status === 'open' ? 'text-green-600' : 'text-red-600'}`}>{restaurant.status}</p>
                        </div>
                    </div>
                </InfoModal>

                <div className="">
                    <div className="sticky top-0 bg-white z-10 shadow-md mb-6 rounded-b-lg">
                        <nav className="container mx-auto flex justify-left space-x-6 pl-6 pr-6 py-2">
                            {productEntries.map(([category]) => (
                                <a
                                    key={category}
                                    href={`#${category}`}
                                    className={`text-lg font-semibold pb-2 ${activeCategory === category
                                        ? 'text-red-600 border-b-2 border-red-600'
                                        : 'text-gray-600 hover:text-red-600'
                                        }`}
                                >
                                    {category}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {productEntries.map(([category, products]) => (
                        <div key={category} id={category} className="category-section mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-left">{category}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.map((product: Product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail;
