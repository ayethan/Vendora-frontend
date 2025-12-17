import React, { useEffect, useState } from "react";
import uploadImage from "../../../helpers/uploadImage.js";
import { useForm, type SubmitHandler } from "react-hook-form";
import FormInput from "../../../components/Form/FormInput.js";
import FormSelect from "../../../components/Form/FormSelect.js";
import RichTextEditor from "../../../components/Form/RichTextEditor.js";
import {type Cuisine } from "../../../services/cuisine.js";

interface CuisineFormModelProps {
  cuisine?: Cuisine;
  onSubmit: (data: CuisineFormData) => void;
  onClose: () => void;
}

type CuisineFormData = Omit<Cuisine, "_id">;

function FormModel({ cuisine, onSubmit, onClose }: CuisineFormModelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm<CuisineFormData>();

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  useEffect(() => {
    if (cuisine) {
      reset(cuisine);
    }
  }, [cuisine, reset]);

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

  const onFormSubmit: SubmitHandler<CuisineFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <div
      key={cuisine?._id}
      className="fixed w-full h-full bg-gray-900/50 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center overflow-y-auto z-50 p-4 sm:p-6"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-lg sm:max-w-2xl mx-auto my-8 sm:my-0 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {cuisine?._id ? "Edit cuisine" : "Create cuisine"}
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
              rules={{ required: "Cuisine name is required" }}
            />
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
              label="Description"
            />

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
