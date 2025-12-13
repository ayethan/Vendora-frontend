// import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setCart } from '../../../store/userSlice.ts';
import CartPage from './CartPage';

const Index = () => {
  const navigate = useNavigate();
  const { cart, user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const token = user?.token;

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
    <CartPage
    cart={cart}
    handleUpdateQuantity={handleUpdateQuantity}
    handleRemoveItem={handleRemoveItem}
    calculateSubtotal={calculateSubtotal}
    navigate={navigate}
    />

  );
};

export default Index;