import React, { useEffect, useState } from "react";
import uploadImage from "../../../helpers/uploadImage.js";
import { useForm, type SubmitHandler } from "react-hook-form";
import FormInput from "../../../components/Form/FormInput.js";
import FormSelect from "../../../components/Form/FormSelect.js";
import RichTextEditor from "../../../components/Form/RichTextEditor.js";
import shopCategoryService, { type ShopCategory } from "../../../services/shopCategory.js";
import cuisineService, { type Cuisine } from "../../../services/cuisine.js";
import { type Restaurant } from "../../../services/restaurant.js";

interface FormModelProps {
restaurant: Restaurant | null;
  onSubmit: (data: Omit<Restaurant, "_id">) => void | Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

type RestaurantFormData = Omit<Restaurant, "_id" | "location"> & {
    longitude?: number;
    latitude?: number;
};

function FormModel({ restaurant, onSubmit, onClose }: FormModelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm<RestaurantFormData>();

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [shopCategories, setShopCategories] = useState<ShopCategory[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [shopCats, cuisinesData] = await Promise.all([
            shopCategoryService.getShopCategory(),
            cuisineService.getCuisines()
        ]);
        setShopCategories(shopCats);
        setCuisines(cuisinesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (restaurant) {
      reset({
          ...restaurant,
          longitude: restaurant.location.coordinates[0],
          latitude: restaurant.location.coordinates[1],
      });
    } else {
        reset({
            name: "",
            slug: "",
            description: "",
            address: "",
            city: "",
            country: "",
            openingHours: "",
            image: "",
            type: "Restaurant",
            status: "open",
            shopCategory: "",
            cuisine: {
              _id: "",
              name: "",
            },
            longitude: 0,
            latitude: 0,
            isActive: true,
        });
    }
  }, [restaurant, reset]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const uploadImageCloudinary = await uploadImage(file);
      setValue("image", uploadImageCloudinary.url, {
        shouldValidate: true,
      });
    } catch (error) {
      console.error("Error uploading featured image:", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onFormSubmit: SubmitHandler<RestaurantFormData> = (data) => {
    const validLongitude = data.longitude ?? 0;
    const validLatitude = data.latitude ?? 0;

    const { longitude, latitude, ...restData } = data;

    const restaurantData: Omit<Restaurant, "_id"> = {
        ...restData,
        location: {
            type: "Point" as const,
            coordinates: [validLongitude, validLatitude],
        },
    };
    onSubmit(restaurantData);
  };

  return (
    <div
      className="fixed w-full h-full bg-gray-900/50 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center overflow-y-auto z-50 p-4 sm:p-6"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      >
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-lg sm:max-w-2xl mx-auto my-8 sm:my-0 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {restaurant?._id ? "Edit Restaurant" : "Create Restaurant"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black font-semibold bg-gray-100 py-1 px-3 rounded cursor-pointer"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="space-y-4">
            <FormInput
              label="Name"
              name="name"
              register={register}
              errors={errors}
              rules={{ required: "Restaurant name is required" }}
            />
            <RichTextEditor
              label="Description"
              name="description"
              control={control}
              errors={errors}
            />
             <FormInput
              label="Address"
              name="address"
              register={register}
              errors={errors}
              rules={{ required: "Restaurant address is required" }}
            />
            <FormInput
              label="City"
              name="city"
              register={register}
              errors={errors}
              rules={{ required: "City is required" }}
            />
            <FormInput
              label="Country"
              name="country"
              register={register}
              errors={errors}
              rules={{ required: "Country is required" }}
            />
            <div className="flex space-x-4">
                <FormInput
                    label="Longitude"
                    name="longitude"
                    type="number"
                    register={register}
                    errors={errors}
                    rules={{ required: "Longitude is required" }}
                />
                <FormInput
                    label="Latitude"
                    name="latitude"
                    type="number"
                    register={register}
                    errors={errors}
                    rules={{ required: "Latitude is required" }}
                />
            </div>

            <FormInput
                label="Opening Hours"
                name="openingHours"
                register={register}
                errors={errors}
                rules={{ required: "Opening hours are required" }}
            />

            <FormSelect
              label="Type"
              name="type"
              register={register}
              errors={errors}
              rules={{ required: "Type is required" }}
            >
              <option value="Restaurant">Restaurant</option>
              <option value="Shop">Shop</option>
              <option value="Home Chef">Home Chef</option>
            </FormSelect>

            <FormSelect
              label="Shop Category"
              name="shopCategory"
              register={register}
              errors={errors}
            >
              <option value="">Select Shop Category</option>
              {shopCategories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </FormSelect>

            <FormSelect
              label="Cuisine"
              name="cuisine"
              register={register}
              errors={errors}
              rules={{ required: "Cuisine is required" }}
            >
              <option value="">Select Cuisine</option>
              {cuisines.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </FormSelect>

            <FormSelect
              label="Status"
              name="status"
              register={register}
              errors={errors}
              rules={{ required: "Status is required" }}
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </FormSelect>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Featured Image
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageUpload}
                className="mt-1 p-2 border border-gray-200 rounded-md w-full"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded text-sm cursor-pointer"
              onClick={onClose}
            >
              Cancel
          </button>
            <button
              type="submit"
              disabled={isUploadingImage}
              className={`px-4 py-2 bg-gray-700 text-white rounded hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white disabled:bg-blue-300 ${
                isUploadingImage ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isUploadingImage ? "Uploading..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormModel;
