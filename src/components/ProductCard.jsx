import React, { useState } from 'react';
import { FiEye, FiShoppingCart } from 'react-icons/fi';
import ProductModel from'./ProductModel';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [showModel, setShowModel] = useState(false);

  const handleModelOpen = () => {
    setShowModel(true);
  };

  const handleModelClose = () => {
    setShowModel(false);
  };



 return (
  <div className="bg-white rounded-sm overflow-hidden group hover:shadow-xl transition-shadow duration-300 relative" key={product._id}>
    <Link to={`/product/${product._id}`}> {/* Link for the image */}
      <div className="w-full h-55 overflow-hidden">
        <img src={product.featured_image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer" />
      </div>
    </Link>
    <div className="absolute inset-0 bg-gray-100/10 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 pointer-events-none">
      <button onClick={handleModelOpen} className="bg-white text-indigo-600 p-3 rounded-full hover:bg-indigo-500 hover:text-white transition-colors cursor-pointer pointer-events-auto">
        <FiEye className="w-5 h-5" />
      </button>
      <button className="bg-white text-indigo-600 p-3 rounded-full hover:bg-indigo-500 hover:text-white transition-colors cursor-pointer pointer-events-auto">
        <FiShoppingCart className="w-5 h-5" />
      </button>
    </div>
    <div className="p-4">
      <Link to={`/product/${product._id}`}> {/* Link for the product name */}
        <h3 className="text-lg font-medium text-gray-800 mb-2 truncate cursor-pointer">{product.name}</h3>
      </Link>
      <div className="flex items-center justify-between">
        <p className={product.selling_price ? 'text-red-400 text-xl line-through': 'text-gray-600 font-semibold text-xl'}> ${product.price.toFixed(2)} </p>
        <p className="text-gray-600 font-semibold text-xl">${product.selling_price.toFixed(2)}</p>
      </div>
    </div>
    <ProductModel show={showModel} onClose={handleModelClose} product={product} />
  </div>
  )
};

export default ProductCard;