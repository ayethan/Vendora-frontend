import { useEffect } from 'react';
import './App.css'
import AllRoutes from './routes/index.jsx';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, fetchCart } from './store/userSlice.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);
  const token = user?.token;

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [token, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className='flex justify-center items-center w-full h-screen bg-transparent'>
        Loading...
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Elements stripe={stripePromise}>
        <AllRoutes />
      </Elements>
    </>
  );
}

export default App;
