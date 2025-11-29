import React from 'react';
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

const ValuePropositions = () => {
    const propositions = [
      { icon: <FiTruck />, title: 'Free Shipping', subtitle: 'On orders over $50' },
      { icon: <FiShield />, title: 'Secure Payments', subtitle: '100% Safe & Secure' },
      { icon: <FiRefreshCw />, title: '30-Day Returns', subtitle: 'Easy returns policy' },
      { icon: <FiHeadphones />, title: '24/7 Support', subtitle: 'We are here to help' },
    ];

    return (
      <div className="bg-gray-50">
        <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-4">
            {propositions.map((prop) => (
              <div key={prop.title} className="flex items-center sm:items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white text-2xl">
                    {prop.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">{prop.title}</p>
                  <p className="text-sm text-gray-500">{prop.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default ValuePropositions;