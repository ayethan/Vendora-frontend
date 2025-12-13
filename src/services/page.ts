import axios from "axios";

const API_URL = "/pages";

export interface Page {
  _id: string;
  title: string;
  slug: string;
  image: string;
  content: string;
  type: string;
  isActive?: boolean;
}

// Get all pages
const getPage = async (): Promise<Page[]> => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

// Get a single page by ID
const getPageById = async (pageId: string): Promise<Page> => {
  const response = await axios.get(`${API_URL}/${pageId}`, {
    withCredentials: true,
  });
  return response.data;
};

// Create a page
const createPage = async (pageData: Omit<Page, "_id">): Promise<Page> => {
  const response = await axios.post(API_URL, pageData, {
    withCredentials: true,
  });
  return response.data;
};

// Update a page
const updatePage = async (pageData: Page): Promise<Page> => {
  const response = await axios.put(
    `${API_URL}/${pageData._id}`,
    pageData,
    { withCredentials: true }
  );
  return response.data;
};

// Delete a page
const deletePage = async (pageId: string): Promise<any> => {
  const response = await axios.delete(`${API_URL}/${pageId}`, {
    withCredentials: true,
  });
  return response.data;
};

const pageService = {
  getPage,
  getPageById,
  createPage,
  updatePage,
  deletePage,
};

export default pageService;
