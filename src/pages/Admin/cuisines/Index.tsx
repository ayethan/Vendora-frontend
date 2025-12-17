import React, { useEffect, useState } from 'react';
import cuisineService from "../../../services/cuisine.js";
import { DataTable } from "../../../components/ui/data-table.js";
import { createCuisineColumns } from "./Columns.js";
import FormModel from './FormModel.js';
import { toast } from 'react-toastify';
import { type Cuisine } from '../../../services/cuisine.js';

type CuisineFormData = Omit<Cuisine, "_id"> & { _id?: string };

function Index() {
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCuisine, setEditingCuisine] = useState<Cuisine | null>(null);


  const handleFormSubmit = async (cuisineData: CuisineFormData) => {
    try {
      if (cuisineData._id) {
        const csnDatawithId: Cuisine =  { _id: cuisineData._id, ...cuisineData };
        await cuisineService.updateCuisine(csnDatawithId._id, csnDatawithId);
        toast.success("Cuisine Updated Successfully");
      } else {
        const { _id, ...rest } = cuisineData;
        await cuisineService.createCuisine(rest);
        toast.success("Cuisine Created Successfully");
      }
      handleCloseForm();
      fetchCuisines();
    } catch (error) {
      console.error('Error saving cuisine:', error);
      toast.error('Failed to save cuisine.');
    }
  };

  const fetchCuisines = async () => {
    setIsLoading(true);
    try {
      const data: Cuisine[] = await cuisineService.getCuisines();
      setCuisines(data);
    } catch (error) {
      console.error('Error fetching cuisines:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCuisines();
  }, []);

  const handleCreateClick = () => {
    setEditingCuisine({ _id: '', name: '', description: '', image: '', isActive: true });
  };

  const handleEditClick = (cuisine: Cuisine) => {
    setEditingCuisine(cuisine);
  };

  const handleDeleteClick = async (id: string) => {
    if(!window.confirm("Are you sure to delete?")) return;
    try {
      await cuisineService.deleteCuisine(id);
      toast.success("Cuisine Deleted Successfully");
      fetchCuisines();
    } catch (error) {
      toast.error('Failed to delete cuisine.');
      console.error('Error deleting cuisine:', error);
    }
  };

  const columns = createCuisineColumns({
    onEdit: handleEditClick,
    onDelete: handleDeleteClick,
  });

  const handleCloseForm = () => {
    setEditingCuisine(null);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Cuisine List</h1> {/* Changed */}
        <button
          onClick={handleCreateClick}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white"
        >
          Create
        </button>
      </div>
      {isLoading ? (
        <div className="text-center py-4">Loading cuisines...</div>
      ) : (
        <DataTable columns={columns} data={cuisines} />
      )}
      {editingCuisine && (
        <FormModel
          cuisine={editingCuisine}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default Index;
