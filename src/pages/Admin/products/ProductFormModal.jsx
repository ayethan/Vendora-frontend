import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiCpu, FiShoppingBag, FiBookOpen, FiSmile, FiAward, FiHeart, FiPlusSquare, FiCoffee, FiArchive } from "react-icons/fi";
import FormInput from "../../../components/Form/FormInput";
import FormSelect from "../../../components/Form/FormSelect";
import RichTextEditor from "../../../components/Form/RichTextEditor";
import ImageUpload from "../../../components/Form/ImageUpload";
import DisplayImage from "./DisplayImage";
import uploadImage from "../../../helpers/uploadImage";

const categoriesData = [
    {id: 1, name: 'Electronics', icon: <FiCpu /> }, {id: 2, name: 'Fashion', icon: <FiShoppingBag /> },
    {id: 3,name: 'Books', icon: <FiBookOpen /> },
    {id: 4,name: 'Toys', icon: <FiSmile /> }, {id: 5,name: 'Sports', icon: <FiAward /> },
    {id: 6,name: 'Beauty', icon: <FiHeart /> }, {id: 7, name: 'Health', icon: <FiPlusSquare /> },
    {id: 8,name: 'Food', icon: <FiCoffee /> }, {id: 9, name: 'Furniture', icon: <FiArchive /> },
];

function ProductFormModal({ product, onSubmit, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const productImages = watch("image", product?.image || []);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [isUploadingFeaturedImage, setIsUploadingFeaturedImage] = useState(false);

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        featured_image: product.featured_image || "",
        category: product.category || "",
        brand: product.brand || "",
        isActive: product.isActive != null ? String(product.isActive) : "true",
        description: product.description || "",
        price: product.price || "",
        selling_price: product.selling_price || "",
        stock: product.stock || 0,
        image: product.image || [],
        id: product._id,
      });
    }
  }, [product, reset]);

  if (!product) {
    return null;
  }

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingFeaturedImage(true);
    try {
      const uploadImageCloudinary = await uploadImage(file);
      setValue("featured_image", uploadImageCloudinary.url, {
        shouldValidate: true,
      });
    } catch (error) {
      console.error("Error uploading featured image:", error);
    } finally {
      setIsUploadingFeaturedImage(false);
    }
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadImageCloudinary = await uploadImage(file);
    const currentImages = watch("image") || [];
    setValue("image", [...currentImages, uploadImageCloudinary.url], {
      shouldValidate: true,
    });
  };

  const isSaveButtonDisabled = isUploadingFeaturedImage;

  return (
    <div
      key={product ? product._id : ""}
      className="fixed w-full h-full bg-gray-900/50 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center overflow-y-autofixed inset-0 bg-gray-900/50 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-lg sm:max-w-2xl mx-auto my-8 sm:my-0 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {product._id ? "Edit Product" : "Create Product"}
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
              rules={{ required: "Product name is required" }}
            />
            <FormSelect
              label="Brand"
              name="brand"
              register={register}
              errors={errors}
              rules={{ required: "Brand is required" }}
            >
              <option value="">Select brand</option>
              <option value="1">brand 1</option>
              <option value="2">brand 2</option>
            </FormSelect>
            <FormSelect
              label="Category"
              name="category"
              register={register}
              errors={errors}
              rules={{ required: "Category is required" }}
            >
              <option value="">Select Category</option>
              {categoriesData.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </FormSelect>
            <FormSelect
              label="Status"
              name="isActive"
              register={register}
              errors={errors}
              rules={{ required: "Status is required" }}
            >
              <option value="">Select Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </FormSelect>
            <RichTextEditor
              name="description"
              control={control}
              errors={errors}
            />
            <FormInput
              label="Price"
              name="price"
              type="number"
              register={register}
              errors={errors}
              rules={{
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 0.01, message: "Price must be greater than 0" },
              }}
            />
            <FormInput
              label="Selling Price"
              name="selling_price"
              type="number"
              register={register}
              errors={errors}
              rules={{ valueAsNumber: true }}
            />
            <FormInput
              label="Stock"
              name="stock"
              type="number"
              register={register}
              errors={errors}
              rules={{
                required: "Stock is required",
                valueAsNumber: true,
                min: { value: 0, message: "Stock cannot be negative" },
                validate: (value) =>
                  Number.isInteger(value) || "Stock must be a whole number",
              }}
            />
            <div>
              <label
                htmlFor="featured_image"
                className="block text-sm font-medium text-gray-700"
              >
                Featured Image
              </label>
              <input
                type="file"
                id="featured_image"
                onChange={handleFeaturedImageUpload}
                className="mt-1 p-2 border border-gray-200 rounded-md w-full"
              />
            </div>
            <ImageUpload
              onFileUpload={handleUploadProduct}
              productImages={productImages}
              setOpenFullScreenImage={setOpenFullScreenImage}
              setFullScreenImage={setFullScreenImage}
            />
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
              disabled={isSaveButtonDisabled}
              className={`px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 ${
                isSaveButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isUploadingFeaturedImage ? "Uploading..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
}

export default ProductFormModal;
