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
  const DESCRIPTION_WORD_LIMIT = 9;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    if (!product || !product.description) return null;

    const words = product.description.split(/\s+/); // Split by whitespace to get words
    const needsTruncation = words.length > DESCRIPTION_WORD_LIMIT;

    const truncatedDescription = needsTruncation
      ? words.slice(0, DESCRIPTION_WORD_LIMIT).join(' ') + '...'
      : product.description;

    return (
      <div>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{
            __html: showFullDescription || !needsTruncation
              ? product.description
              : truncatedDescription,
          }}
        ></div>
        {/* {needsTruncation && (
          <button
            onClick={toggleDescription}
            className="text-blue-600 hover:text-blue-800 font-semibold mt-2"
          >
            {showFullDescription ? 'Less' : 'More'}
          </button>
        )} */}
      </div>
    );
  };

 return (
  <div className="bg-white border-1 rounded-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row min-h-[150px]" key={product._id}>
      <div onClick={handleModelOpen} className="p-4 flex flex-col justify-between md:w-2/3 flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
          <div className="flex items-center mb-2">
            <p className={`text-xl ${product.selling_price ? 'text-red-500' : 'text-gray-800'}`}>
              ${product.selling_price ? product.selling_price.toFixed(2) : product.price.toFixed(2)}
            </p>
            {product.selling_price && (
              <p className="text-gray-500 line-through ml-2">${product.price.toFixed(2)}</p>
            )}
        </div>
        <div className="text-sm text-gray-600 mb-4 flex-grow">
          {renderDescription()}
        </div>

      </div>
    </div>

    <div className="relative md:w-1/3 h-48 md:h-full pt-4 md:pt-0">
      <div className="w-full h-full overflow-hidden flex items-center justify-center">
        <img src={product.featured_image} alt={product.name} className="w-28 h-28 rounded-lg"/>
      </div>
      <div className="absolute inset-0 flex items-center justify-center space-x-4">
        <div className="flex mt-15">
          <button onClick={handleAddToCart} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
            <FiShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    <ProductModel show={showModel} onClose={handleModelClose} product={product} />
  </div>
  )
};

export default ProductCard;