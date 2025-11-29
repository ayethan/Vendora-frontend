import React, { useState } from 'react';
import { FiEye, FiShoppingCart } from 'react-icons/fi';
import ProductModel from'./ProductModel';

const ProductCard = ({ product }) => {
  const [showModel, setShowModel] = useState(false);

  const handleModelOpen = () => {
    setShowModel(true);
  };

  const handleModelClose = () => {
    setShowModel(false);
  };



 return (<div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300 relative">
    <div className="w-full h-55 overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gray-100/50 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
        <button onClick={handleModelOpen} className="bg-white text-indigo-600 p-3 rounded-full hover:bg-indigo-500 hover:text-white transition-colors cursor-pointer">
          <FiEye className="w-5 h-5" />
        </button>
        <button className="bg-white text-indigo-600 p-3 rounded-full hover:bg-indigo-500 hover:text-white transition-colors cursor-pointer">
          <FiShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-2 truncate">{product.name}</h3>
      <div className="flex items-center justify-between">
        <p className={product.selling_price ? 'text-indigo-400 text-xl line-through': 'text-indigo-600 font-semibold text-xl'}> ${product.price.toFixed(2)} </p>
        <p className="text-indigo-600 font-semibold text-xl">${product.selling_price.toFixed(2)}</p>
      </div>
    </div>
    <ProductModel show={showModel} onClose={handleModelClose} product={product} />
  </div>
  )
};

export default ProductCard;