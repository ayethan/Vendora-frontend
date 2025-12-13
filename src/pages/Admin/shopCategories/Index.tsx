import React, { useEffect, useState } from 'react';
import categoryService from "../../../services/shopCategory.js";
import { DataTable } from "../../../components/ui/data-table.js";
import { createCategoryColumns } from "./Columns.js";
import FormModel from './FormModel.js';
import { toast } from 'react-toastify';


type Category = {
  _id: string;
  name: string;
  description: string;
  image: string;
  isActive?: boolean;
};

type CategoryFormData = Omit<Category, "_id"> & { _id?: string };

function Index() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);


  const handleFormSubmit = async (categoryData: CategoryFormData) => {
    try {
      if (categoryData._id) {
        const cateDatawithId: Category = { _id: categoryData._id, ...categoryData };
        await categoryService.updateCategory(cateDatawithId);
        toast.success("Category Updated Successfully");
      } else {
        const cateDatawithNotId: Category = { ...categoryData, _id: '' };
        await categoryService.createCategory(cateDatawithNotId);
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
      const data = await categoryService.getCategory();
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

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
  };

  const handleDeleteClick = async (id: string) => {
    if(!window.confirm("Are you sure to delete?")) return;
    try {
      await categoryService.deleteCategory(id);
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
