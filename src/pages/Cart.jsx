// import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setCart } from '../store/userSlice';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const token = user?.token;

  // const fetchCart = async () => {
  //   try {
  //     const response = await axios.get('/cart', {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     if (response.data.success) {
  //       dispatch(setCart(response.data.cart));
  //     }
  //   } catch (error) {
  //     toast.error('Failed to fetch cart.');
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     fetchCart();
  //   }
  // }, [token]);

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const response = await axios.put(`/cart/update/${productId}`, { quantity }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        dispatch(setCart(response.data.cart));
      }
    } catch (error) {
      toast.error('Failed to update quantity.');
      console.error(error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(`/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setCart(response.data.cart));
      }
    } catch (error) {
      toast.error('Failed to remove item.');
      console.error(error);
    }
  };

  const calculateSubtotal = () => {
    if (!cart || !cart.items) return '0.00';
    return cart.items.reduce((acc, item) => acc + parseFloat(item.productId.price) * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4 my-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      {cart && cart.items && cart.items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-lg">
              {cart.items.map(item => (
                <div key={item.productId._id} className="flex items-center p-4 border-b">
                  <img src={item.productId.featured_image} alt={item.productId.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                  <div className="flex-grow">
                    <Link to={`/product/${item.productId._id}`} className="text-lg font-semibold hover:text-blue-600">{item.productId.name}</Link>
                    <p className="text-gray-600">${parseFloat(item.productId.price).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center mx-4">
                    <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)} className="p-2 rounded-full hover:bg-gray-200"><FiMinus /></button>
                    <span className="mx-4 text-lg font-semibold">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)} className="p-2 rounded-full hover:bg-gray-200"><FiPlus /></button>
                  </div>
                  <div className="text-lg font-bold mx-4">
                    ${(parseFloat(item.productId.price) * item.quantity).toFixed(2)}
                  </div>
                  <button onClick={() => handleRemoveItem(item.productId._id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-gray-200">
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="border-t my-4"></div>
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <button onClick={() => navigate('/checkout')} className="bg-blue-600 text-white w-full py-3 mt-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;