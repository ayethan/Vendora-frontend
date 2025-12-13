import React, { useEffect, useState } from "react";
import uploadImage from "../../../helpers/uploadImage.js";
import { useForm, type SubmitHandler } from "react-hook-form";
import FormInput from "../../../components/Form/FormInput.js";
import FormSelect from "../../../components/Form/FormSelect.js";
import RichTextEditor from "../../../components/Form/RichTextEditor.js";

import type { Page } from "../../../services/page.ts";

interface FormModelProps {
  Page?: Page;
  onSubmit: (data: PageFormData) => void;
  onClose: () => void;
}

type PageFormData = Omit<Page, "_id">;

const PAGE_TYPES = ["About", "Contact", "Privacy", "Terms", "Other"];

function FormModel({ Page, onSubmit, onClose }: FormModelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm<PageFormData>();

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  useEffect(() => {
    if (Page) {
      reset(Page);
    }
  }, [Page, reset]);

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

  const onFormSubmit: SubmitHandler<PageFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <div key={Page?._id}>
      <div className="bg-white w-full-screen p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {Page?._id ? "Edit Page" : "Create Page"}
          </h2>
        </div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="space-y-4">
            <FormInput
              label="Title"
              name="title"
              register={register}
              errors={errors}
              rules={{ required: "Page name is required" }}
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
            <FormSelect
              label="Page Type"
              name="type"
              register={register}
              errors={errors}
              rules={{ required: "Page type is required" }}
            >
              <option value="">Select Type</option>
              {PAGE_TYPES.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </FormSelect>

            <RichTextEditor
              name="content"
              control={control}
              errors={errors}
            />

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
              Image
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
