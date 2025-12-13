import React, { useState, useEffect, useCallback } from 'react';
import ProductFormModal from './ProductFormModal.js';
import productService, { type Product } from '../../../services/product.js';
import { DataTable } from "../../../components/ui/data-table.js";
import { createProductColumns } from "./ProductColumns.js";
import { toast } from 'react-toastify';

function ProductList() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
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
    setEditingProduct({
      _id: '',
      name: '',
      description: '',
      price: 0,
      featured_image: '',
      image: [],
      category: {
        _id: '',
        name: ''
      },
      slug: '',
      shopCategory: '',
      brand: '',
      isActive: true,
      selling_price: 0,
      discount: 0,
      stock: 0,
    });
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCloseForm = () => {
    setEditingProduct(null);
  };

  const handleFormSubmit = async (productData: Product) => {
    try {
      if (productData._id) {
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

  const handleDeleteClick = async (productId: string) => {
    try {
      await productService.deleteProduct(productId);
      toast.success("Product Deleted Successfully");
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product.');
    }
  };

  const columns = createProductColumns({
    onEdit: handleEditClick,
    onDelete: handleDeleteClick,
  });

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Product List</h1>
        <button onClick={handleCreateClick}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white">Create</button>
      </div>

        {isLoading ? (
            <div className="text-center py-4">Loading products...</div>
        ) : products.length > 0 ? (
            <DataTable columns={columns} data={products} />
        ) : (
          <div className="text-center py-4">
            No products found.
          </div>
        )}

      <ProductFormModal
        product={editingProduct}
        onSubmit={handleFormSubmit}
        onClose={handleCloseForm}
      />
    </div>
  )
}

export default ProductList
