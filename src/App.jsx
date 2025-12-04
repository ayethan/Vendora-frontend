import { useEffect, useState } from 'react';
import './App.css'
import AllRoutes from './routes/index.jsx';
import axios from 'axios';
import AppContext from './context';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, setCart } from './store/userSlice.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;


function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const token = user?.token;
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        dispatch(setCart(response.data.cart));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserDetails = async() => {
    try {
      const resData = await axios.get("/user-details", { withCredentials: true });

      const dataApi = resData.data;
      if(dataApi.success){
        dispatch(setUserDetails(dataApi?.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);


  if (loading) {
    return (
      <div className='flex justify-center items-center w-full h-screen bg-transparent'>
        Loading...
      </div>
    );
  }


  return (
      <>
      <ToastContainer />
      <AppContext.Provider value={{fetchUserDetails, fetchCart}}>
        <Elements stripe={stripePromise}>
          <AllRoutes/>
        </Elements>
      </AppContext.Provider>
    </>

    // <AllRoutes/>
  )
}

export default App
