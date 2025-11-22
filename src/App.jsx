// import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import AllRoutes from './routes/index.jsx';
import axios from 'axios';
import AppContext from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice.js';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async() => {
    const resData = await axios.get("/user-details", { withCredentials: true });

    console.log("User Details:", resData.data?.data);
    const dataApi = await resData.data;
    if(dataApi.success){
      console.log("User Details Fetched:", dataApi?.data);
      dispatch(setUserDetails(dataApi?.data));
    }else{
      console.error("Failed to fetch user details");
    }
  }


  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
      <AppContext.Provider value={{
        fetchUserDetails
      }}>
        <AllRoutes/>
      </AppContext.Provider>

  )
}

export default App
