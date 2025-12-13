import React from 'react';
import { FiSmartphone, FiSearch, FiTruck } from 'react-icons/fi';

const HowItWorks = () => {
    const steps = [
        {
            icon: <FiSearch />,
            title: 'Find your food',
            description: 'Discover restaurants by location, cuisine, or dish.',
        },
        {
            icon: <FiSmartphone />,
            title: 'Place your order',
            description: 'Select your items and place your order easily online.',
        },
        {
            icon: <FiTruck />,
            title: 'Get it delivered',
            description: 'Your food will be delivered fast and fresh to your door.',
        },
    ];

    return (
        <div className="bg-white py-16">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg">
                            <div className="p-4 rounded-full bg-orange-100 text-orange-500 text-4xl mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
