import axios from "axios";

const API_URL = "/categories";

export type Category = {
  _id: string
  name: string
  description: string
  isActive?: boolean
  image: string
}

// Get all categorys
const getCategory = async (): Promise<Category[]> => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  console.log('category',response.data);
  return response.data;
};

// Create a category
const createCategory = async (categoryData: Omit<Category, 'id'>): Promise<Category> => {
  const response = await axios.post(API_URL, categoryData, {
    withCredentials: true,
  });
  return response.data;
};

// Update a category
const updateCategory = async (categoryData: Category): Promise<Category> => {
  const response = await axios.put(
    API_URL + `/${categoryData._id}`,
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
