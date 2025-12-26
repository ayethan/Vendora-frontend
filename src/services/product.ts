import axios from "axios";

const API_URL = "/products";

export type Product = {
  _id: string;
  name: string;
  restaurant: any;
  description: string;
  price: number;
  featured_image: string;
  image: string[];
  category: {
    _id: string;
    name: string;
  };
  addons: {
    _id: string;
    name: string;
    price: number;
  }[];
  flavours: {
    name: string;
    extra_price: number;
    is_default: boolean;
  }[];
  slug: string;
  shopCategory: string;
  selling_price: number;
  discount: number;
  stock: number;
  brand: string;
  isActive: boolean;
}

export type ProductData = Omit<Product, "_id" | "restaurant" | "category" | "addons"> & {
  category: string;
  addons: string[];
};

// Get all products for a restaurant
const getProducts = async (restaurantId: string): Promise<Product[]> => {
  const response = await axios.get(`/restaurants/${restaurantId}/products`, {
    withCredentials: true,
  });
  return response.data;
};

// Get a single product by ID
const getProductById = async (restaurantId: string, productId: string): Promise<Product> => {
  const response = await axios.get(`/restaurants/${restaurantId}/products/${productId}`, {
    withCredentials: true,
  });
  return response.data;
};

// Create a product for a restaurant
const createProduct = async (restaurantId: string, productData: ProductData): Promise<Product> => {
  const response = await axios.post(`/restaurants/${restaurantId}/products`, productData, {
    withCredentials: true,
  });
  return response.data;
};

// Update a product
const updateProduct = async (restaurantId: string, productId: string, productData: Partial<ProductData>): Promise<Product> => {
  const response = await axios.put(
    `/restaurants/${restaurantId}/products/${productId}`,
    productData,
    { withCredentials: true }
  );
  return response.data;
};

// Delete a product
const deleteProduct = async (restaurantId: string, productId: string): Promise<any> => {
  const response = await axios.delete(`/restaurants/${restaurantId}/products/${productId}`, {
    withCredentials: true,
  });
  return response.data;
};


// Get a single product by slug
const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await axios.get(`/product/${slug}`);
  return response.data;
};

// Get related products
const getRelatedProducts = async (categoryId: string, productId: string): Promise<Product[]> => {
  const response = await axios.get(`/product/related/${categoryId}/${productId}`);
  return response.data;
};

const productService = {
  getProducts,
  getProductById,
  getProductBySlug,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
