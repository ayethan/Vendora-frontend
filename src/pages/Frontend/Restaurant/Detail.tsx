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
    const [isInfoVisible, setIsInfoVisible] = useState(false);

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
                    <p className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: restaurant.description }}></p>

                    <div className="flex items-center text-yellow-500 mb-6">
                        <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xl font-bold">{restaurant.rating}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <button
                            onClick={() => setIsInfoVisible(!isInfoVisible)}
                            className="w-full flex justify-between items-center text-left focus:outline-none"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">Additional Information</h2>
                            <svg
                                className={`w-6 h-6 transform transition-transform ${isInfoVisible ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {isInfoVisible && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <div className="sticky top-0 bg-white z-10 shadow-md mb-6">
                    <nav className="container mx-auto flex justify-left space-x-6 p-4">
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
    );
};

export default RestaurantDetail;
