import axios from "axios";

const API_URL = "/restaurants";

import { type Product } from "./product.js";

export interface Restaurant {
  _id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  country: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  type: 'Restaurant' | 'Shop' | 'Home Chef';
  shopCategory?: string;
  cuisine: {
    _id: string;
    name: string;
  };
  openingHours: string;
  image: string;
  owner: string;
  products?: Product[];
  status: 'open' | 'closed';
  rating?: number;
  isActive?: boolean;
}

// Get all restaurants
const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

// Get a single restaurant by ID
const getRestaurantById = async (restaurantId: string): Promise<Restaurant> => {
  const response = await axios.get(`${API_URL}/${restaurantId}`, {
    withCredentials: true,
  });
  return response.data;
};

const getRestaurantBySlug = async (restaurantSlug: string): Promise<Restaurant> => {
  const response = await axios.get(`${API_URL}/${restaurantSlug}`, {
    withCredentials: true,
  });
  console.log('restaurant',response.data);
  return response.data;
};

// Create a restaurant
const createRestaurant = async (restaurantData: Omit<Restaurant, "_id">): Promise<Restaurant> => {
  const response = await axios.post(API_URL, restaurantData, {
    withCredentials: true,
  });
  return response.data;
};

// Update a restaurant
const updateRestaurant = async (restaurantId:string, restaurantData: Partial<Restaurant>): Promise<Restaurant> => {
  const response = await axios.put(
    `${API_URL}/${restaurantId}`,
    restaurantData,
    { withCredentials: true }
  );
  return response.data;
};

// Delete a restaurant
const deleteRestaurant = async (restaurantId: string): Promise<any> => {
  const response = await axios.delete(`${API_URL}/${restaurantId}`, {
    withCredentials: true,
  });
  return response.data;
};

const restaurantService = {
  getRestaurants,
  getRestaurantById,
  getRestaurantBySlug,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};

export default restaurantService;
