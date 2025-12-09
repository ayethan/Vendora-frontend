import React, { useState, useEffect, useCallback } from 'react';
import ProductFormModal from './ProductFormModal';
import productService from '../../../services/product';
import { toast } from 'react-toastify';

function ProductList() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error("Failed to fetch products.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateClick = () => {
    setEditingProduct({});
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCloseForm = () => {
    setEditingProduct(null);
  };

  const handleFormSubmit = async (productData) => {
    try {
      if (productData.id) {
        await productService.updateProduct(productData);
        toast.success("Product Updated Successfully");
      } else {
        await productService.createProduct(productData);
        toast.success("Product Created Successfully");
      }
      handleCloseForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product.');
    }
  };

  const handleDeleteClick = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      toast.success("Product Deleted Successfully");
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product.');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Product List</h1>
        <button onClick={handleCreateClick} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">Loading products...</td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product, index) => (
              <tr key={product._id} className="border-b">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3"><img src={product.featured_image} alt={product.name} width={50} height={50} /></td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.category === '1' ? 'Category 1' : 'Category 2'}</td>
                  <td className="px-4 py-3"><span className={`py-1 px-3 rounded-full text-xs ${product.isActive === true ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{product.isActive == true ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-4 py-3">
                      <button type="button" className="text-blue-600 mr-2" onClick={() => handleEditClick(product)}>Edit</button>
                      <button type="button" className="text-red-600" onClick={() => handleDeleteClick(product._id)}>Delete</button>
                  </td>
              </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ProductFormModal
        product={editingProduct}
        onSubmit={handleFormSubmit}
        onClose={handleCloseForm}
      />
    </div>
  )
}

export default ProductList
