import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/input.js';
import HowItWorks from './components/HowItWorks.js';
import FoodDeliveryCategories from './components/FoodDeliveryCategories.js';
import DealsOfTheDay from './components/DealsOfTheDay.js';
import FeaturedRestaurants from './components/FeaturedRestaurants.js';
import useClickOutside from "../../../components/Nav/hooks/useClickOutside.js";
import axios from 'axios';
import useDebounce from '../../../components/Nav/hooks/useDebounce.js';
import { MapPin, Locate } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../../store/locationSlice.js';

function FoodDeliveryHome() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: string; lon: string; display_name: string } | null>(null);
  const dispatch = useDispatch();

  const suggestionsRef = useRef(null);

  useClickOutside(suggestionsRef, () => {
      setLocationSuggestions([]);
  });

  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedInputValue && debouncedInputValue.length > 1) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: { q: debouncedInputValue, format: 'json', addressdetails: 1, limit: 1, countrycodes: 'vn', },
            withCredentials: false
          });
          console.log('data',response.data);
          setLocationSuggestions(response.data || []);
        } catch (error) {
          console.error("Error fetching location suggestions:", error);
          setLocationSuggestions([]);
        }
      };
      fetchSuggestions();
    } else {
      setLocationSuggestions([]);
    }
  }, [debouncedInputValue]);

  const handleLocationSuggestionClick = (suggestion: any) => {
        setInputValue(suggestion.display_name);
        const locationData = {
          lat: suggestion.lat,
          lon: suggestion.lon,
          display_name: suggestion.display_name
        };
        setSelectedLocation(locationData);
        dispatch(setLocation(locationData));
        setLocationSuggestions([]);
        navigate(`/restaurants?lat=${suggestion.lat}&lon=${suggestion.lon}`);
    };

    const handleUseCurrentLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              async (position) => {
                  const { latitude, longitude } = position.coords;
                  try {
                    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
                        params: { lat: latitude, lon: longitude, format: 'json' },
                        withCredentials: false
                    });
                    if (response.data) {
                        const locationData = {
                            lat: String(latitude),
                            lon: String(longitude),
                            display_name: response.data.display_name
                        };
                        setInputValue(response.data.display_name);
                        setSelectedLocation(locationData);
                        dispatch(setLocation(locationData));
                    }
                } catch (error) {
                    console.error("Error reverse geocoding:", error);
                }
                  navigate(`/restaurants?lat=${latitude}&lon=${longitude}`);
              },
              (error) => {
                  console.error("Error getting current location:", error);
                  alert("Could not get your location. Please check your browser settings.");
              }
          );
      } else {
          alert("Geolocation is not supported by this browser.");
      }
    };

  const handleFindFood = async () => {
    if (selectedLocation) {
        navigate(`/restaurants?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}`);
    } else if (inputValue) {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: { q: inputValue, format: 'json', limit: 1 },
                withCredentials: false
            });
            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                navigate(`/restaurants?lat=${lat}&lon=${lon}`);
            } else {
                console.log("Could not find location for:", inputValue);
                // Optionally: show an error message to the user
            }
        } catch (error) {
            console.error("Error geocoding input:", error);
        }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative bg-cover bg-center h-[600px]" style={{ backgroundImage: "url('/img/cover-image.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-6xl font-extrabold text-center mb-6">Food, Delivered.</h1>
          <p className="text-2xl text-center mb-10">Order from the best restaurants near you.</p>
          <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-2xl p-4 relative" ref={suggestionsRef}>
            <MapPin className="text-gray-400 mx-2" />
            <Input
              type="text"
              placeholder="Enter your delivery address"
              className="flex-grow bg-transparent border-none text-lg text-gray-800 focus:border focus:border-red-500 font-semibold"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFindFood()}
            />
            <button onClick={handleUseCurrentLocation} className="ml-2 p-2 rounded-full hover:bg-gray-300 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer">
              <Locate className="h-5 w-5 text-red-600" />
            </button>
            {locationSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-90 overflow-y-auto shadow-lg top-full left-0 right-0 p-4">
                  {locationSuggestions.map((suggestion) => (
                      <li
                          key={suggestion.place_id}
                          className="p-2 cursor-pointer hover:bg-gray-100 text-gray-800 flex items-center"
                          onClick={() => handleLocationSuggestionClick(suggestion)}
                      >
                          <span className="p-1 rounded-full hover:bg-gray-300 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 mr-3"><MapPin className="" /></span>
                          <div className="flex flex-col">
                            <span className="font-semibold">{suggestion.address.city || suggestion.address.town || suggestion.address.village || suggestion.display_name || suggestion.address.state}</span>
                            <span className="text-sm text-gray-500">{suggestion.address.country}</span>
                          </div>
                      </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <HowItWorks />
      <FoodDeliveryCategories />
      <DealsOfTheDay />
      <FeaturedRestaurants />
    </div>
  );
}

export default FoodDeliveryHome;
