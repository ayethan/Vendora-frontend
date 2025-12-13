import axios from "axios";

const API_URL = "/shop-categories";

type CategoryData = {
  id: string
  name: string
  image: string
  description: string
  isActive?: boolean
}

// Get all categorys
const getCategory = async (): Promise<any> => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  console.log('category',response.data);
  return response.data;
};

// Create a category
const createCategory = async (categoryData: CategoryData): Promise<any> => {
  const response = await axios.post(API_URL, categoryData, {
    withCredentials: true,
  });
  return response.data;
};

// Update a category
const updateCategory = async (categoryData: CategoryData): Promise<any> => {
  const response = await axios.put(
    API_URL + `/${categoryData.id}`,
    categoryData,
    { withCredentials: true }
  );
  return response.data;
};

// Delete a category
const deleteCategory = async (categoryId: string): Promise<any> => {
  const response = await axios.delete(
    API_URL + `/${categoryId}`,
    { withCredentials: true }
  );
  return response.data;
};

const categoryService = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
