import axios from "axios";

const API_URL = "/products";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  featured_image: string;
  image: string[];
  category: {
    _id: string;
    name: string;
  };
  slug: string;
  shopCategory: string;
  selling_price: number;
  discount: number;
  stock: number;
  brand: string;
  isActive: boolean;
}

// Get all products
const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

// Get a single product by ID
const getProductById = async (productId: string): Promise<Product> => {
  const response = await axios.get(`${API_URL}/${productId}`, {
    withCredentials: true,
  });
  return response.data;
};

// Create a product
const createProduct = async (productData: Omit<Product, "_id">): Promise<Product> => {
  const response = await axios.post(API_URL, productData, {
    withCredentials: true,
  });
  return response.data;
};

// Update a product
const updateProduct = async (productData: Product): Promise<Product> => {
  const response = await axios.put(
    `${API_URL}/${productData._id}`,
    productData,
    { withCredentials: true }
  );
  return response.data;
};

// Delete a product
const deleteProduct = async (productId: string): Promise<any> => {
  const response = await axios.delete(`${API_URL}/${productId}`, {
    withCredentials: true,
  });
  return response.data;
};

const productService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
