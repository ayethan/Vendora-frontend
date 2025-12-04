import React, { useEffect, useState, useCallback} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';import Sidebar from './Components/Sidebar';
import CardList from './Components/CardList';
import axios from 'axios';
import { FiCpu, FiShoppingBag, FiBookOpen, FiSmile, FiAward, FiHeart, FiPlusSquare, FiCoffee, FiArchive} from 'react-icons/fi';



const categoriesData = [
    {id: 1, name: 'Electronics', icon: <FiCpu /> }, {id: 2, name: 'Fashion', icon: <FiShoppingBag /> },
    {id: 3,name: 'Books', icon: <FiBookOpen /> },
    {id: 4,name: 'Toys', icon: <FiSmile /> }, {id: 5,name: 'Sports', icon: <FiAward /> },
    {id: 6,name: 'Beauty', icon: <FiHeart /> }, {id: 7, name: 'Health', icon: <FiPlusSquare /> },
    {id: 8,name: 'Food', icon: <FiCoffee /> }, {id: 9, name: 'Furniture', icon: <FiArchive /> },
];

function Index() {
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState('new-to-old');
  const [filters, setFilters] = useState({category: [], brand: [] });
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryIdParam = searchParams.get('category');
    if (categoryIdParam) {
      const categoryId = parseInt(categoryIdParam, 10);

      if (!isNaN(categoryId)) {
        setFilters(prevFilters => ({ ...prevFilters, category: [categoryId] }));
      }
    }
  }, [location.search]);


  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('sort', sort)
      if(filters.category.length > 0) {
        params.append('category', filters.category.join(','));
      }
      if(filters.brand.length > 0) {
        params.append('brand', filters.brand.join(','));
      }
      const requestURL = `/product-list?${params.toString()}`;
      console.log('Fetching products with URL:', requestURL);

      const response = await axios.get(`/product-list?${params.toString()}`);
      console.log('API Response Data:', response.data);

      setProductsData(response.data.products);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  },[currentPage, sort, filters]);


  useEffect(() => {
      fetchProducts()
    }, [fetchProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const currentValues = prevFilters[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(val => val !== value)
        : [...currentValues, value];

      const updatedFilters = { ...prevFilters, [filterType]: newValues };

      const searchParams = new URLSearchParams();
      if (updatedFilters.category.length > 0) {
        searchParams.append('category', updatedFilters.category.join(','));
      }
      if (updatedFilters.brand.length > 0) {
        searchParams.append('brand', updatedFilters.brand.join(','));
      }
      navigate(`?${searchParams.toString()}`);

      return updatedFilters;
    });
    setCurrentPage(1);
  }

  return (
    <div className='bg-white min-h-screen'>
      <div className='max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          <div className='md:col-span-1'>
            <Sidebar
            categoriesData={categoriesData}
            onFilterChange={handleFilterChange}
            selectedCategories={filters.category}
            selectedBrands={filters.brand}
            />
          </div>

          <div className='md:col-span-2 lg:col-span-3'>

            <CardList
              productsData={productsData}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
              setCurrentPage={setCurrentPage}
              sort={sort}
              setSort={setSort}
            />
          </div>

      </div>
    </div>
  )
}

export default Index
