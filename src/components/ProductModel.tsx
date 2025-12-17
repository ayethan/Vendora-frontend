import React, { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCart } from '../store/userSlice';
import axios from 'axios';
import { type Product } from '../services/product';

interface ProductModelProps {
  show: boolean;
  onClose: () => void;
  product: Product;
}

const ProductModel: React.FC<ProductModelProps> = ({show, onClose, product}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const DESCRIPTION_CHAR_LIMIT = 200;

  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to your cart.");
      navigate('/signin');
      onClose(); // close the modal
      return;
    }
    try {
      const response = await axios.post('/cart/add', {
        productId: product._id,
        quantity: 1,
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

  const renderDescription = () => {
    if (!product || !product.description) return null;

    if (product.description.length <= DESCRIPTION_CHAR_LIMIT) {
      return <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: product.description }}></div>;
    }

    const truncatedDescription = product.description.substring(0, DESCRIPTION_CHAR_LIMIT) + '...';
    return (
      <div>
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: showFullDescription ? product.description : truncatedDescription }}></div>
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
    show && <div key={product.name} className="fixed w-full h-full bg-gray-900/50 bg-opacity-35 top-0 left-0 right-0 bottom-0 z-50 overflow-auto flex items-center justify-center p-4" aria-modal="true" role="dialog" tabIndex="-1">
    <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full relative transform transition-all duration-300 scale-100 opacity-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-3xl font-bold cursor-pointer rounded-full p-1 leading-none"
          aria-label="Close"
        >
          <IoCloseOutline size={28} />
        </button>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Image */}
            <div className="md:w-1/2 flex-shrink-0">
              <img src={product.featured_image} alt={product.name} className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md" />
            </div>

            {/* Product Info (Name, Price, Add to Cart) */}
            <div className="md:w-1/2 flex flex-col">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h2>
                <div className="flex items-center mb-6">
                  {product.selling_price && (
                    <p className="text-gray-500 text-xl line-through mr-3">${product.selling_price.toFixed(2)}</p>
                  )}
                  <p className="text-red-600 font-bold text-2xl">${product.price.toFixed(2)}</p>
                </div>
              </div>
              <button onClick={handleAddToCart} className="flex items-center justify-center bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                <FiShoppingCart className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Product Description</h3>
            {renderDescription()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModel
