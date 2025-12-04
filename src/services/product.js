import axios from "axios";

const API_URL = "/";

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL + "products", {
    withCredentials: true,
  });
  return response.data;
};

// Create a product
const createProduct = async (productData) => {
  const response = await axios.post(API_URL + "products-create", productData, {
    withCredentials: true,
  });
  return response.data;
};

// Update a product
const updateProduct = async (productData) => {
  const response = await axios.put(
    API_URL + `products-update/${productData.id}`,
    productData,
    { withCredentials: true }
  );
  return response.data;
};

// Delete a product
const deleteProduct = async (productId) => {
  const response = await axios.delete(
    API_URL + `products-delete/${productId}`,
    { withCredentials: true }
  );
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
