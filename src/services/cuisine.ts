import axios from "axios";

const API_URL = "/cuisines";

export interface Cuisine {
  _id: string;
  name: string;
  image: string;
  description: string;
  isActive?: boolean;
}

// Get all cuisines
const getCuisines = async (): Promise<Cuisine[]> => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

// Create a cuisine
const createCuisine = async (cuisineData: Omit<Cuisine, "_id">): Promise<Cuisine> => {
  const response = await axios.post(API_URL, cuisineData, {
    withCredentials: true,
  });
  return response.data;
};

// Update a cuisine
const updateCuisine = async (cuisineId: string, cuisineData: Partial<Cuisine>): Promise<Cuisine> => {
  const response = await axios.put(
    `${API_URL}/${cuisineId}`,
    cuisineData,
    { withCredentials: true }
  );
  return response.data;
};

// Delete a cuisine
const deleteCuisine = async (cuisineId: string): Promise<any> => {
  const response = await axios.delete(`${API_URL}/${cuisineId}`, {
    withCredentials: true,
  });
  return response.data;
};

const cuisineService = {
  getCuisines,
  createCuisine,
  updateCuisine,
  deleteCuisine,
};

export default cuisineService;
