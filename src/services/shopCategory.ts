import axios from "axios";

const API_URL = "/shop-categories";

export interface ShopCategory {
  _id: string;
  name: string;
  image: string;
  description: string;
  isActive?: boolean;
}

// Get all shop categories
const getShopCategory = async (): Promise<ShopCategory[]> => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

// Create a shop category
const createShopCategory = async (categoryData: Omit<ShopCategory, "_id">): Promise<ShopCategory> => {
  const response = await axios.post(API_URL, categoryData, {
    withCredentials: true,
  });
  return response.data;
};

// Update a shop category
const updateShopCategory = async (categoryId: string, categoryData: ShopCategory): Promise<ShopCategory> => {
  const response = await axios.put(
    `${API_URL}/${categoryId}`,
    categoryData,
    { withCredentials: true }
  );
  return response.data;
};


// Delete a shop category
const deleteShopCategory = async (categoryId: string): Promise<any> => {
  const response = await axios.delete(
    `${API_URL}/${categoryId}`,
    { withCredentials: true }
  );
  return response.data;
};

const shopCategoryService = {
  getShopCategory,
  createShopCategory,
  updateShopCategory,
  deleteShopCategory,
};

export default shopCategoryService;
