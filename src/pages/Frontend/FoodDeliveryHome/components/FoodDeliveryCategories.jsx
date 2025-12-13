import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPizzaSlice, FaHamburger, FaIceCream, FaCarrot, FaCoffee, FaFish } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';

const foodCategoriesData = [
    {id: 1, name: 'Pizza', icon: <FaPizzaSlice /> },
    {id: 2, name: 'Burgers', icon: <FaHamburger /> },
    {id: 3, name: 'Sushi', icon: <FaFish /> },
    {id: 4, name: 'Desserts', icon: <FaIceCream /> },
    {id: 5, name: 'Drinks', icon: <FaCoffee /> },
    {id: 6, name: 'Healthy', icon: <FaCarrot /> },
    {id: 7, name: 'Breakfast', icon: <FiSun /> },
    {id: 8, name: 'Dinner', icon: <FiMoon /> },
];

const FoodCategoryCard = ({ category, onCategoryClick }) => (
    <div
        className="group bg-white p-6 rounded-xl shadow-md text-center hover:bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
        onClick={() => onCategoryClick(category.name)}
    >
        <div className="text-5xl text-red-500 group-hover:text-white transition-colors duration-300">
            {category.icon}
        </div>
        <span className="mt-4 text-base font-semibold text-gray-800 group-hover:text-white transition-colors duration-300 block">{category.name}</span>
    </div>
);

const FoodDeliveryCategories = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryName) => {
        navigate(`/product?category=${categoryName}`);
    };

    return (
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">What are you craving?</h2>
            <p className="text-lg text-center text-gray-600 mb-12">Choose from a wide variety of cuisines.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {foodCategoriesData.map((category) => (
                    <FoodCategoryCard
                        key={category.id}
                        category={category}
                        onCategoryClick={handleCategoryClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default FoodDeliveryCategories;
