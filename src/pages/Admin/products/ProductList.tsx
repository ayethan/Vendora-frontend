import React, { useState, useEffect, useCallback } from 'react';
import productService, { type Product } from '../../../services/product.js';
import { DataTable } from "../../../components/ui/data-table.js";
import { createProductColumns } from "./ProductColumns.js";
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

function ProductList() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!restaurantId) {
        console.error("Restaurant ID is missing.");
        toast.error("Restaurant ID is missing.");
        setIsLoading(false);
        return;
      }
      const data = await productService.getProducts(restaurantId);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error("Failed to fetch products.");
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId]);

  const handleCreateClick = () => {
    if (!restaurantId) {
      toast.error("Restaurant ID is missing.");
      return;
    }
    navigate(`/admin/restaurants/${restaurantId}/products/create`);
  };

  const handleEditClick = (product: Product) => {
    if (!restaurantId) {
      toast.error("Restaurant ID is missing.");
      return;
    }
    navigate(`/admin/restaurants/${restaurantId}/products/${product._id}`);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteClick = async (productId: string) => {
    if (!restaurantId) {
      toast.error("Restaurant ID is missing.");
      return;
    }
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await productService.deleteProduct(restaurantId, productId);
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
    </div>
  )
}

export default ProductList
