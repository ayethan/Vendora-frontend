import React, { useState } from 'react';
import { FiEye, FiShoppingCart } from 'react-icons/fi';
import ProductModel from'./ProductModel.js';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCart } from '../store/userSlice.js';
import axios from 'axios';
import { type Product } from '../services/product.js';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [showModel, setShowModel] = useState(false);
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModelOpen = () => {
    setShowModel(true);
  };

  const handleModelClose = () => {
    setShowModel(false);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add items to your cart.");
      navigate('/signin');
      return;
    }
    try {
      const response = await axios.post('/cart/add',{
        productId: product._id,
        quantity: 1,
        withCredentials: true
      });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setCart(response.data.cart));
      }
    } catch (error) {
      toast.error("Failed to add to cart.");
      console.error(error);
    }
  };

  const [showFullDescription, setShowFullDescription] = useState(false);
  const DESCRIPTION_CHAR_LIMIT = 100;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    if (!product || !product.description) return null;

    if (product.description.length <= DESCRIPTION_CHAR_LIMIT) {
      return (
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      );
    }

    const truncatedDescription =
      product.description.substring(0, DESCRIPTION_CHAR_LIMIT) + '...';
    return (
      <div>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{
            __html: showFullDescription
              ? product.description
              : truncatedDescription,
          }}
        ></div>
        <button
          onClick={toggleDescription}
          className="text-blue-600 hover:text-blue-800 font-semibold mt-2"
        >
          {showFullDescription ? 'Show Less' : 'Read More'}
        </button>
      </div>
    );
  };

 return (
  <div className="bg-white rounded-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 " key={product._id}>
    <div className="relative">
      <Link to={`/product/${product.slug}`}>
        <div className="w-full h-56 overflow-hidden">
          <img src={product.featured_image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      </Link>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
        <button onClick={handleModelOpen} className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-200 transition-colors">
          <FiEye className="w-5 h-5" />
        </button>
      </div>
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <Link to={`/product/${product.slug}`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
      </Link>
      <div className="text-sm text-gray-600 mb-4 flex-grow">
        {renderDescription()}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center">
          <p className={`text-xl font-bold ${product.selling_price ? 'text-red-500' : 'text-gray-800'}`}>
            ${product.selling_price ? product.selling_price.toFixed(2) : product.price.toFixed(2)}
          </p>
          {product.selling_price && (
            <p className="text-gray-500 line-through ml-2">${product.price.toFixed(2)}</p>
          )}
        </div>
        <button onClick={handleAddToCart} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
          <FiShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
    <ProductModel show={showModel} onClose={handleModelClose} product={product} />
  </div>
  )
};

export default ProductCard;