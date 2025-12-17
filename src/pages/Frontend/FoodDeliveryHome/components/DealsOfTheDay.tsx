import React from 'react';
import { Button } from '../../../../components/ui/button.js';

const DealsOfTheDay = () => {
    return (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 text-white mb-10 md:mb-0 text-center md:text-left">
                        <h2 className="text-5xl font-extrabold mb-4">First-Time User?</h2>
                        <p className="text-2xl mb-8">Enjoy <span className="font-bold text-yellow-300">20% OFF</span> on your first order!</p>
                        <Button variant="default" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full px-10 py-6 text-lg font-bold">
                            Claim Your Discount
                        </Button>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img src="/img/shopping-1.jpg" alt="Deals" className="rounded-lg shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealsOfTheDay;
