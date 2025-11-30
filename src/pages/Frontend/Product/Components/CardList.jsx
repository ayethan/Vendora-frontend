import React from 'react';
import ProductCard from '../../../../components/ProductCard';
import Pagination from '../../../../components/Pagination';


function CardList({ productsData, currentPage, totalPages, onPageChange, isLoading, setCurrentPage, sort, setSort }) {
  console.log('CardList Props:', { productsData, currentPage, totalPages });
  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  }
  return (
    <div className='bg-white p-4' key={productsData._id}>
      {isLoading ? (
        <div className='col-span-full text-center py-20'>
          <p className='text-gray-500'>Loading products...</p>
        </div>
      ) : (
        <>
        <div>
          <div className='mb-4 flex justify-between items-center'>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Products</h2>
          <div className='flex justify-end mb-4'>
            <select onChange={handleSortChange} value={sort} className='border border-gray-300 rounded px-3 py-2'>
              <option value="new-to-old">Sort by: New to Old</option>
              <option value="old-to-new">Sort by: Old to New</option>
              <option value="price-low-to-high">Sort by: Price Low to High</option>
              <option value="price-high-to-low">Sort by: Price High to Low</option>
            </select>
          </div>

          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className={productsData.length === 0 ? 'hidden' : 'mt-8 flex'}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
          <div className={productsData.length === 0 ? 'mt-8 flex items-center justify-center' : 'hidden'}>
            <p className='text-gray-500'>No products found.</p>
          </div>

        </div>
        </>
        )}
      </div>

  )
}

export default CardList
