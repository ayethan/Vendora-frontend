import React, { useEffect, useState } from 'react';
import categoryService from "../../../services/shopCategory.js";
import { DataTable } from "../../../components/ui/data-table.js";
import { createCategoryColumns } from "./Columns.js";
import FormModel from './FormModel.js';
import { toast } from 'react-toastify';


type ShopCategory = {
  _id: string;
  name: string;
  image: string;
  description: string;
  isActive?: boolean;
};

type ShopCategoryFormData = Omit<ShopCategory, "_id"> & { _id?: string };

function Index() {
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<ShopCategory | null>(null);


  const handleFormSubmit = async (categoryData: ShopCategoryFormData) => {
    try {
      if (categoryData._id) {
        const cateDatawithId: ShopCategory = { _id: categoryData._id, ...categoryData };
        await categoryService.updateShopCategory(categoryData._id, cateDatawithId);
        toast.success("Category Updated Successfully");
      } else {
        await categoryService.createShopCategory(categoryData);
        toast.success("Category Created Successfully");
      }
      handleCloseForm();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category.');
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoryService.getShopCategory();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateClick = () => {
    setEditingCategory({ _id: '', name: '', description: '', image: '', isActive: true });
  };

  const handleEditClick = (category: ShopCategory) => {
    setEditingCategory(category);
  };

  const handleDeleteClick = async (id: string) => {
    if(!window.confirm("Are you sure to delete?")) return;
    try {
      await categoryService.deleteShopCategory(id);
      toast.success("Category Deleted Successfully");
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category.');
      console.error('Error deleting category:', error);
    }
  };

  const columns = createCategoryColumns({
    onEdit: handleEditClick,
    onDelete: handleDeleteClick,
  });

  const handleCloseForm = () => {
    setEditingCategory(null);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Category List</h1>
        <button
          onClick={handleCreateClick}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white"
        >
          Create
        </button>
      </div>
      {isLoading ? (
        <div className="text-center py-4">Loading categories...</div>
      ) : (
        <DataTable columns={columns} data={categories} />
      )}
      {editingCategory && (
        <FormModel
          category={editingCategory}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default Index;
