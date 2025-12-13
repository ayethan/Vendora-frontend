import React, { useEffect, useState } from 'react';
import PageService, { type Page } from "../../../services/page.js";
import { DataTable } from "../../../components/ui/data-table.js";
import { createPageColumns } from "./Columns.js";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';





function Index() {
  const navigate = useNavigate();
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const data = await PageService.getPage();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleCreateClick = () => {
    navigate('create')
  };

  const handleEditClick = (page: Page) => {
    navigate(`edit/${page._id}`)
  };

  const handleDeleteClick = async (id: string) => {
    if(!window.confirm("Are you sure to delete?")) return;
    try {
      await PageService.deletePage(id);
      toast.success("Page Deleted Successfully");
      fetchPages();
    } catch (error) {
      toast.error('Failed to delete Page.');
      console.error('Error deleting Page:', error);
    }
  };

  const columns = createPageColumns({
    onEdit: handleEditClick,
    onDelete: handleDeleteClick
  });

  return (
    <div className="p-3">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Page List</h1>
        <button
          onClick={handleCreateClick}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white"
        >
          Create
        </button>
      </div>
      {isLoading ? (
        <div className="text-center py-4">Loading pages...</div>
      ) : (
        <DataTable columns={columns} data={pages} />
      )}
    </div>
  );
}

export default Index;
