import React from 'react'
import FormModel from './Form.js';
import PageService, { type Page } from "../../../services/page.js";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


type PageFormData = Omit<Page, "_id"> & { _id?: string };

function Create() {
  const navigate = useNavigate();

  const redirectBack = () => {
    navigate('/admin/pages');
  }
  const handleFormSubmit = async (PageData: PageFormData) => {
    try {
      const { _id, ...rest } = PageData;
      await PageService.createPage(rest);

      toast.success("Page Created Successfully");
      redirectBack();
    } catch (error) {
      console.error('Error saving Page:', error);
      toast.error('Failed to save Page.');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create Pages</h1>
        <button
          onClick={redirectBack}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white"
        >
          Back
        </button>
      </div>
      <FormModel onSubmit={handleFormSubmit} onClose={redirectBack} />
    </div>
  );
}

export default Create
