import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCart } from '../store/userSlice.js';
import axios from 'axios';
import { type Product } from '../services/product.js';

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
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedFlavour, setSelectedFlavour] = useState<string | null>(null);

  useEffect(() => {
    if (product?.flavours && product.flavours.length > 0) {
      const defaultFlavour = product.flavours.find(f => f.is_default);
      if (defaultFlavour) {
        setSelectedFlavour(defaultFlavour.name);
      }
    }
  }, [product]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset'; // Cleanup on unmount
    };
  }, [show]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to your cart.");
      navigate('/signin');
      onClose();
      return;
    }
    try {
      const response = await axios.post('/cart/add', {
        productId: product._id,
        quantity: quantity,
        addons: selectedAddons,
        flavour: selectedFlavour,
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

  const handleAddonchange = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateTotalPrice = () => {
    let total = product.price ? product.price: product.selling_price;

    selectedAddons.forEach(selectedAddonId => {
      const addon = product.addons?.find(a => a._id === selectedAddonId);
      if (addon && addon.price) {
        total += addon.price;
      }
    });

    // Add flavour extra price
    if (selectedFlavour) {
      const flavour = product.flavours?.find(f => f.name === selectedFlavour);
      if (flavour?.extra_price) {
        total += flavour.extra_price;
      }
    }

    return (total * quantity).toFixed(2);
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
    show && <div key={product.name} className="fixed w-full h-full bg-gray-900/50 bg-opacity-35 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog" tabIndex={-1}>
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative transform transition-all duration-300 scale-100 opacity-100 my-8 max-h-[90vh] flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-gray-600 text-white hover:text-gray-300 text-3xl font-bold cursor-pointer rounded-full p-1 leading-none"
            aria-label="Close"
          >
            <IoCloseOutline size={28} />
          </button>

          {/* Header Section (fixed) */}
          <div className="flex-1 overflow-y-auto">
            <div className="w-full flex-shrink-0 mb-4">
                <img src={product.featured_image} alt={product.name} className="w-full h-64 md:h-80 object-cover" />
              </div>
            <div className="p-6 pb-2 border-b border-gray-200">


              {/* Product Image */}

              <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
              {/* Price Display */}
              <div className="flex items-baseline mb-4">
                {product.selling_price && product.selling_price > 0 && (
                  <p className="text-gray-500 line-through mr-3">${product.selling_price.toFixed(2)}</p>
                )}
                <p className="text-red-600 font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div className="mb-4">
                {renderDescription()}
              </div>


            </div>

          {/* Scrollable Content Section */}
            <div className="flex-1 px-6 pt-4">

              {/* Flavours - moved here */}
              {product.flavours && product.flavours.length > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Flavours</h3>
                  {product.flavours.map(flavour => (
                    <div key={flavour.name} className="flex justify-between items-center mb-1">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="flavour"
                          value={flavour.name}
                          checked={selectedFlavour === flavour.name}
                          onChange={() => setSelectedFlavour(flavour.name)}
                          className="mr-2 accent-blue-600"
                        />
                        {flavour.name}
                      </label>
                      {flavour.extra_price > 0 && (
                        <span>+${flavour.extra_price.toFixed(2)}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add-ons - moved here */}
              {product.addons && product.addons.length > 0 && (
                <div className="mb-4 pb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Frequently bought together</h3>
                  {product.addons.filter(addon => addon && addon.price !== undefined).map(addon => (
                    <div key={addon._id} className="flex justify-between items-center mb-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="addon"
                          value={addon._id}
                          checked={selectedAddons.includes(addon._id)}
                          onChange={() => handleAddonchange(addon._id)}
                          className="mr-2 accent-blue-600"
                        />
                        {addon.name}
                      </label>
                      <span>+${addon.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>


          {/* Sticky Footer Section */}
          <div className="sticky bottom-0 bg-white p-6 pt-4 border-t border-gray-200 z-10">
            <div className="flex items-center justify-between">
              {/* Quantity Selector - moved here */}
              <div className="flex items-center py-3 bg-gray-100 rounded-md">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-5 rounded-full text-lg hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-5">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-5 rounded-full text-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <div>
                <button onClick={handleAddToCart} className="flex items-center justify-center bg-red-600 text-white text-lg font-semibold px-20 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300">
                  <FiShoppingCart className="mr-2" /> Add to Cart &nbsp;${calculateTotalPrice()}
                </button>

              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ProductModel
