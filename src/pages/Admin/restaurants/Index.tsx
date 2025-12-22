import React, { useEffect, useState } from 'react';
import RestaurantService, { type Restaurant } from "../../../services/restaurant.js";
import { DataTable } from "../../../components/ui/data-table.js";
import { createRestaurantColumns } from "./Columns.js";
import { toast } from 'react-toastify';
import FormModel from './FormModel.js';



import { useNavigate } from 'react-router-dom'; // Added import

function Index() {
  const navigate = useNavigate(); // Added
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const fetchRestaurants = async () => {
    setIsLoading(true);
    try {
      const data = await RestaurantService.getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleCreateClick = () => {
    setSelectedRestaurant(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if(!window.confirm("Are you sure to delete?")) return;
    try {
      await RestaurantService.deleteRestaurant(id);
      toast.success("Restaurant Deleted Successfully");
      fetchRestaurants();
    } catch (error) {
      toast.error('Failed to delete Restaurant.');
      console.error('Error deleting Restaurant:', error);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedRestaurant(null);
  };

  const handleFormSubmit = async (restaurantData: Omit<Restaurant, "_id">) => {
    try {
      if (selectedRestaurant) {
        await RestaurantService.updateRestaurant(selectedRestaurant._id, restaurantData);
        toast.success("Restaurant Updated Successfully");
      } else {
        await RestaurantService.createRestaurant(restaurantData);
        toast.success("Restaurant Created Successfully");
      }
      fetchRestaurants();
      handleFormClose();
    } catch (error) {
      toast.error('Failed to save Restaurant.');
      console.error('Error saving Restaurant:', error);
    }
  };

  const handleViewProducts = (restaurantId: string) => {
    navigate(`/admin/restaurants/${restaurantId}/products`);
  };

  const columns = createRestaurantColumns({
    onEdit: handleEditClick,
    onDelete: handleDeleteClick,
    onViewProducts: handleViewProducts // Added
  });

  return (
    <div className="p-3">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Restaurant List</h1>
        <button
          onClick={handleCreateClick}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white"
        >
          Create
        </button>
      </div>
      {isLoading ? (
        <div className="text-center py-4">Loading restaurants...</div>
      ) : (
        <DataTable columns={columns} data={restaurants} />
      )}
      {isFormOpen && (
        <FormModel
          isOpen={isFormOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          restaurant={selectedRestaurant}
        />
      )}
    </div>
  );
}

export default Index;
