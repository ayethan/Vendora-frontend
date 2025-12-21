import React, { useEffect, useState, useRef } from "react";
import uploadImage from "../../../helpers/uploadImage.js";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import FormInput from "../../../components/Form/FormInput.js";
import FormSelect from "../../../components/Form/FormSelect.js";
import RichTextEditor from "../../../components/Form/RichTextEditor.js";
import shopCategoryService, { type ShopCategory } from "../../../services/shopCategory.js";
import cuisineService, { type Cuisine } from "../../../services/cuisine.js";
import { type Restaurant } from "../../../services/restaurant.js";
import axios from "axios";
import useDebounce from "../../../components/Nav/hooks/useDebounce.js";
import useClickOutside from "../../../components/Nav/hooks/useClickOutside.js";

interface FormModelProps {
    restaurant: Restaurant | null;
    onSubmit: (data: Omit<Restaurant, "_id">) => void | Promise<void>;
    onClose: () => void;
    isOpen: boolean;
}

type RestaurantFormData = Omit<Restaurant, "_id" | "location" | "openingTimes" | "deliveryInfo"> & {
    longitude?: number;
    latitude?: number;
    openingTimes: {
        day: string;
        open: string;
        close: string;
    }[];
    deliveryInfo: {
        deliveryCost: number;
        smallOrderSurcharge: number;
        estimatedDeliveryTime: number;
    };
};

function FormModel({ restaurant, onSubmit, onClose }: FormModelProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        reset,
        watch,
    } = useForm<RestaurantFormData>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "openingTimes",
    });

    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [shopCategories, setShopCategories] = useState<ShopCategory[]>([]);
    const [cuisines, setCuisines] = useState<Cuisine[]>([]);
    const [citySuggestions, setCitySuggestions] = useState<any[]>([]);
    const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);

    const cityValue = watch("city");
    const debouncedCity = useDebounce(cityValue, 500);

    const addressValue = watch("address");
    const debouncedAddress = useDebounce(addressValue, 500);
    const countryValue = watch('country');

    const addressSuggestionsRef = useRef(null);
    const citySuggestionsRef = useRef(null);

    useClickOutside(addressSuggestionsRef, () => {
        setAddressSuggestions([]);
    });

    useClickOutside(citySuggestionsRef, () => {
        setCitySuggestions([]);
    });


    useEffect(() => {
        if (debouncedAddress && debouncedAddress.length > 3) {
            const fetchAddresses = async () => {
                try {
                    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                        params: {
                            q: `${debouncedAddress}, ${cityValue}, ${countryValue}`,
                            format: 'json',
                            addressdetails: 1,
                            limit: 5
                        },
                        withCredentials: false
                    });
                    setAddressSuggestions(response.data || []);
                    setCitySuggestions([]);
                } catch (error) {
                    console.error("Error fetching address suggestions:", error);
                    setAddressSuggestions([]);
                }
            };
            fetchAddresses();
        } else {
            setAddressSuggestions([]);
        }
    }, [debouncedAddress, cityValue, countryValue]);

    useEffect(() => {
        if (debouncedCity && debouncedCity.length > 2) {
            const fetchCities = async () => {
                try {
                    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                        params: {
                            city: debouncedCity,
                            format: 'json',
                            addressdetails: 1,
                            limit: 5
                        },
                        withCredentials: false
                    });
                    setCitySuggestions(response.data || []);
                    setAddressSuggestions([]);
                } catch (error) {
                    console.error("Error fetching city suggestions:", error);
                    setCitySuggestions([]);
                }
            };
            fetchCities();
        } else {
            setCitySuggestions([]);
        }
    }, [debouncedCity]);

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
                openingTimes: [],
                deliveryInfo: {
                    deliveryCost: 0,
                    smallOrderSurcharge: 0,
                    estimatedDeliveryTime: 0,
                },
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

    const handleCitySuggestionClick = (suggestion: any) => {
        const city = suggestion.address.city || suggestion.address.town || suggestion.address.village || suggestion.name;
        setValue("city", city, { shouldValidate: true });
        if (suggestion.address.country) {
            setValue("country", suggestion.address.country, { shouldValidate: true });
        }
        setCitySuggestions([]);
        setAddressSuggestions([]); // Clear address suggestions as well
    };

    const handleAddressSuggestionClick = (suggestion: any) => {
        let street = '';
        if (suggestion.address.road) {
            street = suggestion.address.road;
        }
        if (suggestion.address.house_number) {
            street = `${suggestion.address.house_number} ${street}`;
        }
        if(!street) {
            const displayNameParts = suggestion.display_name.split(',');
            street = displayNameParts[0];
        }

        setValue("address", street, { shouldValidate: true });
        // if (suggestion.address.city) {
        //     setValue("city", suggestion.address.city, { shouldValidate: true });
        // } else {
        //     setValue("city", suggestion.name, { shouldValidate: true });
        // }
        // if (suggestion.address.country) {
        //     setValue("country", suggestion.address.country, { shouldValidate: true });
        // }
        setValue("latitude", parseFloat(suggestion.lat), { shouldValidate: true });
        setValue("longitude", parseFloat(suggestion.lon), { shouldValidate: true });
        setAddressSuggestions([]);
        setCitySuggestions([]); // Clear city suggestions as well
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

                        <div className="relative" ref={citySuggestionsRef}>
                            <FormInput
                                label="City"
                                name="city"
                                register={register}
                                errors={errors}
                                rules={{ required: "City is required" }}
                            />
                            {citySuggestions.length > 0 && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                                    {citySuggestions.map((suggestion) => (
                                        <li
                                            key={suggestion.place_id}
                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleCitySuggestionClick(suggestion)}
                                        >
                                            {suggestion.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <FormInput
                            label="Country"
                            name="country"
                            register={register}
                            errors={errors}
                            rules={{ required: "Country is required" }}
                        />
                        <div className="relative" ref={addressSuggestionsRef}>
                            <FormInput
                                label="Address"
                                name="address"
                                register={register}
                                errors={errors}
                                rules={{ required: "Restaurant address is required" }}
                            />
                            {addressSuggestions.length > 0 && (
                                <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                                    {addressSuggestions.map((suggestion) => (
                                        <li
                                            key={suggestion.place_id}
                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleAddressSuggestionClick(suggestion)}
                                        >
                                            {suggestion.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <FormInput
                                label="Longitude"
                                name="longitude"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Longitude is required" }}
                                readOnly
                            />
                            <FormInput
                                label="Latitude"
                                name="latitude"
                                type="text"
                                register={register}
                                errors={errors}
                                rules={{ required: "Latitude is required" }}
                                readOnly
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-medium">Opening Times</h3>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center space-x-2 mt-2">
                                    <FormSelect
                                        label="Day"
                                        name={`openingTimes.${index}.day`}
                                        register={register}
                                        errors={errors}
                                    >
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                    </FormSelect>
                                    <FormInput
                                        label="Open"
                                        name={`openingTimes.${index}.open`}
                                        register={register}
                                        errors={errors}
                                        placeholder="Open"
                                    />
                                    <FormInput
                                        label="Close"
                                        name={`openingTimes.${index}.close`}
                                        register={register}
                                        errors={errors}
                                        placeholder="Close"
                                    />
                                    <button type="button" onClick={() => remove(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => append({ day: 'Monday', open: '', close: '' })}>
                                Add Opening Time
                            </button>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium">Delivery Info</h3>
                            <FormInput
                                label="Delivery Cost"
                                name="deliveryInfo.deliveryCost"
                                type="number"
                                register={register}
                                errors={errors}
                            />
                            <FormInput
                                label="Small Order Surcharge"
                                name="deliveryInfo.smallOrderSurcharge"
                                type="number"
                                register={register}
                                errors={errors}
                            />
                            <FormInput
                                label="Estimated Delivery Time (in minutes)"
                                name="deliveryInfo.estimatedDeliveryTime"
                                type="number"
                                register={register}
                                errors={errors}
                            />
                        </div>


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
                            className={`px-4 py-2 bg-gray-700 text-white rounded hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white disabled:bg-blue-300 ${isUploadingImage ? "cursor-not-allowed" : "cursor-pointer"
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
