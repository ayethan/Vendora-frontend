import React, { useEffect, useState } from 'react';
import FormModel from './Form.js';
import PageService, { type Page } from '../../../services/page.js';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';



function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPage = async () => {
        try {
          const data = await PageService.getPageById(id);
          setPage(data);
        } catch (error) {
          console.error('Error fetching page:', error);
          toast.error('Failed to fetch page.');
        }
      };
      fetchPage();
    }
  }, [id]);

  const redirectBack = () => {
    navigate('/admin/pages');
  };

  const handleFormSubmit = async (PageData: Omit<Page, '_id'>) => {
    try {
      if (!id) {
        toast.error('Page ID is missing. Cannot update.');
        return;
      }
      const pageDataWithId: Page = { _id: id, ...PageData };
      await PageService.updatePage(pageDataWithId);
      toast.success('Page Updated Successfully');
      redirectBack();
    } catch (error) {
      console.error('Error saving Page:', error);
      toast.error('Failed to save Page.');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Page</h1>
        <button
          onClick={redirectBack}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white"
        >
          Back
        </button>
      </div>
      {page ? (
        <FormModel
          Page={page}
          onSubmit={handleFormSubmit}
          onClose={redirectBack}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Edit;
