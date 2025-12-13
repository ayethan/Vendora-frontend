import React, { useState, useEffect, useCallback } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setCart } from '../../../store/userSlice.ts';
import CheckoutPage from './CheckoutPage.jsx';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, cart } = useSelector(state => state.user);
  console.log("Checkout Cart:", cart);
  const [loading, setLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (stripe && elements && (cart?.total || 0) > 0) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Vendora',
          amount: (cart?.total || 0) * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestShipping: true,
        payerName: user?.name,
        payerEmail: user?.email,
        payerPhone: user?.phone,
        shippingOptions: [
          {
            id: 'standard-shipping',
            label: 'Standard Shipping',
            detail: 'Arrives in 5-7 business days',
            amount: 0,
          },
        ],
      });

      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (event) => {
        setLoading(true);
        try {
          const response = await axios.post('/create-checkout-session', {
            amount: cart?.total || 0,
            currency: 'usd',
            paymentMethodId: event.paymentMethod.id,
            userId: user._id,
            items: cart?.items,
          }, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          });

          if (response.data.success) {
            toast.success('Payment successful!');
            event.complete('success');
            dispatch(setCart({ items: [], total: 0 }));
            navigate('/checkout-success');
          } else {
            toast.error(response.data.message);
            event.complete('fail');
          }
        } catch (apiError) {
          toast.error('Payment failed: ' + (apiError.response?.data?.message || apiError.message));
          event.complete('fail');
        }
        setLoading(false);
      });
    }
  }, [stripe, elements, cart]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      try {
        const response = await axios.post('/create-checkout-session', {
          amount: cart?.total || 0,
          currency: 'usd',
          paymentMethodId: paymentMethod.id,
          userId: user._id,
          items: cart.items,
        }, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        if (response.data.success) {
          toast.success('Payment successful!');
          dispatch(setCart({ items: [], total: 0 }));
          navigate('/checkout-success');
        } else {
          toast.error(response.data.message);
        }
      } catch (apiError) {
        toast.error('Payment failed: ' + (apiError.response?.data?.message || apiError.message));
      }
      setLoading(false);
    }
  }, [stripe, elements, cart, user, dispatch, navigate]);

  return (
    <CheckoutPage
      user={user}
      cart={cart}
      paymentRequest={paymentRequest}
      stripe={stripe}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Checkout;
